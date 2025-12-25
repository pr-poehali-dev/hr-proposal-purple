import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import * as XLSX from 'xlsx';

interface Task {
  id: string;
  name: string;
  startWeek: number;
  duration: number;
  category: 'survey' | 'approval' | 'design' | 'expertise' | 'permit';
  responsible: string;
  status: 'planned' | 'in-progress' | 'completed';
  dependencies?: string;
}

const GanttChart = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const tasks: Task[] = [
    // Недели 1-4: Изыскания и запрос ТУ
    { id: '1.1', name: 'Получение допуска от ФГБУ "Канал им. Москвы"', startWeek: 0, duration: 2, category: 'approval', responsible: 'ГИП / ЮГДОРПРОЕКТ', status: 'planned', dependencies: '-' },
    { id: '1.2', name: 'Анализ исходных данных', startWeek: 0, duration: 2, category: 'survey', responsible: 'ГИП', status: 'planned', dependencies: '-' },
    { id: '1.3', name: 'Инженерно-геодезические изыскания', startWeek: 1, duration: 3, category: 'survey', responsible: 'Геодезия', status: 'planned', dependencies: '1.1' },
    { id: '1.4', name: 'Инженерно-геологические изыскания', startWeek: 1, duration: 4, category: 'survey', responsible: 'Геология', status: 'planned', dependencies: '1.1' },
    { id: '1.5', name: 'Водолазное обследование ГУ-7', startWeek: 1, duration: 2, category: 'survey', responsible: 'Водолазы', status: 'planned', dependencies: '1.1' },
    { id: '1.6', name: 'Водолазное обследование ГУ-8', startWeek: 2, duration: 2, category: 'survey', responsible: 'Водолазы', status: 'planned', dependencies: '1.1' },
    { id: '1.7', name: 'Запрос ТУ в ПАО "Россети" (ЛЭП)', startWeek: 0, duration: 2, category: 'approval', responsible: 'Электроснабжение', status: 'planned', dependencies: '1.2' },
    { id: '1.8', name: 'Запрос ТУ в ПАО "Газпром"', startWeek: 0, duration: 2, category: 'approval', responsible: 'Газоснабжение', status: 'planned', dependencies: '1.2' },
    { id: '1.9', name: 'Запрос ТУ на временное подключение', startWeek: 1, duration: 2, category: 'approval', responsible: 'Электроснабжение', status: 'planned', dependencies: '1.2' },
    
    // Недели 5-8: Специальные изыскания и получение ТУ
    { id: '2.1', name: 'Инженерно-гидрометеорологические изыскания', startWeek: 4, duration: 3, category: 'survey', responsible: 'Гидрометеорология', status: 'planned', dependencies: '1.3, 1.4' },
    { id: '2.2', name: 'Инженерно-экологические изыскания', startWeek: 4, duration: 4, category: 'survey', responsible: 'Экология', status: 'planned', dependencies: '1.3, 1.4' },
    { id: '2.3', name: 'Дефектоскопия бетона', startWeek: 4, duration: 2, category: 'survey', responsible: 'Лаборатория НК', status: 'planned', dependencies: '1.5, 1.6' },
    { id: '2.4', name: 'Обследование металлоконструкций', startWeek: 5, duration: 2, category: 'survey', responsible: 'Лаборатория НК', status: 'planned', dependencies: '1.5, 1.6' },
    { id: '2.5', name: 'Получение ТУ от Россети', startWeek: 5, duration: 3, category: 'approval', responsible: 'Россети / СППИ', status: 'planned', dependencies: '1.7' },
    { id: '2.6', name: 'Получение ТУ от Газпром', startWeek: 6, duration: 3, category: 'approval', responsible: 'Газпром / СППИ', status: 'planned', dependencies: '1.8' },
    
    // Недели 9-16: Проектирование
    { id: '3.1', name: 'Раздел 1. Пояснительная записка', startWeek: 8, duration: 4, category: 'design', responsible: 'ГИП', status: 'planned', dependencies: 'Все изыскания' },
    { id: '3.2', name: 'Раздел 2. Генплан', startWeek: 8, duration: 4, category: 'design', responsible: 'Архитектура', status: 'planned', dependencies: '1.3, 2.2' },
    { id: '3.3', name: 'Раздел 3. Архитектурные решения', startWeek: 9, duration: 4, category: 'design', responsible: 'Архитектура', status: 'planned', dependencies: '3.2' },
    { id: '3.4', name: 'Раздел 4. Конструкции ГТС', startWeek: 8, duration: 6, category: 'design', responsible: 'Конструкторы ГТС', status: 'planned', dependencies: '1.4, 1.5, 1.6, 2.3, 2.4' },
    { id: '3.5', name: 'Раздел 5. Инженерные системы', startWeek: 10, duration: 5, category: 'design', responsible: 'ИТП', status: 'planned', dependencies: '2.5, 2.6, 3.4' },
    { id: '3.6', name: 'Раздел 6. ПОС', startWeek: 12, duration: 4, category: 'design', responsible: 'Технолог', status: 'planned', dependencies: '3.4, 3.5' },
    { id: '3.7', name: 'Раздел 8. ПМООС', startWeek: 9, duration: 5, category: 'design', responsible: 'Эколог', status: 'planned', dependencies: '2.2, 3.2' },
    { id: '3.8', name: 'Раздел 10. Пожарная безопасность', startWeek: 11, duration: 4, category: 'design', responsible: 'Отдел ПБ', status: 'planned', dependencies: '3.3, 3.5' },
    { id: '3.9', name: 'Раздел 11. Смета', startWeek: 13, duration: 3, category: 'design', responsible: 'Сметчик', status: 'planned', dependencies: '3.4, 3.5, 3.6' },
    { id: '3.10', name: 'Раздел 11.1. Безопасность ГТС', startWeek: 11, duration: 5, category: 'design', responsible: 'Отдел ГТС', status: 'planned', dependencies: '3.4, 2.1' },
    { id: '3.11', name: 'Проект переустройства ЛЭП', startWeek: 9, duration: 5, category: 'design', responsible: 'Электроснабжение', status: 'planned', dependencies: '2.5, 3.2' },
    { id: '3.12', name: 'Проект переустройства газопровода', startWeek: 10, duration: 5, category: 'design', responsible: 'Газоснабжение', status: 'planned', dependencies: '2.6, 3.2' },
    { id: '3.13', name: 'Согласование проекта ЛЭП с Россети', startWeek: 13, duration: 3, category: 'approval', responsible: 'Россети / СППИ', status: 'planned', dependencies: '3.11' },
    { id: '3.14', name: 'Согласование проекта газопровода с Газпром', startWeek: 14, duration: 3, category: 'approval', responsible: 'Газпром / СППИ', status: 'planned', dependencies: '3.12' },
    
    // Недели 17-24: Экспертиза
    { id: '4.1', name: 'Предварительное согласование с ФГБУ', startWeek: 16, duration: 2, category: 'approval', responsible: 'ГИП / ЮГДОРПРОЕКТ', status: 'planned', dependencies: '3.1-3.10' },
    { id: '4.2', name: 'Согласование с Росводресурсами', startWeek: 16, duration: 3, category: 'approval', responsible: 'Эколог / ЮГДОРПРОЕКТ', status: 'planned', dependencies: '3.7' },
    { id: '4.3', name: 'Согласование с Ростехнадзором', startWeek: 16, duration: 4, category: 'approval', responsible: 'Отдел ГТС', status: 'planned', dependencies: '3.10' },
    { id: '4.4', name: 'Подготовка документов для ГГЭ', startWeek: 18, duration: 2, category: 'expertise', responsible: 'ГИП', status: 'planned', dependencies: '4.1, 4.2, 4.3' },
    { id: '4.5', name: 'Подача в ГГЭ', startWeek: 19, duration: 1, category: 'expertise', responsible: 'ГИП / ЮГДОРПРОЕКТ', status: 'planned', dependencies: '4.4' },
    { id: '4.6', name: 'Рассмотрение в ГГЭ (45 раб.дней)', startWeek: 19, duration: 9, category: 'expertise', responsible: 'ФАУ ГГЭ России', status: 'planned', dependencies: '4.5' },
    
    // Недели 25-32: Доработка и разрешения
    { id: '5.1', name: 'Получение замечаний ГГЭ', startWeek: 27, duration: 1, category: 'expertise', responsible: 'ГИП', status: 'planned', dependencies: '4.6' },
    { id: '5.2', name: 'Устранение замечаний', startWeek: 27, duration: 3, category: 'expertise', responsible: 'Все отделы', status: 'planned', dependencies: '5.1' },
    { id: '5.3', name: 'Повторная подача в ГГЭ', startWeek: 29, duration: 1, category: 'expertise', responsible: 'ГИП / ЮГДОРПРОЕКТ', status: 'planned', dependencies: '5.2' },
    { id: '5.4', name: 'Получение положительного заключения ГГЭ', startWeek: 30, duration: 2, category: 'expertise', responsible: 'ФАУ ГГЭ России', status: 'planned', dependencies: '5.3' },
    { id: '5.5', name: 'Разрешение на переустройство ЛЭП', startWeek: 17, duration: 11, category: 'permit', responsible: 'Россети', status: 'planned', dependencies: '3.13' },
    { id: '5.6', name: 'Разрешение на переустройство газопровода', startWeek: 21, duration: 9, category: 'permit', responsible: 'Газпром', status: 'planned', dependencies: '3.14' },
    { id: '5.7', name: 'Подача заявления на РнС', startWeek: 31, duration: 1, category: 'permit', responsible: 'ЮГДОРПРОЕКТ / ФКУ', status: 'planned', dependencies: '5.4, 5.5, 5.6' },
    { id: '5.8', name: '✅ Получение разрешения на строительство', startWeek: 31, duration: 1, category: 'permit', responsible: 'Уполномоченный орган', status: 'planned', dependencies: '5.7' },
  ];

  const categoryColors = {
    survey: { bg: 'bg-blue-500', border: 'border-blue-600', text: 'Изыскания', hover: 'hover:bg-blue-600' },
    approval: { bg: 'bg-purple-500', border: 'border-purple-600', text: 'Согласования', hover: 'hover:bg-purple-600' },
    design: { bg: 'bg-indigo-500', border: 'border-indigo-600', text: 'Проектирование', hover: 'hover:bg-indigo-600' },
    expertise: { bg: 'bg-violet-500', border: 'border-violet-600', text: 'Экспертиза', hover: 'hover:bg-violet-600' },
    permit: { bg: 'bg-emerald-500', border: 'border-emerald-600', text: 'Разрешения', hover: 'hover:bg-emerald-600' },
  };

  const getTaskPosition = (task: Task) => {
    const weekWidth = 100 / 32; // 32 weeks total
    const left = task.startWeek * weekWidth;
    const width = task.duration * weekWidth;
    return { left: `${left}%`, width: `${width}%` };
  };

  const exportToExcel = () => {
    const excelData = tasks.map(task => ({
      '№': task.id,
      'Наименование работы': task.name,
      'Начало (неделя)': task.startWeek + 1,
      'Длительность (нед)': task.duration,
      'Окончание (неделя)': task.startWeek + task.duration,
      'Категория': categoryColors[task.category].text,
      'Ответственный': task.responsible,
      'Зависимости': task.dependencies || '-',
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    ws['!cols'] = [
      { wch: 8 },
      { wch: 50 },
      { wch: 15 },
      { wch: 17 },
      { wch: 17 },
      { wch: 20 },
      { wch: 25 },
      { wch: 25 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'План-график');

    const summaryData = [
      { 'Показатель': 'Всего работ', 'Значение': tasks.length },
      { 'Показатель': 'Срок выполнения', 'Значение': '32 недели (8 месяцев, до августа 2026)' },
      { 'Показатель': 'Изыскания', 'Значение': tasks.filter(t => t.category === 'survey').length },
      { 'Показатель': 'Согласования', 'Значение': tasks.filter(t => t.category === 'approval').length },
      { 'Показатель': 'Проектирование', 'Значение': tasks.filter(t => t.category === 'design').length },
      { 'Показатель': 'Экспертиза', 'Значение': tasks.filter(t => t.category === 'expertise').length },
      { 'Показатель': 'Разрешения', 'Значение': tasks.filter(t => t.category === 'permit').length },
    ];
    
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    wsSummary['!cols'] = [{ wch: 30 }, { wch: 50 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Сводка');

    XLSX.writeFile(wb, 'План-график_ГУ-7-8_Канал-294.xlsx');
  };

  // Generate week labels (W1, W2, ..., W32)
  const weekLabels = Array.from({ length: 32 }, (_, i) => `W${i + 1}`);
  
  // Generate month labels for visual grouping
  const monthLabels = [
    { name: 'Янв 2026', weeks: 4 },
    { name: 'Фев 2026', weeks: 4 },
    { name: 'Мар 2026', weeks: 4 },
    { name: 'Апр 2026', weeks: 4 },
    { name: 'Май 2026', weeks: 4 },
    { name: 'Июн 2026', weeks: 4 },
    { name: 'Июл 2026', weeks: 4 },
    { name: 'Авг 2026', weeks: 4 },
  ];

  return (
    <Card className="p-4 sm:p-6 bg-white shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Icon name="CalendarRange" size={24} className="text-blue-600" />
          План-график работ (январь — август 2026)
        </h3>
        <Button
          onClick={exportToExcel}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Icon name="Download" size={16} className="mr-2" />
          Скачать Excel
        </Button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
        {Object.entries(categoryColors).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${value.bg}`} />
            <span className="text-sm text-gray-700">{value.text}</span>
          </div>
        ))}
      </div>

      {/* Gantt Chart */}
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          {/* Month Headers */}
          <div className="flex border-b-2 border-gray-300 mb-2">
            {monthLabels.map((month, idx) => (
              <div
                key={idx}
                className="flex-1 text-center py-2 font-bold text-gray-700 bg-gray-100 border-r border-gray-300"
                style={{ width: `${(month.weeks / 32) * 100}%` }}
              >
                {month.name}
              </div>
            ))}
          </div>

          {/* Week Headers */}
          <div className="flex border-b border-gray-300 mb-4">
            {weekLabels.map((week, idx) => (
              <div
                key={idx}
                className={`flex-1 text-center py-1 text-xs text-gray-600 ${
                  idx % 4 === 3 ? 'border-r-2 border-gray-400' : 'border-r border-gray-200'
                }`}
                style={{ width: `${100 / 32}%` }}
              >
                {week}
              </div>
            ))}
          </div>

          {/* Tasks */}
          <div className="space-y-2">
            {tasks.map((task) => {
              const position = getTaskPosition(task);
              const colors = categoryColors[task.category];
              
              return (
                <div
                  key={task.id}
                  className="relative h-10 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <div
                    className={`absolute h-full ${colors.bg} ${colors.hover} ${colors.border} border-2 rounded flex items-center px-2 text-white text-xs font-semibold transition-all shadow-md hover:shadow-lg overflow-hidden`}
                    style={position}
                    title={task.name}
                  >
                    <span className="truncate">{task.id} {task.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Task Details */}
      {selectedTask && (
        <Card className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300">
          <div className="flex items-start justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Icon name="Info" size={20} className="text-blue-600" />
              {selectedTask.id}: {selectedTask.name}
            </h4>
            <button onClick={() => setSelectedTask(null)} className="text-gray-500 hover:text-gray-700">
              <Icon name="X" size={20} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Начало:</span>
              <span className="ml-2">Неделя {selectedTask.startWeek + 1}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Длительность:</span>
              <span className="ml-2">{selectedTask.duration} недель</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Окончание:</span>
              <span className="ml-2">Неделя {selectedTask.startWeek + selectedTask.duration}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Категория:</span>
              <span className="ml-2">{categoryColors[selectedTask.category].text}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="font-semibold text-gray-700">Ответственный:</span>
              <span className="ml-2">{selectedTask.responsible}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="font-semibold text-gray-700">Зависимости:</span>
              <span className="ml-2">{selectedTask.dependencies || '-'}</span>
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default GanttChart;