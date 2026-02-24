"""
API для личного приложения Аксиньи: карта желаний, заметки, прогресс.
v2
"""
import json
import os
import psycopg2
from datetime import datetime

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
    'Content-Type': 'application/json',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    params = event.get('queryStringParameters') or {}

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        body = {}

    # --- WISHES ---
    if path == '/wishes' and method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, title, description, category, progress, status,
                   cover_url, links, roadmap, is_preset, created_at
            FROM aksinia_wishes ORDER BY is_preset DESC, created_at DESC
        """)
        rows = cur.fetchall()
        conn.close()
        wishes = []
        for r in rows:
            wishes.append({
                'id': r[0], 'title': r[1], 'description': r[2],
                'category': r[3], 'progress': r[4], 'status': r[5],
                'cover_url': r[6], 'links': r[7] or [], 'roadmap': r[8] or [],
                'is_preset': r[9], 'created_at': str(r[10])
            })
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'wishes': wishes})}

    if path == '/wishes' and method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO aksinia_wishes (title, description, category, progress, status, cover_url, links, roadmap)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
        """, (
            body.get('title', ''), body.get('description', ''),
            body.get('category', 'dream'), body.get('progress', 0),
            body.get('status', 'active'), body.get('cover_url'),
            body.get('links', []), json.dumps(body.get('roadmap', []))
        ))
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'id': new_id, 'success': True})}

    if path.startswith('/wishes/') and method == 'PUT':
        wish_id = path.split('/')[-1]
        conn = get_conn()
        cur = conn.cursor()
        updates = []
        vals = []
        if 'progress' in body:
            updates.append('progress = %s')
            vals.append(body['progress'])
        if 'status' in body:
            updates.append('status = %s')
            vals.append(body['status'])
        if 'title' in body:
            updates.append('title = %s')
            vals.append(body['title'])
        if 'description' in body:
            updates.append('description = %s')
            vals.append(body['description'])
        if 'roadmap' in body:
            updates.append('roadmap = %s')
            vals.append(json.dumps(body['roadmap']))
        if 'cover_url' in body:
            updates.append('cover_url = %s')
            vals.append(body['cover_url'])
        if updates:
            updates.append('updated_at = NOW()')
            vals.append(wish_id)
            cur.execute(f"UPDATE aksinia_wishes SET {', '.join(updates)} WHERE id = %s", vals)
            conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'success': True})}

    if path.startswith('/wishes/') and method == 'DELETE':
        wish_id = path.split('/')[-1]
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("DELETE FROM aksinia_wishes WHERE id = %s AND is_preset = false", (wish_id,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'success': True})}

    # --- NOTES ---
    if path == '/notes' and method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, title, content, type, image_url, link, color, created_at
            FROM aksinia_notes ORDER BY created_at DESC
        """)
        rows = cur.fetchall()
        conn.close()
        notes = []
        for r in rows:
            notes.append({
                'id': r[0], 'title': r[1], 'content': r[2],
                'type': r[3], 'image_url': r[4], 'link': r[5],
                'color': r[6], 'created_at': str(r[7])
            })
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'notes': notes})}

    if path == '/notes' and method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO aksinia_notes (title, content, type, image_url, link, color)
            VALUES (%s, %s, %s, %s, %s, %s) RETURNING id
        """, (
            body.get('title', ''), body.get('content', ''),
            body.get('type', 'note'), body.get('image_url'),
            body.get('link'), body.get('color', '#ff6b9d')
        ))
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'id': new_id, 'success': True})}

    if path.startswith('/notes/') and method == 'DELETE':
        note_id = path.split('/')[-1]
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("DELETE FROM aksinia_notes WHERE id = %s", (note_id,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'success': True})}

    return {'statusCode': 404, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Not found'})}