import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import * as XLSX from 'xlsx';

interface Task {
  id: string;
  name: string;
  startMonth: number;
  duration: number;
  category: 'survey' | 'approval' | 'design' | 'expertise' | 'permit' | 'revolutionary';
  responsible: string;
  status: 'planned' | 'in-progress' | 'completed';
}

const GanttChart = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [zoomLevel, setZoomLevel] = useState<'week' | 'month'>('month');

  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг'];
  
  const tasks: Task[] = [
    // Месяц 1: Изыскания
    { id: '1.1', name: 'Анализ исходных данных', startMonth: 0, duration: 0.5, category: 'survey', responsible: 'ГИП', status: 'planned' },
    { id: '1.2', name: 'Водолазные обследования ГУ-7', startMonth: 0, duration: 1, category: 'survey', responsible: 'Водолазы', status: 'planned' },
    { id: '1.3', name: 'Водолазные обследования ГУ-8', startMonth: 0.5, duration: 1, category: 'survey', responsible: 'Водолазы', status: 'planned' },
    { id: '1.4', name: 'Инж.-геодезические изыскания', startMonth: 0, duration: 1, category: 'survey', responsible: 'Геодезисты', status: 'planned' },
    { id: '1.5', name: 'Инж.-геологические изыскания', startMonth: 0.5, duration: 1, category: 'survey', responsible: 'Геологи', status: 'planned' },
    
    // Месяц 2: Согласования
    { id: '2.1', name: 'Согласование с ФГБУ "Канал им. Москвы"', startMonth: 1, duration: 1, category: 'approval', responsible: 'ГИП', status: 'planned' },
    { id: '2.2', name: 'Ростехнадзор (декларация ГТС)', startMonth: 1, duration: 1.5, category: 'approval', responsible: 'Отдел ГТС', status: 'planned' },
    { id: '2.3', name: 'Росводресурсы', startMonth: 1.5, duration: 1, category: 'approval', responsible: 'Эколог', status: 'planned' },
    { id: '2.4', name: 'Переустройство ЛЭП (Россети)', startMonth: 1, duration: 2, category: 'approval', responsible: 'Электрики', status: 'planned' },
    { id: '2.5', name: 'Переустройство газопровода (Газпром)', startMonth: 1.5, duration: 1.5, category: 'approval', responsible: 'ГАЗ отдел', status: 'planned' },
    
    // Месяцы 3-4: Проектирование
    { id: '3.1', name: 'Раздел 1. Пояснительная записка', startMonth: 2, duration: 0.5, category: 'design', responsible: 'ГИП', status: 'planned' },
    { id: '3.2', name: 'Раздел 2. Генплан', startMonth: 2, duration: 1, category: 'design', responsible: 'Архитектор', status: 'planned' },
    { id: '3.3', name: 'Раздел 3. Архитектурные решения', startMonth: 2.5, duration: 1, category: 'design', responsible: 'Архитектор', status: 'planned' },
    { id: '3.4', name: 'Раздел 4. Конструкции ГТС', startMonth: 2, duration: 2, category: 'design', responsible: 'Конструкторы', status: 'planned' },
    { id: '3.5', name: 'Раздел 5. Инженерные системы', startMonth: 3, duration: 1.5, category: 'design', responsible: 'ИТП', status: 'planned' },
    { id: '3.6', name: 'Раздел 6. ПОС', startMonth: 3.5, duration: 1, category: 'design', responsible: 'Технолог', status: 'planned' },
    { id: '3.7', name: 'Раздел 8. ООС (ОВОС)', startMonth: 2.5, duration: 2, category: 'design', responsible: 'Эколог', status: 'planned' },
    { id: '3.8', name: 'Раздел 11. Сметы', startMonth: 3.5, duration: 1, category: 'design', responsible: 'Сметчик', status: 'planned' },
    { id: '3.9', name: 'Раздел 12. Транспортная безопасность', startMonth: 3, duration: 1.5, category: 'design', responsible: 'СБ отдел', status: 'planned' },
    
    // Революционные решения
    { id: 'R1', name: 'BIM-модель цифрового двойника', startMonth: 2, duration: 2, category: 'revolutionary', responsible: 'BIM-отдел', status: 'planned' },
    { id: 'R2', name: 'Автоматизация затворов (IoT)', startMonth: 3, duration: 1.5, category: 'revolutionary', responsible: 'Автоматизаторы', status: 'planned' },
    { id: 'R3', name: 'Умный мониторинг состояния конструкций', startMonth: 3.5, duration: 1, category: 'revolutionary', responsible: 'IT-отдел', status: 'planned' },
    
    // Месяцы 5-6: Экспертиза
    { id: '4.1', name: 'Подача в Главгосэкспертизу', startMonth: 4.5, duration: 0.5, category: 'expertise', responsible: 'ГИП', status: 'planned' },
    { id: '4.2', name: 'Рассмотрение документации', startMonth: 5, duration: 2, category: 'expertise', responsible: 'Эксперты', status: 'planned' },
    { id: '4.3', name: 'Устранение замечаний', startMonth: 6, duration: 1, category: 'expertise', responsible: 'Все отделы', status: 'planned' },
    { id: '4.4', name: 'Получение положительного заключения', startMonth: 7, duration: 0.5, category: 'expertise', responsible: 'ГИП', status: 'planned' },
    
    // Месяцы 7-8: Разрешения
    { id: '5.1', name: 'Разрешение на реконструкцию ЛЭП', startMonth: 4, duration: 3, category: 'permit', responsible: 'Россети', status: 'planned' },
    { id: '5.2', name: 'Разрешение на реконструкцию газопровода', startMonth: 5, duration: 2, category: 'permit', responsible: 'Газпром', status: 'planned' },
    { id: '5.3', name: 'Подача на разрешение строительства', startMonth: 7, duration: 0.5, category: 'permit', responsible: 'ГИП', status: 'planned' },
    { id: '5.4', name: 'Получение разрешения на строительство', startMonth: 7.5, duration: 0.5, category: 'permit', responsible: 'Мосгосстройнадзор', status: 'planned' },
  ];

  const categoryColors = {
    survey: { bg: 'bg-blue-500', border: 'border-blue-600', text: 'Изыскания' },
    approval: { bg: 'bg-purple-500', border: 'border-purple-600', text: 'Согласования' },
    design: { bg: 'bg-indigo-500', border: 'border-indigo-600', text: 'Проектирование' },
    expertise: { bg: 'bg-violet-500', border: 'border-violet-600', text: 'Экспертиза' },
    permit: { bg: 'bg-emerald-500', border: 'border-emerald-600', text: 'Разрешения' },
    revolutionary: { bg: 'bg-orange-500', border: 'border-orange-600', text: 'Революционные решения' },
  };

  const getTaskPosition = (task: Task) => {
    const monthWidth = 12.5; // 100% / 8 months
    const left = task.startMonth * monthWidth;
    const width = task.duration * monthWidth;
    return { left: `${left}%`, width: `${width}%` };
  };

  const exportToExcel = () => {
    // Подготовка данных для экспорта
    const excelData = tasks.map(task => ({
      '№': task.id,
      'Наименование работы': task.name,
      'Начало (месяц)': Math.floor(task.startMonth) + 1,
      'Длительность (мес)': task.duration,
      'Окончание (месяц)': Math.floor(task.startMonth + task.duration) + 1,
      'Категория': categoryColors[task.category].text,
      'Ответственный': task.responsible,
      'Статус': task.status === 'planned' ? 'Запланировано' : task.status === 'in-progress' ? 'В работе' : 'Завершено',
    }));

    // Создание рабочей книги
    const wb = XLSX.utils.book_new();
    
    // Создание листа с данными
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Настройка ширины колонок
    ws['!cols'] = [
      { wch: 8 },  // №
      { wch: 45 }, // Наименование
      { wch: 15 }, // Начало
      { wch: 17 }, // Длительность
      { wch: 17 }, // Окончание
      { wch: 25 }, // Категория
      { wch: 20 }, // Ответственный
      { wch: 15 }, // Статус
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'План-график');

    // Создание листа со сводкой
    const summaryData = [
      { 'Показатель': 'Всего работ', 'Значение': tasks.length },
      { 'Показатель': 'Срок выполнения', 'Значение': '8 месяцев (январь-август 2025)' },
      { 'Показатель': 'Изыскания', 'Значение': tasks.filter(t => t.category === 'survey').length },
      { 'Показатель': 'Согласования', 'Значение': tasks.filter(t => t.category === 'approval').length },
      { 'Показатель': 'Проектирование', 'Значение': tasks.filter(t => t.category === 'design').length },
      { 'Показатель': 'Революционные решения', 'Значение': tasks.filter(t => t.category === 'revolutionary').length },
      { 'Показатель': 'Экспертиза', 'Значение': tasks.filter(t => t.category === 'expertise').length },
      { 'Показатель': 'Разрешения', 'Значение': tasks.filter(t => t.category === 'permit').length },
    ];
    
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    wsSummary['!cols'] = [{ wch: 30 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Сводка');

    // Экспорт файла
    XLSX.writeFile(wb, 'План-график_Гидроузлы_7-8.xlsx');
  };

  return (
    <Card className="p-4 sm:p-6 bg-white shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Icon name="CalendarRange" size={24} className="text-blue-600" />
          План-график работ (до августа 2025)
        </h3>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="default"
            size="sm"
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Icon name="Download" size={16} className="mr-2" />
            Скачать Excel
          </Button>
          <Button
            variant={zoomLevel === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setZoomLevel('month')}
          >
            Месяц
          </Button>
          <Button
            variant={zoomLevel === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setZoomLevel('week')}
          >
            Неделя
          </Button>
        </div>
      </div>

      {/* Легенда */}
      <div className="flex flex-wrap gap-3 mb-6 text-xs sm:text-sm">
        {Object.entries(categoryColors).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-4 h-4 ${value.bg} rounded`}></div>
            <span className="text-gray-700">{value.text}</span>
          </div>
        ))}
      </div>

      {/* График Ганта */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Заголовок с месяцами */}
          <div className="flex mb-2 bg-gray-100 rounded-lg p-2">
            <div className="w-48 font-semibold text-gray-700 text-sm">Работа</div>
            <div className="flex-1 flex">
              {months.map((month, idx) => (
                <div key={idx} className="flex-1 text-center text-xs font-semibold text-gray-600">
                  {month}
                </div>
              ))}
            </div>
            <div className="w-32 text-right font-semibold text-gray-700 text-sm">Ответственный</div>
          </div>

          {/* Задачи */}
          <div className="space-y-1">
            {tasks.map((task) => {
              const colors = categoryColors[task.category];
              const position = getTaskPosition(task);
              
              return (
                <div
                  key={task.id}
                  className="flex items-center hover:bg-gray-50 rounded transition-colors cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="w-48 text-xs sm:text-sm text-gray-700 py-2 px-1">
                    <span className="font-mono text-gray-500 mr-1">{task.id}</span>
                    {task.name}
                  </div>
                  <div className="flex-1 relative h-8">
                    <div
                      className={`absolute ${colors.bg} ${colors.border} border-2 rounded-lg h-6 top-1 transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center text-white text-xs font-semibold opacity-90 hover:opacity-100`}
                      style={position}
                    >
                      <span className="truncate px-1">{task.duration}м</span>
                    </div>
                  </div>
                  <div className="w-32 text-right text-xs text-gray-600 py-2 px-1">
                    {task.responsible}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Вертикальные линии месяцев */}
          <div className="relative h-2 mt-2">
            <div className="absolute inset-0 flex">
              {months.map((_, idx) => (
                <div key={idx} className="flex-1 border-l border-gray-300"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Детали выбранной задачи */}
      {selectedTask && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-l-blue-600">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-2">
                {selectedTask.id} {selectedTask.name}
              </h4>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>Категория:</strong> {categoryColors[selectedTask.category].text}</p>
                <p><strong>Начало:</strong> Месяц {Math.floor(selectedTask.startMonth) + 1}</p>
                <p><strong>Длительность:</strong> {selectedTask.duration} месяцев</p>
                <p><strong>Ответственный:</strong> {selectedTask.responsible}</p>
                <p><strong>Статус:</strong> {selectedTask.status === 'planned' ? 'Запланировано' : selectedTask.status === 'in-progress' ? 'В работе' : 'Завершено'}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTask(null)}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
      )}

      {/* Критический путь */}
      <div className="mt-6 p-4 bg-red-50 border-l-4 border-l-red-600 rounded-lg">
        <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
          <Icon name="AlertTriangle" size={20} className="text-red-600" />
          Критический путь (нельзя задерживать!)
        </h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Водолазные обследования → Конструкции ГТС → Экспертиза</li>
          <li>• Декларация Ростехнадзора → Подача в экспертизу</li>
          <li>• Переустройство ЛЭП (Россети) → Разрешение на строительство</li>
          <li>• ОВОС + общественные слушания → Экологическая экспертиза</li>
        </ul>
      </div>
    </Card>
  );
};

export default GanttChart;