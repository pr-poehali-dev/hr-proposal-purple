import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ChartData {
  phase: string;
  cost: number;
  duration: number;
  personnel: number;
  color: string;
}

const InteractiveChart = () => {
  const [chartType, setChartType] = useState<'cost' | 'duration' | 'personnel'>('cost');
  const [rotation, setRotation] = useState(0);
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  const data: ChartData[] = [
    { phase: 'Изыскания', cost: 2.1, duration: 1, personnel: 12, color: 'from-blue-500 to-cyan-500' },
    { phase: 'Согласования', cost: 1.5, duration: 1, personnel: 5, color: 'from-purple-500 to-violet-500' },
    { phase: 'Проектирование', cost: 8.2, duration: 2, personnel: 25, color: 'from-indigo-500 to-blue-500' },
    { phase: 'Революционные решения', cost: 2.8, duration: 2, personnel: 8, color: 'from-orange-500 to-red-500' },
    { phase: 'Экспертиза', cost: 0.8, duration: 2.5, personnel: 3, color: 'from-violet-500 to-purple-500' },
    { phase: 'Разрешения', cost: 3.0, duration: 1.5, personnel: 7, color: 'from-emerald-500 to-green-500' },
  ];

  const getMaxValue = () => {
    if (chartType === 'cost') return Math.max(...data.map(d => d.cost));
    if (chartType === 'duration') return Math.max(...data.map(d => d.duration));
    return Math.max(...data.map(d => d.personnel));
  };

  const getValue = (item: ChartData) => {
    if (chartType === 'cost') return item.cost;
    if (chartType === 'duration') return item.duration;
    return item.personnel;
  };

  const getLabel = () => {
    if (chartType === 'cost') return 'млн ₽';
    if (chartType === 'duration') return 'месяцев';
    return 'человек';
  };

  const maxValue = getMaxValue();

  return (
    <Card className="p-4 sm:p-6 bg-white shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Icon name="BarChart3" size={24} className="text-blue-600" />
          Интерактивная диаграмма проекта
        </h3>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={chartType === 'cost' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('cost')}
            className="text-xs sm:text-sm"
          >
            <Icon name="DollarSign" size={16} className="mr-1" />
            Стоимость
          </Button>
          <Button
            variant={chartType === 'duration' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('duration')}
            className="text-xs sm:text-sm"
          >
            <Icon name="Clock" size={16} className="mr-1" />
            Сроки
          </Button>
          <Button
            variant={chartType === 'personnel' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('personnel')}
            className="text-xs sm:text-sm"
          >
            <Icon name="Users" size={16} className="mr-1" />
            Персонал
          </Button>
        </div>
      </div>

      {/* 3D Вращающаяся диаграмма */}
      <div className="relative mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRotation(rotation - 15)}
          >
            <Icon name="RotateCcw" size={16} />
          </Button>
          <span className="text-sm text-gray-600">Поворот: {rotation}°</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRotation(rotation + 15)}
          >
            <Icon name="RotateCw" size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRotation(0)}
          >
            Сброс
          </Button>
        </div>

        <div 
          className="relative h-80 sm:h-96 transition-transform duration-500"
          style={{ 
            perspective: '1000px',
          }}
        >
          <div
            className="absolute inset-0 flex items-end justify-around px-4"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.5s ease-out',
            }}
          >
            {data.map((item, idx) => {
              const heightPercent = (getValue(item) / maxValue) * 100;
              const isHovered = hoveredPhase === item.phase;
              
              return (
                <div
                  key={idx}
                  className="relative flex flex-col items-center"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `translateZ(${isHovered ? '30px' : '0'})`,
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={() => setHoveredPhase(item.phase)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  {/* Столбец */}
                  <div
                    className={`w-12 sm:w-16 bg-gradient-to-t ${item.color} rounded-t-lg shadow-xl cursor-pointer transition-all hover:shadow-2xl relative overflow-hidden`}
                    style={{
                      height: `${heightPercent}%`,
                      minHeight: '40px',
                    }}
                  >
                    {/* Анимированный блеск */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"
                      style={{
                        animation: 'shine 2s infinite',
                      }}
                    />
                    
                    {/* Значение */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white font-bold text-xs sm:text-sm whitespace-nowrap">
                      {getValue(item).toFixed(1)}
                    </div>

                    {/* 3D эффект */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-2 bg-black opacity-20"
                      style={{
                        transform: 'translateZ(-5px)',
                      }}
                    />
                  </div>

                  {/* Подпись */}
                  <div className="mt-3 text-center">
                    <div className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {item.phase}
                    </div>
                    {isHovered && (
                      <div className="mt-2 p-2 bg-gray-900 text-white text-xs rounded shadow-lg animate-fade-in">
                        <div>💰 {item.cost} млн ₽</div>
                        <div>⏱️ {item.duration} мес</div>
                        <div>👥 {item.personnel} чел</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ось Y */}
        <div className="absolute left-2 top-0 bottom-16 flex flex-col justify-between text-xs text-gray-500">
          {[maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0].map((val, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span>{val.toFixed(1)}</span>
              <div className="w-2 h-px bg-gray-300"></div>
            </div>
          ))}
        </div>

        {/* Подпись оси */}
        <div className="text-center mt-2 text-sm font-semibold text-gray-700">
          {getLabel()}
        </div>
      </div>

      {/* Круговая диаграмма распределения стоимости */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="PieChart" size={20} className="text-blue-600" />
          Распределение бюджета (18.4 млн ₽)
        </h4>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Круговая диаграмма SVG */}
          <div className="relative w-48 h-48 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {(() => {
                const total = data.reduce((sum, item) => sum + item.cost, 0);
                let currentAngle = 0;
                
                return data.map((item, idx) => {
                  const percentage = (item.cost / total) * 100;
                  const angle = (percentage / 100) * 360;
                  const startAngle = currentAngle;
                  currentAngle += angle;
                  
                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (currentAngle * Math.PI) / 180;
                  
                  const x1 = 50 + 40 * Math.cos(startRad);
                  const y1 = 50 + 40 * Math.sin(startRad);
                  const x2 = 50 + 40 * Math.cos(endRad);
                  const y2 = 50 + 40 * Math.sin(endRad);
                  
                  const largeArc = angle > 180 ? 1 : 0;
                  
                  const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
                  
                  return (
                    <path
                      key={idx}
                      d={path}
                      fill={`url(#gradient-${idx})`}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={() => setHoveredPhase(item.phase)}
                      onMouseLeave={() => setHoveredPhase(null)}
                    />
                  );
                });
              })()}
              
              <defs>
                {data.map((item, idx) => {
                  // Карта цветов для SVG
                  const colorMap: { [key: string]: [string, string] } = {
                    'from-blue-500 to-cyan-500': ['#3b82f6', '#06b6d4'],
                    'from-purple-500 to-violet-500': ['#a855f7', '#8b5cf6'],
                    'from-indigo-500 to-blue-500': ['#6366f1', '#3b82f6'],
                    'from-orange-500 to-red-500': ['#f97316', '#ef4444'],
                    'from-violet-500 to-purple-500': ['#8b5cf6', '#a855f7'],
                    'from-emerald-500 to-green-500': ['#10b981', '#22c55e'],
                  };
                  const [startColor, endColor] = colorMap[item.color] || ['#3b82f6', '#06b6d4'];
                  
                  return (
                    <linearGradient key={idx} id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={startColor} />
                      <stop offset="100%" stopColor={endColor} />
                    </linearGradient>
                  );
                })}
              </defs>
            </svg>
          </div>

          {/* Легенда */}
          <div className="flex-1 space-y-2">
            {data.map((item, idx) => {
              const total = data.reduce((sum, d) => sum + d.cost, 0);
              const percentage = ((item.cost / total) * 100).toFixed(1);
              
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2 rounded transition-all cursor-pointer ${
                    hoveredPhase === item.phase ? 'bg-white shadow-md scale-105' : 'bg-white/50'
                  }`}
                  onMouseEnter={() => setHoveredPhase(item.phase)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded bg-gradient-to-br ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-800">{item.phase}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{item.cost} млн ₽</div>
                    <div className="text-xs text-gray-600">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </Card>
  );
};

export default InteractiveChart;