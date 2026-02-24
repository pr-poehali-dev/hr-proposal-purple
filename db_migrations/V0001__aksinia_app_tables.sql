
CREATE TABLE aksinia_wishes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'dream',
  progress INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  cover_url TEXT,
  links TEXT[],
  roadmap JSONB,
  is_preset BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE aksinia_notes (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'note',
  image_url TEXT,
  link TEXT,
  color TEXT DEFAULT '#ff6b9d',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO aksinia_wishes (title, description, category, progress, status, is_preset, roadmap) VALUES
('Всемирно известная модель', 'Стать топ-моделью мирового уровня, покорить подиумы Милана, Парижа и Нью-Йорка', 'career', 15, 'active', true, '[
  {"step": 1, "title": "Портфолио мечты", "desc": "Создать профессиональное портфолио с лучшим фотографом", "done": false},
  {"step": 2, "title": "Агентство", "desc": "Подписать контракт с модельным агентством", "done": false},
  {"step": 3, "title": "Первые показы", "desc": "Участие в местных и региональных показах мод", "done": false},
  {"step": 4, "title": "Международный уровень", "desc": "Выход на европейские агентства и кастинги", "done": false},
  {"step": 5, "title": "Топ подиумы мира", "desc": "Милан, Париж, Нью-Йорк — Неделя моды", "done": false}
]'::jsonb),

('Рио-де-Жанейро', 'Увидеть статую Христа-Искупителя, карнавал и пляжи Ипанемы', 'travel', 0, 'active', true, '[
  {"step": 1, "title": "Изучить Рио", "desc": "Составить список мест: Ипанема, Копакабана, Сахарная голова", "done": false},
  {"step": 2, "title": "Визовые документы", "desc": "Оформить визу в Бразилию", "done": false},
  {"step": 3, "title": "Лучшее время", "desc": "Запланировать поездку на февральский карнавал", "done": false},
  {"step": 4, "title": "Полёт мечты", "desc": "Купить билеты и отель с видом на горы", "done": false},
  {"step": 5, "title": "Рио встречает тебя!", "desc": "Увидеть всё своими глазами", "done": false}
]'::jsonb),

('Париж', 'Влюбиться в Париж — Эйфелева башня, Монмартр, haute couture', 'travel', 0, 'active', true, '[
  {"step": 1, "title": "Мечты о Париже", "desc": "Составить список: Лувр, Елисейские поля, Монмартр, Версаль", "done": false},
  {"step": 2, "title": "Язык любви", "desc": "Выучить несколько фраз на французском", "done": false},
  {"step": 3, "title": "Отель в центре", "desc": "Найти отель с видом на Эйфелеву башню", "done": false},
  {"step": 4, "title": "Неделя моды", "desc": "Попасть на показ или увидеть прогулки звёзд", "done": false},
  {"step": 5, "title": "Поцелуй у башни", "desc": "Встретить закат на Марсовом поле", "done": false}
]'::jsonb),

('Светящийся планктон', 'Купаться ночью в бирюзовом биолюминесцентном море', 'nature', 5, 'active', true, '[
  {"step": 1, "title": "Лучшие места", "desc": "Изучить: Мальдивы, Пуэрто-Рико (Mosquito Bay), остров Ваадху", "done": false},
  {"step": 2, "title": "Сезон планктона", "desc": "Узнать идеальное время для биолюминесценции", "done": false},
  {"step": 3, "title": "Путь к морю", "desc": "Забронировать отель прямо на берегу", "done": false},
  {"step": 4, "title": "Ночное купание", "desc": "Войти в светящееся море и стать его частью", "done": false}
]'::jsonb),

('Мачу-Пикчу', 'Дойти до затерянного города инков на рассвете', 'adventure', 0, 'active', true, '[
  {"step": 1, "title": "История инков", "desc": "Изучить историю Мачу-Пикчу и тропы инков", "done": false},
  {"step": 2, "title": "Физическая подготовка", "desc": "Подготовиться к горным тропам", "done": false},
  {"step": 3, "title": "Перу", "desc": "Прилететь в Куско, акклиматизироваться", "done": false},
  {"step": 4, "title": "Тропа инков", "desc": "Пройти трёхдневный маршрут Камино Инка", "done": false},
  {"step": 5, "title": "Врата Солнца", "desc": "Встретить рассвет над Мачу-Пикчу", "done": false}
]'::jsonb),

('Полярное сияние', 'Увидеть северное сияние в Исландии или Норвегии', 'nature', 0, 'active', true, '[
  {"step": 1, "title": "Лучшие места", "desc": "Исландия, Тромсё, Финляндия — выбрать направление", "done": false},
  {"step": 2, "title": "Сезон сияния", "desc": "Спланировать поездку на декабрь-февраль", "done": false},
  {"step": 3, "title": "Охота за сиянием", "desc": "Найти гида или приложение для отслеживания авроры", "done": false},
  {"step": 4, "title": "Под звёздами", "desc": "Лечь на снег и смотреть на танцующее небо", "done": false}
]'::jsonb),

('Великая стена Китая', 'Пройтись по Великой Китайской стене на закате', 'adventure', 0, 'active', true, '[
  {"step": 1, "title": "Секция мечты", "desc": "Выбрать красивейшую секцию: Мутяньюй или Симатай", "done": false},
  {"step": 2, "title": "Виза в Китай", "desc": "Оформить документы для поездки", "done": false},
  {"step": 3, "title": "Пекин", "desc": "Прилететь и познакомиться с городом", "done": false},
  {"step": 4, "title": "На стене", "desc": "Пройти по стене и смотреть как солнце садится за горами", "done": false}
]'::jsonb),

('Увидеть весь мир', 'Побывать во всех уголках планеты — от джунглей до ледников', 'dream', 2, 'active', true, '[
  {"step": 1, "title": "Список стран", "desc": "Составить персональный bucket list всех стран мечты", "done": false},
  {"step": 2, "title": "Первые 10", "desc": "Посетить первые 10 стран из списка", "done": false},
  {"step": 3, "title": "Все континенты", "desc": "Побывать на всех 7 континентах", "done": false},
  {"step": 4, "title": "100 стран", "desc": "Достичь отметки 100 посещённых стран", "done": false},
  {"step": 5, "title": "Гражданин мира", "desc": "Стать настоящим путешественником планеты", "done": false}
]'::jsonb);
