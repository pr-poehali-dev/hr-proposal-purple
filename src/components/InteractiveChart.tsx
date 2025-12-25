import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const InteractiveChart = () => {
  const [activeView, setActiveView] = useState<'category' | 'timeline'>('category');

  const categoryData = [
    { name: 'Изыскания', count: 9, color: 'bg-blue-500', percentage: 21 },
    { name: 'Согласования', count: 11, color: 'bg-purple-500', percentage: 26 },
    { name: 'Проектирование', count: 12, color: 'bg-indigo-500', percentage: 28 },
    { name: 'Экспертиза', count: 7, color: 'bg-violet-500', percentage: 16 },
    { name: 'Разрешения', count: 4, color: 'bg-emerald-500', percentage: 9 },
  ];

  const timelineData = [
    { month: 'Январь 2026', tasks: 9, weeks: 'W1-W4', focus: 'Мобилизация и инженерные изыскания' },
    { month: 'Февраль 2026', tasks: 6, weeks: 'W5-W8', focus: 'Специальные изыскания и получение ТУ' },
    { month: 'Март 2026', tasks: 8, weeks: 'W9-W12', focus: 'Начало проектирования ПД' },
    { month: 'Апрель 2026', tasks: 8, weeks: 'W13-W16', focus: 'Завершение ПД и согласования' },
    { month: 'Май 2026', tasks: 5, weeks: 'W17-W20', focus: 'Предварительные согласования и подача в ГГЭ' },
    { month: 'Июнь 2026', tasks: 4, weeks: 'W21-W24', focus: 'Рассмотрение в Главгосэкспертизе' },
    { month: 'Июль 2026', tasks: 2, weeks: 'W25-W28', focus: 'Доработка по замечаниям ГГЭ' },
    { month: 'Август 2026', tasks: 1, weeks: 'W29-W32', focus: 'Получение разрешения на строительство' },
  ];

  const keyMilestones = [
    { week: 'W2', milestone: 'Допуск от ФГБУ', icon: 'CheckCircle', color: 'text-blue-600' },
    { week: 'W8', milestone: 'Завершение изысканий', icon: 'MapPin', color: 'text-purple-600' },
    { week: 'W16', milestone: 'ПД готова', icon: 'FileCheck', color: 'text-indigo-600' },
    { week: 'W20', milestone: 'Подача в ГГЭ', icon: 'Send', color: 'text-violet-600' },
    { week: 'W28', milestone: 'Замечания ГГЭ', icon: 'MessageSquare', color: 'text-orange-600' },
    { week: 'W32', milestone: 'Разрешение на строительство', icon: 'Award', color: 'text-emerald-600' },
  ];

  const criticalPath = [
    { task: 'Получение допуска ФГБУ', impact: 'Блокирует все изыскания', criticality: 'high' },
    { task: 'Получение ТУ от Россети/Газпром', impact: 'Необходимо для проектов переустройства', criticality: 'high' },
    { task: 'Согласование с Ростехнадзором', impact: 'Требуется до подачи в ГГЭ', criticality: 'high' },
    { task: 'Экспертиза ГГЭ (45 дней)', impact: 'Самый длительный этап', criticality: 'critical' },
    { task: 'Разрешения на переустройство сетей', impact: 'Необходимы для РнС', criticality: 'medium' },
  ];

  const maxTasks = Math.max(...timelineData.map(d => d.tasks));

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveView('category')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            activeView === 'category'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Icon name="PieChart" size={18} className="inline mr-2" />
          По категориям
        </button>
        <button
          onClick={() => setActiveView('timeline')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            activeView === 'timeline'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Icon name="BarChart3" size={18} className="inline mr-2" />
          По месяцам
        </button>
      </div>

      {/* Category View */}
      {activeView === 'category' && (
        <Card className="p-6 bg-gradient-to-br from-white to-blue-50 shadow-xl">
          <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Icon name="PieChart" size={24} className="text-blue-600" />
            Распределение работ по категориям
          </h3>
          
          <div className="space-y-4">
            {categoryData.map((category, idx) => (
              <div key={idx} className="group hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${category.color}`} />
                    <span className="font-semibold text-gray-900">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-gray-100 text-gray-700">{category.count} работ</Badge>
                    <span className="text-sm font-bold text-gray-600">{category.percentage}%</span>
                  </div>
                </div>
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`absolute h-full ${category.color} transition-all duration-1000 ease-out flex items-center justify-end px-3`}
                    style={{ width: `${category.percentage}%` }}
                  >
                    <span className="text-white text-xs font-bold">
                      {category.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <p className="text-sm text-gray-700">
              <Icon name="Info" size={16} className="inline text-blue-600 mr-2" />
              <strong>Всего работ:</strong> 43 | <strong>Проектирование</strong> занимает наибольший объем (37%)
            </p>
          </div>
        </Card>
      )}

      {/* Timeline View */}
      {activeView === 'timeline' && (
        <Card className="p-6 bg-gradient-to-br from-white to-purple-50 shadow-xl">
          <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Icon name="BarChart3" size={24} className="text-purple-600" />
            Распределение работ по месяцам
          </h3>
          
          <div className="space-y-3">
            {timelineData.map((month, idx) => (
              <div key={idx} className="group hover:scale-105 transition-transform">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-bold text-gray-900">{month.month}</span>
                    <span className="ml-3 text-sm text-gray-600">({month.weeks})</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700">{month.tasks} работ</Badge>
                </div>
                <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden mb-1">
                  <div
                    className="absolute h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-1000 ease-out"
                    style={{ width: `${(month.tasks / maxTasks) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 italic">{month.focus}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Key Milestones */}
      <Card className="p-6 bg-gradient-to-br from-white to-emerald-50 shadow-xl">
        <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-3">
          <Icon name="Flag" size={24} className="text-emerald-600" />
          Ключевые контрольные точки
        </h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyMilestones.map((milestone, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon name={milestone.icon} size={24} className={milestone.color} />
                <Badge className="bg-gray-100 text-gray-700">{milestone.week}</Badge>
              </div>
              <p className="text-sm font-semibold text-gray-900">{milestone.milestone}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Critical Path */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-red-500 shadow-xl">
        <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-3">
          <Icon name="AlertTriangle" size={24} className="text-red-600" />
          Критический путь проекта
        </h3>
        
        <div className="space-y-3">
          {criticalPath.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${
                item.criticality === 'critical'
                  ? 'bg-red-100 border-red-400'
                  : item.criticality === 'high'
                  ? 'bg-orange-100 border-orange-400'
                  : 'bg-yellow-100 border-yellow-400'
              } hover:shadow-lg transition-all`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-gray-900 mb-1">{item.task}</p>
                  <p className="text-sm text-gray-700">{item.impact}</p>
                </div>
                <Badge
                  className={`${
                    item.criticality === 'critical'
                      ? 'bg-red-600 text-white'
                      : item.criticality === 'high'
                      ? 'bg-orange-600 text-white'
                      : 'bg-yellow-600 text-white'
                  }`}
                >
                  {item.criticality === 'critical' ? 'КРИТИЧНО' : item.criticality === 'high' ? 'ВЫСОКИЙ' : 'СРЕДНИЙ'}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border-2 border-red-300">
          <p className="text-sm text-gray-700 flex items-start gap-2">
            <Icon name="Lightbulb" size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Управление критическим путем:</strong> Параллельное выполнение изысканий и запроса ТУ сокращает срок на 4 недели. 
              Предварительные согласования до подачи в ГГЭ минимизируют риск повторных итераций.
            </span>
          </p>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
          <Icon name="Clock" size={32} className="mb-3 opacity-80" />
          <div className="text-3xl font-bold mb-1">32</div>
          <div className="text-blue-100">недели</div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
          <Icon name="ListTodo" size={32} className="mb-3 opacity-80" />
          <div className="text-3xl font-bold mb-1">43</div>
          <div className="text-purple-100">работы</div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
          <Icon name="Users" size={32} className="mb-3 opacity-80" />
          <div className="text-3xl font-bold mb-1">12+</div>
          <div className="text-emerald-100">отделов</div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
          <Icon name="AlertTriangle" size={32} className="mb-3 opacity-80" />
          <div className="text-3xl font-bold mb-1">5</div>
          <div className="text-orange-100">критических точек</div>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveChart;