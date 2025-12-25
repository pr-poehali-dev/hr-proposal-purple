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
  const [rotation, setRotation] = useState({ x: 20, y: 45 });
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
    survey: { bg: 'from-blue-500 to-blue-600', name: 'Изыскания', icon: 'MapPin' },
    approval: { bg: 'from-purple-500 to-purple-600', name: 'Согласования', icon: 'FileCheck' },
    design: { bg: 'from-indigo-500 to-indigo-600', name: 'Проектирование', icon: 'PenTool' },
    expertise: { bg: 'from-violet-500 to-violet-600', name: 'Экспертиза', icon: 'Shield' },
    permit: { bg: 'from-emerald-500 to-emerald-600', name: 'Разрешения', icon: 'Award' },
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setRotation({
      x: Math.max(-90, Math.min(90, rotation.x - deltaY * 0.5)),
      y: rotation.y + deltaX * 0.5,
    });
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 3D Bar positions
  const categoryStats = Object.entries(categoryColors).map(([key, value]) => ({
    category: key as Task['category'],
    name: value.name,
    color: value.bg,
    icon: value.icon,
    count: tasks.filter(t => t.category === key).length,
    weeks: tasks.filter(t => t.category === key).reduce((sum, t) => sum + t.duration, 0),
  }));

  const maxCount = Math.max(...categoryStats.map(s => s.count));

  return (
    <div className="space-y-8">
      {/* 3D Rotating Chart */}
      <Card className="p-6 bg-gradient-to-br from-slate-900 to-blue-900 text-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Icon name="Box" size={28} className="text-blue-400" />
            3D Интерактивная диаграмма
          </h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setRotation({ x: 20, y: 45 })}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Icon name="RotateCcw" size={16} className="mr-1" />
              Сброс
            </Button>
          </div>
        </div>

        <div className="text-sm text-blue-200 mb-4 flex items-center gap-2">
          <Icon name="Info" size={16} />
          Перетащите мышью для вращения диаграммы
        </div>

        <div
          className="relative h-[500px] cursor-move select-none"
          style={{ perspective: '1200px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute inset-0 flex items-end justify-center gap-8"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            {/* Grid Floor */}
            <div
              className="absolute bottom-0 w-[600px] h-[600px] grid grid-cols-10 grid-rows-10 opacity-20"
              style={{
                transform: 'rotateX(90deg) translateZ(-50px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border border-white/30" />
              ))}
            </div>

            {/* 3D Bars */}
            {categoryStats.map((stat, idx) => {
              const height = (stat.count / maxCount) * 300;
              const xPos = (idx - categoryStats.length / 2) * 100;
              
              return (
                <div
                  key={stat.category}
                  className="relative group"
                  style={{
                    transform: `translateX(${xPos}px) translateZ(0)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Bar */}
                  <div
                    className={`relative w-20 bg-gradient-to-t ${stat.color} rounded-t-lg shadow-2xl transition-all duration-300 hover:brightness-125`}
                    style={{
                      height: `${height}px`,
                      transform: 'translateZ(0)',
                      boxShadow: '0 10px 50px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Top Face */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-br ${stat.color} rounded-lg opacity-80`}
                      style={{
                        transform: 'rotateX(90deg) translateZ(10px)',
                        transformStyle: 'preserve-3d',
                      }}
                    />
                    
                    {/* Side Face */}
                    <div
                      className={`absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r ${stat.color} opacity-60`}
                      style={{
                        transform: 'rotateY(90deg) translateZ(10px)',
                        transformOrigin: 'right',
                        transformStyle: 'preserve-3d',
                      }}
                    />

                    {/* Value Label */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white font-bold text-2xl">
                      {stat.count}
                    </div>

                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${stat.color} opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl`}
                      style={{ transform: 'translateZ(-10px)' }}
                    />
                  </div>

                  {/* Label */}
                  <div
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                    style={{ transform: 'translateZ(0)' }}
                  >
                    <Icon name={stat.icon} size={24} className="mx-auto mb-2 text-blue-300" />
                    <div className="font-bold text-sm">{stat.name}</div>
                    <div className="text-xs text-blue-300">{stat.weeks} недель</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-4">
          {categoryStats.map((stat) => (
            <div key={stat.category} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <Icon name={stat.icon} size={20} className="text-blue-300 mb-2" />
              <div className="text-2xl font-bold">{stat.count}</div>
              <div className="text-xs text-blue-300">{stat.name}</div>
            </div>
          ))}
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
                    <Badge className={`bg-gradient-to-r ${colors.bg} text-white shrink-0`}>
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
                      className={`h-full bg-gradient-to-r ${colors.bg} transition-all duration-1000`}
                      style={{ width: `${(task.startWeek / 32) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side Panel */}
          <div className="lg:sticky lg:top-4 h-fit">
            {selectedTask ? (
              <Card className={`p-6 bg-gradient-to-br ${categoryColors[selectedTask.category].bg} text-white shadow-2xl`}>
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
