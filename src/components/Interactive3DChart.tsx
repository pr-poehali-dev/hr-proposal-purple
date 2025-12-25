import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Task {
  id: string;
  name: string;
  startWeek: number;
  duration: number;
  category: 'survey' | 'approval' | 'design' | 'expertise' | 'permit';
  responsible: string;
  dependencies?: string;
  description: string;
}

const Interactive3DChart = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [rotation, setRotation] = useState(45);
  const [tilt, setTilt] = useState(20);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');

  const tasks: Task[] = [
    // Недели 1-4
    { id: '1.1', name: 'Получение допуска от ФГБУ "Канал им. Москвы"', startWeek: 0, duration: 2, category: 'approval', responsible: 'ГИП / ЮГДОРПРОЕКТ', dependencies: '-', description: 'Получение письма-разрешения на мобилизацию и проведение работ' },
    { id: '1.2', name: 'Анализ исходных данных', startWeek: 0, duration: 2, category: 'survey', responsible: 'ГИП', dependencies: '-', description: 'Изучение архивной документации, выявление недостающих данных' },
    { id: '1.3', name: 'Инженерно-геодезические изыскания', startWeek: 1, duration: 3, category: 'survey', responsible: 'Геодезия', dependencies: '1.1', description: 'Топографическая съемка М1:500, цифровая модель рельефа' },
    { id: '1.4', name: 'Инженерно-геологические изыскания', startWeek: 1, duration: 4, category: 'survey', responsible: 'Геология', dependencies: '1.1', description: 'Бурение скважин, фильтрационные расчеты, анализ грунтов' },
    { id: '1.5', name: 'Водолазное обследование ГУ-7', startWeek: 1, duration: 2, category: 'survey', responsible: 'Водолазы', dependencies: '1.1', description: 'Подводная диагностика камеры шлюза №7, дефектные ведомости' },
    { id: '1.6', name: 'Водолазное обследование ГУ-8', startWeek: 2, duration: 2, category: 'survey', responsible: 'Водолазы', dependencies: '1.1', description: 'Подводная диагностика камеры шлюза №8, дефектные ведомости' },
    { id: '1.7', name: 'Запрос ТУ в ПАО "Россети" (ЛЭП)', startWeek: 0, duration: 2, category: 'approval', responsible: 'Электроснабжение', dependencies: '1.2', description: 'Заявка на выдачу технических условий на переустройство ЛЭП' },
    { id: '1.8', name: 'Запрос ТУ в ПАО "Газпром"', startWeek: 0, duration: 2, category: 'approval', responsible: 'Газоснабжение', dependencies: '1.2', description: 'Заявка на выдачу ТУ на переустройство газопровода' },
    { id: '1.9', name: 'Запрос ТУ на временное подключение', startWeek: 1, duration: 2, category: 'approval', responsible: 'Электроснабжение', dependencies: '1.2', description: 'Заявка на временное присоединение стройплощадки' },
    
    // Недели 5-8
    { id: '2.1', name: 'Инженерно-гидрометеорологические изыскания', startWeek: 4, duration: 3, category: 'survey', responsible: 'Гидрометеорология', dependencies: '1.3, 1.4', description: 'Режимы уровней, ледовая нагрузка' },
    { id: '2.2', name: 'Инженерно-экологические изыскания', startWeek: 4, duration: 4, category: 'survey', responsible: 'Экология', dependencies: '1.3, 1.4', description: 'ИЭИ для раздела ПМООС, оценка воздействия на окружающую среду' },
    { id: '2.3', name: 'Дефектоскопия бетона', startWeek: 4, duration: 2, category: 'survey', responsible: 'Лаборатория НК', dependencies: '1.5, 1.6', description: 'Протоколы испытаний прочности бетона' },
    { id: '2.4', name: 'Обследование металлоконструкций', startWeek: 5, duration: 2, category: 'survey', responsible: 'Лаборатория НК', dependencies: '1.5, 1.6', description: 'Дефектные ведомости затворов, расчет остаточного ресурса' },
    { id: '2.5', name: 'Получение ТУ от Россети', startWeek: 5, duration: 3, category: 'approval', responsible: 'Россети / СППИ', dependencies: '1.7', description: 'Технические условия на переустройство ЛЭП' },
    { id: '2.6', name: 'Получение ТУ от Газпром', startWeek: 6, duration: 3, category: 'approval', responsible: 'Газпром / СППИ', dependencies: '1.8', description: 'Технические условия на переустройство газопровода' },
    
    // Недели 9-16: Проектирование
    { id: '3.1', name: 'Раздел 1. Пояснительная записка', startWeek: 8, duration: 4, category: 'design', responsible: 'ГИП', dependencies: 'Изыскания', description: 'Полный текст ПЗ с обоснованием технических решений' },
    { id: '3.2', name: 'Раздел 2. Генплан', startWeek: 8, duration: 4, category: 'design', responsible: 'Архитектура', dependencies: '1.3, 2.2', description: 'Схема планировочной организации земельного участка' },
    { id: '3.3', name: 'Раздел 3. Архитектурные решения', startWeek: 9, duration: 4, category: 'design', responsible: 'Архитектура', dependencies: '3.2', description: 'АР зданий и сооружений' },
    { id: '3.4', name: 'Раздел 4. Конструкции ГТС', startWeek: 8, duration: 6, category: 'design', responsible: 'Конструкторы ГТС', dependencies: '1.4, 1.5, 2.3', description: 'Конструктивные решения камер шлюзов, затворов, водосливов' },
    { id: '3.5', name: 'Раздел 5. Инженерные системы', startWeek: 10, duration: 5, category: 'design', responsible: 'ИТП', dependencies: '2.5, 2.6, 3.4', description: 'Водоснабжение, канализация, электроснабжение, связь' },
    { id: '3.6', name: 'Раздел 6. ПОС', startWeek: 12, duration: 4, category: 'design', responsible: 'Технолог', dependencies: '3.4, 3.5', description: 'Проект организации строительства, стройгенплан, график работ' },
    { id: '3.7', name: 'Раздел 8. ПМООС', startWeek: 9, duration: 5, category: 'design', responsible: 'Эколог', dependencies: '2.2, 3.2', description: 'Перечень мероприятий по охране окружающей среды' },
    { id: '3.8', name: 'Раздел 10. Пожарная безопасность', startWeek: 11, duration: 4, category: 'design', responsible: 'Отдел ПБ', dependencies: '3.3, 3.5', description: 'Мероприятия по обеспечению пожарной безопасности' },
    { id: '3.9', name: 'Раздел 11. Смета', startWeek: 13, duration: 3, category: 'design', responsible: 'Сметчик', dependencies: '3.4, 3.5, 3.6', description: 'Сводный сметный расчет стоимости строительства' },
    { id: '3.10', name: 'Раздел 11.1. Безопасность ГТС', startWeek: 11, duration: 5, category: 'design', responsible: 'Отдел ГТС', dependencies: '3.4, 2.1', description: 'Декларация безопасности ГТС (ФЗ-117)' },
    { id: '3.11', name: 'Проект переустройства ЛЭП', startWeek: 9, duration: 5, category: 'design', responsible: 'Электроснабжение', dependencies: '2.5, 3.2', description: 'Проект переустройства ЛЭП по ТУ Россети' },
    { id: '3.12', name: 'Проект переустройства газопровода', startWeek: 10, duration: 5, category: 'design', responsible: 'Газоснабжение', dependencies: '2.6, 3.2', description: 'Проект переустройства газопровода по ТУ Газпром' },
    { id: '3.13', name: 'Согласование проекта ЛЭП с Россети', startWeek: 13, duration: 3, category: 'approval', responsible: 'Россети / СППИ', dependencies: '3.11', description: 'Согласование проекта переустройства ЛЭП' },
    { id: '3.14', name: 'Согласование проекта газопровода с Газпром', startWeek: 14, duration: 3, category: 'approval', responsible: 'Газпром / СППИ', dependencies: '3.12', description: 'Согласование проекта переустройства газопровода' },
    
    // Недели 17-24: Экспертиза
    { id: '4.1', name: 'Предварительное согласование с ФГБУ', startWeek: 16, duration: 2, category: 'approval', responsible: 'ГИП / ЮГДОРПРОЕКТ', dependencies: '3.1-3.10', description: 'Письмо-согласование балансодержателя ГТС' },
    { id: '4.2', name: 'Согласование с Росводресурсами', startWeek: 16, duration: 3, category: 'approval', responsible: 'Эколог / ЮГДОРПРОЕКТ', dependencies: '3.7', description: 'Согласование раздела ПМООС' },
    { id: '4.3', name: 'Согласование с Ростехнадзором', startWeek: 16, duration: 4, category: 'approval', responsible: 'Отдел ГТС', dependencies: '3.10', description: 'Заключение Ростехнадзора на декларацию безопасности ГТС' },
    { id: '4.4', name: 'Подготовка документов для ГГЭ', startWeek: 18, duration: 2, category: 'expertise', responsible: 'ГИП', dependencies: '4.1, 4.2, 4.3', description: 'Полный комплект ПД + все согласования' },
    { id: '4.5', name: 'Подача в ГГЭ', startWeek: 19, duration: 1, category: 'expertise', responsible: 'ГИП / ЮГДОРПРОЕКТ', dependencies: '4.4', description: 'Регистрация заявления в ФАУ ГГЭ России' },
    { id: '4.6', name: 'Рассмотрение в ГГЭ (45 раб.дней)', startWeek: 19, duration: 9, category: 'expertise', responsible: 'ФАУ ГГЭ России', dependencies: '4.5', description: 'Государственная экспертиза проектной документации' },
    
    // Недели 25-32: Доработка и разрешения
    { id: '5.1', name: 'Получение замечаний ГГЭ', startWeek: 27, duration: 1, category: 'expertise', responsible: 'ГИП', dependencies: '4.6', description: 'Список замечаний экспертизы (итерация 1)' },
    { id: '5.2', name: 'Устранение замечаний', startWeek: 27, duration: 3, category: 'expertise', responsible: 'Все отделы', dependencies: '5.1', description: 'Доработка ПД по замечаниям экспертизы' },
    { id: '5.3', name: 'Повторная подача в ГГЭ', startWeek: 29, duration: 1, category: 'expertise', responsible: 'ГИП / ЮГДОРПРОЕКТ', dependencies: '5.2', description: 'Регистрация доработанной ПД в ГГЭ' },
    { id: '5.4', name: 'Получение положительного заключения ГГЭ', startWeek: 30, duration: 2, category: 'expertise', responsible: 'ФАУ ГГЭ России', dependencies: '5.3', description: 'Положительное заключение государственной экспертизы' },
    { id: '5.5', name: 'Разрешение на переустройство ЛЭП', startWeek: 17, duration: 11, category: 'permit', responsible: 'Россети', dependencies: '3.13', description: 'Разрешение на реконструкцию ЛЭП от ПАО Россети' },
    { id: '5.6', name: 'Разрешение на переустройство газопровода', startWeek: 21, duration: 9, category: 'permit', responsible: 'Газпром', dependencies: '3.14', description: 'Разрешение на реконструкцию газопровода от ПАО Газпром' },
    { id: '5.7', name: 'Подача заявления на РнС', startWeek: 31, duration: 1, category: 'permit', responsible: 'ЮГДОРПРОЕКТ / ФКУ', dependencies: '5.4, 5.5, 5.6', description: 'Заявление на разрешение на строительство' },
    { id: '5.8', name: '✅ Получение разрешения на строительство', startWeek: 31, duration: 1, category: 'permit', responsible: 'Уполномоченный орган', dependencies: '5.7', description: 'Разрешение на строительство — ЗАВЕРШЕНИЕ ПРОЕКТА' },
  ];

  const categoryColors = {
    survey: { color: '#3B82F6', name: 'Изыскания', icon: 'MapPin', lightColor: '#93C5FD' },
    approval: { color: '#A855F7', name: 'Согласования', icon: 'FileCheck', lightColor: '#D8B4FE' },
    design: { color: '#6366F1', name: 'Проектирование', icon: 'PenTool', lightColor: '#C7D2FE' },
    expertise: { color: '#8B5CF6', name: 'Экспертиза', icon: 'Shield', lightColor: '#DDD6FE' },
    permit: { color: '#10B981', name: 'Разрешения', icon: 'Award', lightColor: '#6EE7B7' },
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setRotation(rotation + deltaX * 0.5);
    setTilt(Math.max(-30, Math.min(60, tilt - deltaY * 0.3)));
    setStartPos({ x: e.clientX, y: e.clientY });
    // Отключаем hover во время вращения
    setSelectedSegment(null);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate statistics
  const categoryStats = Object.entries(categoryColors).map(([key, value]) => ({
    category: key as Task['category'],
    name: value.name,
    color: value.color,
    lightColor: value.lightColor,
    icon: value.icon,
    count: tasks.filter(t => t.category === key).length,
    weeks: tasks.filter(t => t.category === key).reduce((sum, t) => sum + t.duration, 0),
    percentage: 0,
  }));

  const totalTasks = tasks.length;
  const totalWeeks = tasks.reduce((sum, t) => sum + t.duration, 0);

  categoryStats.forEach(stat => {
    stat.percentage = Math.round((stat.count / totalTasks) * 100);
  });

  // Calculate pie chart segments
  let currentAngle = 0;
  const segments = categoryStats.map((stat, idx) => {
    const angle = (stat.count / totalTasks) * 360;
    const segment = {
      ...stat,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      angle,
      index: idx,
    };
    currentAngle += angle;
    return segment;
  });

  // Create SVG path for pie segment
  const createPieSegment = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(0, 0, radius, endAngle);
    const end = polarToCartesian(0, 0, radius, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
    return `M 0 0 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
  };

  const polarToCartesian = (cx: number, cy: number, radius: number, angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  return (
    <div className="space-y-8">
      {/* 3D Pie Chart */}
      <Card className="p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white shadow-2xl overflow-hidden relative">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Icon name="PieChart" size={28} className="text-blue-400" />
              Интерактивная 3D диаграмма распределения работ
            </h3>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => { setRotation(45); setTilt(20); }}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Icon name="RotateCcw" size={16} className="mr-1" />
                Сброс
              </Button>
            </div>
          </div>

          <div className="text-sm text-blue-200 mb-6 flex items-center gap-2">
            <Icon name="MousePointerClick" size={16} />
            Перетащите мышью для вращения • Наведите на сегмент для деталей
          </div>

          <div className="grid lg:grid-cols-[1fr,400px] gap-8 items-center">
            {/* 3D Pie Chart */}
            <div
              className={`relative h-[500px] select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ perspective: '1500px' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <svg
                viewBox="-250 -250 500 500"
                className="w-full h-full"
                style={{
                  transform: `rotateX(${tilt}deg) rotateZ(${rotation}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                }}
              >
                <defs>
                  {segments.map((segment, idx) => (
                    <filter key={idx} id={`shadow-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
                      <feOffset dx="5" dy="10" result="offsetblur" />
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.5" />
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  ))}

                  {segments.map((segment, idx) => (
                    <linearGradient key={idx} id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={segment.color} />
                      <stop offset="100%" stopColor={segment.lightColor} />
                    </linearGradient>
                  ))}
                </defs>

                {/* Base circle (3D depth) */}
                {segments.map((segment, idx) => (
                  <g key={`base-${idx}`}>
                    <path
                      d={createPieSegment(segment.startAngle, segment.endAngle, 180)}
                      fill={segment.color}
                      opacity="0.3"
                      transform="translate(0, 20)"
                    />
                  </g>
                ))}

                {/* Main pie segments */}
                {segments.map((segment, idx) => {
                  const isHovered = selectedSegment === idx;
                  const midAngle = (segment.startAngle + segment.endAngle) / 2;
                  const offset = isHovered ? 20 : 0;
                  const offsetX = Math.cos(((midAngle - 90) * Math.PI) / 180) * offset;
                  const offsetY = Math.sin(((midAngle - 90) * Math.PI) / 180) * offset;

                  return (
                    <g
                      key={`segment-${idx}`}
                      transform={`translate(${offsetX}, ${offsetY})`}
                      className="transition-transform duration-300"
                    >
                      <path
                        d={createPieSegment(segment.startAngle, segment.endAngle, 180)}
                        fill={`url(#gradient-${idx})`}
                        filter={`url(#shadow-${idx})`}
                        className="cursor-pointer transition-all duration-300"
                        onMouseEnter={() => !isDragging && setSelectedSegment(idx)}
                        onMouseLeave={() => !isDragging && setSelectedSegment(null)}
                        style={{
                          transform: isHovered && !isDragging ? 'scale(1.05)' : 'scale(1)',
                          transformOrigin: 'center',
                          pointerEvents: isDragging ? 'none' : 'auto',
                        }}
                      />

                      <text
                        x={Math.cos(((midAngle - 90) * Math.PI) / 180) * 120}
                        y={Math.sin(((midAngle - 90) * Math.PI) / 180) * 120}
                        fill="white"
                        fontSize="24"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))',
                          pointerEvents: 'none',
                        }}
                      >
                        {segment.percentage}%
                      </text>
                    </g>
                  );
                })}

                <circle cx="0" cy="0" r="60" fill="rgba(255,255,255,0.1)" />
                <text
                  x="0"
                  y="-10"
                  fill="white"
                  fontSize="32"
                  fontWeight="bold"
                  textAnchor="middle"
                  style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))' }}
                >
                  {totalTasks}
                </text>
                <text
                  x="0"
                  y="20"
                  fill="white"
                  fontSize="16"
                  textAnchor="middle"
                  opacity="0.8"
                  style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))' }}
                >
                  работ
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              {segments.map((segment, idx) => {
                const isActive = selectedSegment === idx && !isDragging;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => !isDragging && setSelectedSegment(idx)}
                    onMouseLeave={() => !isDragging && setSelectedSegment(null)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'bg-white/20 border-white/50 scale-105 shadow-2xl'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                    style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full shadow-lg"
                          style={{ backgroundColor: segment.color }}
                        />
                        <div>
                          <div className="font-bold text-lg flex items-center gap-2">
                            <Icon name={segment.icon} size={20} />
                            {segment.name}
                          </div>
                          <div className="text-sm text-blue-200">
                            {segment.count} работ • {segment.weeks} недель
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-white/20 text-white text-lg font-bold">
                        {segment.percentage}%
                      </Badge>
                    </div>

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-white/20 space-y-2 animate-fade-in">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <div className="text-blue-300 text-xs">Работ</div>
                            <div className="font-bold text-xl">{segment.count}</div>
                          </div>
                          <div>
                            <div className="text-blue-300 text-xs">Недель</div>
                            <div className="font-bold text-xl">{segment.weeks}</div>
                          </div>
                          <div>
                            <div className="text-blue-300 text-xs">Доля</div>
                            <div className="font-bold text-xl">{segment.percentage}%</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="text-sm text-blue-200 mb-2">Общая статистика</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold">{totalTasks}</div>
                    <div className="text-sm text-blue-300">Всего работ</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{totalWeeks}</div>
                    <div className="text-sm text-blue-300">Всего недель</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Gantt */}
      <Card className="p-6 bg-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Icon name="CalendarRange" size={28} className="text-blue-600" />
            Интерактивный план-график работ ({totalTasks} работ)
          </h3>
          <div className="flex gap-2">
            <Button
              onClick={() => setViewMode('list')}
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
            >
              <Icon name="List" size={16} className="mr-2" />
              Список
            </Button>
            <Button
              onClick={() => setViewMode('table')}
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
            >
              <Icon name="Table" size={16} className="mr-2" />
              Таблица
            </Button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="grid lg:grid-cols-[1fr,350px] gap-6">
            {/* List View */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {tasks.map((task) => {
                const colors = categoryColors[task.category];
                const isSelected = selectedTask?.id === task.id;
                
                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`relative h-16 bg-gray-50 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                      isSelected ? 'border-blue-500 shadow-xl' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center h-full px-4 gap-4">
                      <Badge 
                        className="shrink-0 text-white"
                        style={{ background: colors.color }}
                      >
                        {task.id}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate">{task.name}</div>
                        <div className="text-xs text-gray-600">
                          W{task.startWeek + 1}-W{task.startWeek + task.duration} • {task.duration} нед • {task.responsible}
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className={`text-gray-400 ${isSelected ? 'text-blue-600' : ''}`} />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000"
                        style={{ 
                          width: `${(task.startWeek / 32) * 100}%`,
                          background: colors.color 
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Side Panel */}
            <div className="lg:sticky lg:top-4 h-fit">
              {selectedTask ? (
                <Card 
                  className="p-6 text-white shadow-2xl"
                  style={{ background: `linear-gradient(135deg, ${categoryColors[selectedTask.category].color} 0%, ${categoryColors[selectedTask.category].lightColor} 100%)` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-white/20 text-white border-white/30">
                      {selectedTask.id}
                    </Badge>
                    <button
                      onClick={() => setSelectedTask(null)}
                      className="text-white hover:bg-white/20 p-1 rounded"
                    >
                      <Icon name="X" size={20} />
                    </button>
                  </div>

                  <h4 className="text-2xl font-bold mb-4">{selectedTask.name}</h4>

                  <div className="space-y-4">
                    <div>
                      <div className="text-white/70 text-sm mb-1">Описание</div>
                      <p className="text-white">{selectedTask.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-white/70 text-sm mb-1">Начало</div>
                        <div className="font-bold">Неделя {selectedTask.startWeek + 1}</div>
                      </div>
                      <div>
                        <div className="text-white/70 text-sm mb-1">Длительность</div>
                        <div className="font-bold">{selectedTask.duration} нед</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-white/70 text-sm mb-1">Категория</div>
                      <div className="flex items-center gap-2">
                        <Icon name={categoryColors[selectedTask.category].icon} size={18} />
                        <span className="font-bold">{categoryColors[selectedTask.category].name}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-white/70 text-sm mb-1">Ответственный</div>
                      <div className="font-bold">{selectedTask.responsible}</div>
                    </div>

                    {selectedTask.dependencies && selectedTask.dependencies !== '-' && (
                      <div>
                        <div className="text-white/70 text-sm mb-1">Зависимости</div>
                        <div className="font-bold">{selectedTask.dependencies}</div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-white/20">
                      <div className="text-white/70 text-sm mb-2">Прогресс выполнения</div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white transition-all duration-1000"
                          style={{ width: `${(selectedTask.startWeek / 32) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <Icon name="MousePointerClick" size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="font-semibold mb-2">Выберите задачу</p>
                    <p className="text-sm">Нажмите на любую работу для детальной информации</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="p-3 font-bold border-r border-blue-200 sticky left-0 bg-blue-100">№</th>
                  <th className="p-3 font-bold border-r border-blue-200">Наименование работы</th>
                  <th className="p-3 font-bold border-r border-blue-200">Начало</th>
                  <th className="p-3 font-bold border-r border-blue-200">Окончание</th>
                  <th className="p-3 font-bold border-r border-blue-200">Длительность</th>
                  <th className="p-3 font-bold border-r border-blue-200">Категория</th>
                  <th className="p-3 font-bold border-r border-blue-200">Ответственный</th>
                  <th className="p-3 font-bold">Зависимости</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, idx) => {
                  const colors = categoryColors[task.category];
                  return (
                    <tr
                      key={task.id}
                      className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors border-b border-gray-200`}
                    >
                      <td className="p-3 border-r border-gray-200 sticky left-0" style={{ background: idx % 2 === 0 ? '#f9fafb' : 'white' }}>
                        <Badge style={{ background: colors.color }} className="text-white">
                          {task.id}
                        </Badge>
                      </td>
                      <td className="p-3 font-semibold border-r border-gray-200">{task.name}</td>
                      <td className="p-3 border-r border-gray-200">W{task.startWeek + 1}</td>
                      <td className="p-3 border-r border-gray-200">W{task.startWeek + task.duration}</td>
                      <td className="p-3 border-r border-gray-200">{task.duration} нед</td>
                      <td className="p-3 border-r border-gray-200">
                        <div className="flex items-center gap-2">
                          <Icon name={colors.icon} size={16} style={{ color: colors.color }} />
                          <span className="text-xs">{colors.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-xs border-r border-gray-200">{task.responsible}</td>
                      <td className="p-3 text-xs">{task.dependencies || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Interactive3DChart;