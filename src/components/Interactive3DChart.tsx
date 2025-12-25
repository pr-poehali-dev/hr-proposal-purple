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

  const tasks: Task[] = [
    { id: '1.1', name: 'Допуск от ФГБУ', startWeek: 0, duration: 2, category: 'approval', responsible: 'ГИП', description: 'Получение письма-разрешения на мобилизацию и проведение работ от ФГБУ "Канал им. Москвы"' },
    { id: '1.2', name: 'Геодезические изыскания', startWeek: 1, duration: 3, category: 'survey', responsible: 'Геодезия', dependencies: '1.1', description: 'Топографическая съемка М1:500, создание цифровой модели рельефа' },
    { id: '1.3', name: 'Геологические изыскания', startWeek: 1, duration: 4, category: 'survey', responsible: 'Геология', dependencies: '1.1', description: 'Бурение скважин, фильтрационные расчеты, анализ грунтов' },
    { id: '2.1', name: 'Водолазное обследование', startWeek: 1, duration: 3, category: 'survey', responsible: 'Водолазы', dependencies: '1.1', description: 'Подводная диагностика камер шлюзов №7 и №8, дефектные ведомости' },
    { id: '2.2', name: 'Экологические изыскания', startWeek: 4, duration: 4, category: 'survey', responsible: 'Эколог', dependencies: '1.2', description: 'ИЭИ для раздела ПМООС, оценка воздействия на окружающую среду' },
    { id: '3.1', name: 'Запрос ТУ Россети', startWeek: 0, duration: 8, category: 'approval', responsible: 'Электроснабжение', description: 'Заявка и получение технических условий на переустройство ЛЭП' },
    { id: '3.2', name: 'Запрос ТУ Газпром', startWeek: 0, duration: 9, category: 'approval', responsible: 'Газоснабжение', description: 'Заявка и получение ТУ на переустройство газопровода' },
    { id: '4.1', name: 'Конструкции ГТС', startWeek: 8, duration: 6, category: 'design', responsible: 'Конструкторы', dependencies: '1.3, 2.1', description: 'Раздел 4: конструктивные решения камер шлюзов, затворов, водосливов' },
    { id: '4.2', name: 'Инженерные системы', startWeek: 10, duration: 5, category: 'design', responsible: 'ИТП', dependencies: '3.1, 3.2', description: 'Раздел 5: водоснабжение, канализация, электроснабжение, связь' },
    { id: '4.3', name: 'ПМООС', startWeek: 9, duration: 5, category: 'design', responsible: 'Эколог', dependencies: '2.2', description: 'Раздел 8: перечень мероприятий по охране окружающей среды' },
    { id: '5.1', name: 'Подача в ГГЭ', startWeek: 19, duration: 1, category: 'expertise', responsible: 'ГИП', dependencies: '4.1, 4.2, 4.3', description: 'Подача полного комплекта ПД в ФАУ "Главгосэкспертиза России"' },
    { id: '5.2', name: 'Рассмотрение ГГЭ', startWeek: 19, duration: 9, category: 'expertise', responsible: 'ГГЭ', dependencies: '5.1', description: 'Государственная экспертиза проектной документации (45 раб.дней)' },
    { id: '6.1', name: 'Устранение замечаний', startWeek: 27, duration: 3, category: 'expertise', responsible: 'Все отделы', dependencies: '5.2', description: 'Доработка ПД по замечаниям экспертизы' },
    { id: '6.2', name: 'Положительное заключение', startWeek: 30, duration: 2, category: 'expertise', responsible: 'ГГЭ', dependencies: '6.1', description: 'Получение положительного заключения государственной экспертизы' },
    { id: '7.1', name: 'Разрешение на строительство', startWeek: 31, duration: 1, category: 'permit', responsible: 'Госорган', dependencies: '6.2', description: 'Получение разрешения на строительство от уполномоченного органа' },
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
              className="relative h-[500px] cursor-move select-none"
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
                    {/* Bottom layer for 3D effect */}
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
                      onMouseEnter={() => setSelectedSegment(idx)}
                      onMouseLeave={() => setSelectedSegment(null)}
                      className="cursor-pointer transition-transform duration-300"
                    >
                      {/* Main segment */}
                      <path
                        d={createPieSegment(segment.startAngle, segment.endAngle, 180)}
                        fill={`url(#gradient-${idx})`}
                        filter={`url(#shadow-${idx})`}
                        className="transition-all duration-300"
                        style={{
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                          transformOrigin: 'center',
                        }}
                      />

                      {/* Percentage label */}
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

                {/* Center info */}
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

            {/* Legend and Stats */}
            <div className="space-y-4">
              {segments.map((segment, idx) => {
                const isActive = selectedSegment === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setSelectedSegment(idx)}
                    onMouseLeave={() => setSelectedSegment(null)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'bg-white/20 border-white/50 scale-105 shadow-2xl'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
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

      {/* Interactive Gantt with Side Panel */}
      <Card className="p-6 bg-white shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
          <Icon name="CalendarRange" size={28} className="text-blue-600" />
          Интерактивный план-график работ
        </h3>

        <div className="grid lg:grid-cols-[1fr,350px] gap-6">
          {/* Gantt Chart */}
          <div className="space-y-3">
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
                        W{task.startWeek + 1}-W{task.startWeek + task.duration} • {task.duration} недель
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={20} className={`text-gray-400 ${isSelected ? 'text-blue-600' : ''}`} />
                  </div>

                  {/* Progress bar */}
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

                  {selectedTask.dependencies && (
                    <div>
                      <div className="text-white/70 text-sm mb-1">Зависимости</div>
                      <div className="font-bold">{selectedTask.dependencies}</div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/20">
                    <div className="text-white/70 text-sm mb-2">Прогресс</div>
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
                  <p className="text-sm">Нажмите на любую работу в графике, чтобы увидеть детальную информацию</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Interactive3DChart;
