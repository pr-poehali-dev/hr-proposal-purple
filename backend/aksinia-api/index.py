"""
API для личного приложения Аксиньи: карта желаний, заметки, файлы, чат.
v4 — маршрутизация через ?action=...
"""
import json
import os
import base64
import uuid
import psycopg2

try:
    import boto3
    from botocore.client import Config
    HAS_BOTO3 = True
except ImportError:
    HAS_BOTO3 = False

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
    'Content-Type': 'application/json',
}

def ok(data):
    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps(data, default=str)}

def err(msg, code=400):
    return {'statusCode': code, 'headers': CORS_HEADERS, 'body': json.dumps({'error': msg})}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def get_s3():
    if not HAS_BOTO3:
        raise RuntimeError('boto3 not available')
    return boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        config=Config(signature_version='s3v4'),
    )

def cdn_url(key):
    return f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        body = {}

    # ─── WISHES ───────────────────────────────────────────────────────────
    if action == 'wishes' and method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, title, description, category, progress, status,
                   cover_url, links, roadmap, is_preset, created_at
            FROM aksinia_wishes ORDER BY is_preset DESC, created_at DESC
        """)
        rows = cur.fetchall()
        conn.close()
        return ok({'wishes': [
            {'id': r[0], 'title': r[1], 'description': r[2], 'category': r[3],
             'progress': r[4], 'status': r[5], 'cover_url': r[6],
             'links': r[7] or [], 'roadmap': r[8] or [],
             'is_preset': r[9], 'created_at': str(r[10])}
            for r in rows
        ]})

    if action == 'wishes' and method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO aksinia_wishes (title, description, category, progress, status, cover_url, links, roadmap)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
        """, (
            body.get('title', ''), body.get('description', ''),
            body.get('category', 'dream'), body.get('progress', 0),
            'active', body.get('cover_url'),
            body.get('links', []), json.dumps(body.get('roadmap', []))
        ))
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return ok({'id': new_id, 'success': True})

    if action == 'wish_update' and method == 'POST':
        wish_id = body.get('id')
        conn = get_conn()
        cur = conn.cursor()
        updates, vals = [], []
        for field in ('progress', 'status', 'title', 'description', 'cover_url'):
            if field in body:
                updates.append(f'{field} = %s')
                vals.append(body[field])
        if 'roadmap' in body:
            updates.append('roadmap = %s')
            vals.append(json.dumps(body['roadmap']))
        if updates:
            updates.append('updated_at = NOW()')
            vals.append(wish_id)
            cur.execute(f"UPDATE aksinia_wishes SET {', '.join(updates)} WHERE id = %s", vals)
            conn.commit()
        conn.close()
        return ok({'success': True})

    if action == 'wish_delete' and method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("DELETE FROM aksinia_wishes WHERE id = %s AND is_preset = false", (body.get('id'),))
        conn.commit()
        conn.close()
        return ok({'success': True})

    # ─── NOTES ────────────────────────────────────────────────────────────
    if action == 'notes' and method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, title, content, type, image_url, link, color, file_urls, created_at
            FROM aksinia_notes ORDER BY created_at DESC
        """)
        rows = cur.fetchall()
        conn.close()
        return ok({'notes': [
            {'id': r[0], 'title': r[1], 'content': r[2], 'type': r[3],
             'image_url': r[4], 'link': r[5], 'color': r[6],
             'file_urls': r[7] or [], 'created_at': str(r[8])}
            for r in rows
        ]})

    if action == 'notes' and method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO aksinia_notes (title, content, type, image_url, link, color, file_urls)
            VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id
        """, (
            body.get('title', ''), body.get('content', ''),
            body.get('type', 'note'), body.get('image_url'),
            body.get('link'), body.get('color', '#ff6b9d'),
            body.get('file_urls', [])
        ))
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return ok({'id': new_id, 'success': True})

    if action == 'note_update' and method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        updates, vals = [], []
        for field in ('title', 'content', 'link', 'color'):
            if field in body:
                updates.append(f'{field} = %s')
                vals.append(body[field])
        if updates:
            updates.append('updated_at = NOW()')
            vals.append(body.get('id'))
            cur.execute(f"UPDATE aksinia_notes SET {', '.join(updates)} WHERE id = %s", vals)
            conn.commit()
        conn.close()
        return ok({'success': True})

    if action == 'note_delete' and method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("DELETE FROM aksinia_notes WHERE id = %s", (body.get('id'),))
        conn.commit()
        conn.close()
        return ok({'success': True})

    # ─── UPLOAD FILE ──────────────────────────────────────────────────────
    if action == 'upload' and method == 'POST':
        file_b64 = body.get('file_b64', '')
        file_name = body.get('file_name', 'file')
        mime = body.get('mime', 'application/octet-stream')
        folder = body.get('folder', 'aksinia')

        ext = file_name.rsplit('.', 1)[-1].lower() if '.' in file_name else 'bin'
        key = f"{folder}/{uuid.uuid4().hex}.{ext}"

        data = base64.b64decode(file_b64)
        s3 = get_s3()
        s3.put_object(Bucket='files', Key=key, Body=data, ContentType=mime)
        return ok({'url': cdn_url(key), 'key': key})

    # ─── CHAT ─────────────────────────────────────────────────────────────
    if action == 'messages' and method == 'GET':
        since_id = params.get('since_id', '0')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, sender, content, type, file_url, file_name, file_type, duration_sec, read_at, created_at
            FROM aksinia_messages
            WHERE id > %s
            ORDER BY created_at ASC LIMIT 100
        """, (int(since_id),))
        rows = cur.fetchall()
        # Mark delivered messages as read
        conn.close()
        return ok({'messages': [
            {'id': r[0], 'sender': r[1], 'content': r[2], 'type': r[3],
             'file_url': r[4], 'file_name': r[5], 'file_type': r[6],
             'duration_sec': r[7], 'read_at': str(r[8]) if r[8] else None,
             'created_at': str(r[9])}
            for r in rows
        ]})

    if action == 'send_message' and method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO aksinia_messages (sender, content, type, file_url, file_name, file_type, duration_sec)
            VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id, created_at
        """, (
            body.get('sender', 'denis'),
            body.get('content', ''),
            body.get('type', 'text'),
            body.get('file_url'),
            body.get('file_name'),
            body.get('file_type'),
            body.get('duration_sec'),
        ))
        row = cur.fetchone()
        conn.commit()
        conn.close()
        return ok({'id': row[0], 'created_at': str(row[1]), 'success': True})

    if action == 'mark_read' and method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            UPDATE aksinia_messages SET read_at = NOW()
            WHERE sender != %s AND read_at IS NULL
        """, (body.get('sender', 'denis'),))
        conn.commit()
        conn.close()
        return ok({'success': True})

    return err('Not found', 404)