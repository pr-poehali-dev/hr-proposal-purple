import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import GanttChart from '@/components/GanttChart';
import InteractiveChart from '@/components/InteractiveChart';

import Interactive3DChart from '@/components/Interactive3DChart';
import { exportRoadmapToWord } from '@/utils/exportToWord';

const Roadmap = () => {
  const [activePhase, setActivePhase] = useState<string>('overview');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phases = [
    { id: 'overview', label: 'Обзор', icon: 'Eye' },
    { id: 'stakeholders', label: 'Стейкхолдеры', icon: 'Users' },
    { id: 'interactive', label: 'Интерактив', icon: 'Box' },
    { id: 'phase1', label: 'Январь', icon: 'Calendar' },
    { id: 'phase2', label: 'Февраль', icon: 'Calendar' },
    { id: 'phase3', label: 'Март-Апрель', icon: 'Calendar' },
    { id: 'phase4', label: 'Май-Июнь', icon: 'Calendar' },
    { id: 'phase5', label: 'Июль-Август', icon: 'Calendar' },
    { id: 'gantt', label: 'Календарь', icon: 'BarChart3' },
    { id: 'charts', label: 'Диаграммы', icon: 'PieChart' },
  ];

  const scrollToPhase = (id: string) => {
    setActivePhase(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 relative overflow-hidden">
      {/* Animated 3D Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${scrollY * 0.1}px, ${scrollY * 0.15}px, 0) scale(${1 + scrollY * 0.0001})`,
            top: '10%',
            left: '5%',
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${-scrollY * 0.12}px, ${scrollY * 0.1}px, 0) scale(${1 + scrollY * 0.0001})`,
            top: '40%',
            right: '10%',
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${scrollY * 0.08}px, ${-scrollY * 0.1}px, 0) scale(${1 + scrollY * 0.0001})`,
            bottom: '20%',
            left: '15%',
          }}
        />
      </div>

      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-screen w-20 bg-white/80 backdrop-blur-lg border-r border-blue-200 shadow-lg z-50 hidden lg:flex flex-col items-center py-8 gap-6 mt-20">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-300">
            <Icon name="Map" size={24} />
          </div>
        </div>
        <Separator className="w-12 bg-blue-200" />
        {phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() => scrollToPhase(phase.id)}
            className={`group relative flex flex-col items-center gap-1 p-2 rounded-lg transition-all transform hover:scale-110 ${
              activePhase === phase.id
                ? 'bg-blue-100 text-blue-700 scale-110'
                : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
            }`}
            title={phase.label}
          >
            <Icon name={phase.icon} size={20} />
            <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {phase.label}
            </div>
          </button>
        ))}
      </nav>

      <main className="lg:ml-20 pt-20 relative z-10">
        {/* Header Section with 3D Effect */}
        <section className="min-h-[50vh] flex items-center justify-center relative overflow-hidden px-4 py-12">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-purple-600/10" />
          
          <div className="relative z-10 max-w-6xl text-center transform hover:scale-105 transition-transform duration-500">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-300 px-4 py-2 text-sm animate-pulse">
              Проектная документация ПП РФ №87
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-cyan-600 to-purple-700 bg-clip-text text-transparent leading-tight">
              Дорожная карта проекта
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 font-light px-2">
              Реконструкция Гидроузлов №7 и №8<br />Канала имени Москвы (канал №294)<br />
              <span className="text-base text-gray-600">Январь — Август 2026</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-4 shadow-2xl border border-blue-200 hover:shadow-blue-300/50 transition-all transform hover:scale-105">
                <Icon name="FileText" size={24} className="text-blue-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-600">Исполнитель</div>
                  <div className="text-lg font-bold text-gray-900">ООО «СППИ»</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-4 shadow-2xl border border-blue-200 hover:shadow-blue-300/50 transition-all transform hover:scale-105">
                <Icon name="Building2" size={24} className="text-blue-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-600">Заказчик</div>
                  <div className="text-lg font-bold text-gray-900">ООО «ЮГДОРПРОЕКТ»</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-2xl border border-blue-200 hover:shadow-blue-300/50 transition-all transform hover:scale-110 hover:-rotate-2">
                <div className="text-3xl font-bold text-blue-700">32</div>
                <div className="text-sm text-gray-600">недели</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-2xl border border-blue-200 hover:shadow-blue-300/50 transition-all transform hover:scale-110 hover:rotate-2">
                <div className="text-3xl font-bold text-blue-700">8</div>
                <div className="text-sm text-gray-600">месяцев</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-2xl border border-blue-200 hover:shadow-blue-300/50 transition-all transform hover:scale-110 hover:-rotate-2">
                <div className="text-xl font-bold text-blue-700">Август 2026</div>
                <div className="text-sm text-gray-600">завершение</div>
              </div>
            </div>

            {/* Progress Control Notice */}
            <div className="mt-8 max-w-2xl mx-auto">
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 shadow-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={24} className="text-cyan-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Контроль прогресса</h3>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Карта будет актуализироваться по мере выполнения работ, вы сможете отслеживать статус в реальном времени.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Agreement Stages */}
            <div className="mt-8 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-900">Этапы согласования</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Stage 1 - Completed */}
                <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={18} className="text-white" />
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">Завершено</Badge>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">1. Согласование КП</h4>
                  <p className="text-xs text-gray-600">Коммерческое предложение согласовано</p>
                </Card>

                {/* Stage 2 - In Progress (Current, Glowing) */}
                <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-400 shadow-2xl animate-pulse">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/50">
                      <Icon name="Clock" size={18} className="text-white" />
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-xs">Текущий</Badge>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">2. Согласование дорожной карты</h4>
                  <p className="text-xs text-gray-600">В процессе согласования</p>
                </Card>

                {/* Stage 3 - Pending */}
                <Card className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-300 shadow-lg opacity-75">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
                      <Icon name="CircleDashed" size={18} className="text-white" />
                    </div>
                    <Badge className="bg-gray-100 text-gray-600 border-gray-300 text-xs">Ожидается</Badge>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">3. Согласование договора</h4>
                  <p className="text-xs text-gray-600">После утверждения карты</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-300 px-4 py-2">
              Обзор проекта
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Стратегическое управление проектом ГТС
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-white to-blue-50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:-rotate-1">
                <h3 className="text-xl font-bold mb-4 text-blue-900 flex items-center gap-3">
                  <Icon name="Target" size={24} className="text-blue-600" />
                  Цель проекта
                </h3>
                <p className="text-gray-700">
                  Разработка полного комплекта проектной документации для реконструкции гидроузлов №7 и №8 канала №294 с получением положительного заключения государственной экспертизы и разрешения на строительство.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-white to-cyan-50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:rotate-1">
                <h3 className="text-xl font-bold mb-4 text-cyan-900 flex items-center gap-3">
                  <Icon name="Shield" size={24} className="text-cyan-600" />
                  Нормативная база
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-cyan-600 mt-1 flex-shrink-0" />
                    <span>ПП РФ №87 (состав проектной документации)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-cyan-600 mt-1 flex-shrink-0" />
                    <span>СП 47.13330 (гидротехнические сооружения)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-cyan-600 mt-1 flex-shrink-0" />
                    <span>ФЗ №117-ФЗ (безопасность ГТС)</span>
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-6 text-purple-900 flex items-center gap-3">
                <Icon name="TrendingUp" size={28} className="text-purple-600" />
                Ключевые особенности управления проектом
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white/80 p-4 rounded-lg border border-purple-200 hover:shadow-lg transition-all transform hover:scale-105">
                  <Icon name="Zap" size={24} className="text-purple-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2">Параллелизация процессов</h4>
                  <p className="text-sm text-gray-700">Одновременное выполнение изысканий, получения ТУ и начало проектирования</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg border border-purple-200 hover:shadow-lg transition-all transform hover:scale-105">
                  <Icon name="GitBranch" size={24} className="text-purple-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2">Управление критическим путем</h4>
                  <p className="text-sm text-gray-700">Фокус на разрешительные процедуры с длительными сроками согласования</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg border border-purple-200 hover:shadow-lg transition-all transform hover:scale-105">
                  <Icon name="Timer" size={24} className="text-purple-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2">Буферы на согласования</h4>
                  <p className="text-sm text-gray-700">Резервное время на работу с замечаниями госорганов и монополистов</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg border border-purple-200 hover:shadow-lg transition-all transform hover:scale-105">
                  <Icon name="Network" size={24} className="text-purple-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2">Цепочка взаимодействия</h4>
                  <p className="text-sm text-gray-700">СППИ → ЮГДОРПРОЕКТ → ФГБУ «Канал им. Москвы» → ФКУ «Ространсмодернизация»</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg border border-purple-200 hover:shadow-lg transition-all transform hover:scale-105">
                  <Icon name="ShieldCheck" size={24} className="text-purple-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2">Проактивное управление</h4>
                  <p className="text-sm text-gray-700">Упреждающие действия для минимизации рисков и задержек</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg border border-purple-200 hover:shadow-lg transition-all transform hover:scale-105">
                  <Icon name="CheckSquare" size={24} className="text-purple-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2">Гарантия сроков</h4>
                  <p className="text-sm text-gray-700">Завершение к августу 2026 с учетом всех согласований</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Stakeholders Section */}
        <section id="stakeholders" className="min-h-screen py-20 px-4 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-300 px-4 py-2">
              Стейкхолдеры
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Ключевые участники проекта
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-white to-red-50 shadow-xl border-l-4 border-red-500 hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Icon name="Building" size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Госзаказчик</h3>
                    <p className="text-lg text-red-700 font-semibold">ФКУ «Ространсмодернизация»</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">Федеральный орган, финансирующий проект и контролирующий его выполнение</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-white to-blue-50 shadow-xl border-l-4 border-blue-500 hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="Building2" size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Заказчик</h3>
                    <p className="text-lg text-blue-700 font-semibold">ООО «ЮГДОРПРОЕКТ»</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">Наш непосредственный заказчик, координирующий работу с госструктурами</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-white to-purple-50 shadow-xl border-l-4 border-purple-500 hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon name="Briefcase" size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Исполнитель</h3>
                    <p className="text-lg text-purple-700 font-semibold">ООО «СППИ»</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">Санкт-Петербургский проектный институт — разработчик проектной документации</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-white to-cyan-50 shadow-xl border-l-4 border-cyan-500 hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Icon name="Waves" size={24} className="text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Эксплуатант</h3>
                    <p className="text-lg text-cyan-700 font-semibold">ФГБУ «Канал имени Москвы»</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">Балансодержатель ГТС, согласующий все проектные решения</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-white to-emerald-50 shadow-xl border-l-4 border-emerald-500 hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Icon name="Zap" size={24} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Ресурсники</h3>
                    <p className="text-lg text-emerald-700 font-semibold">ПАО «Россети»</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">Балансодержатель электросетей, выдача ТУ на переустройство ЛЭП</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-white to-orange-50 shadow-xl border-l-4 border-orange-500 hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Icon name="Flame" size={24} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Ресурсники</h3>
                    <p className="text-lg text-orange-700 font-semibold">ПАО «Газпром»</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">Балансодержатель газопроводов, выдача ТУ на переустройство сетей</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Section */}
        <section id="interactive" className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-300 px-4 py-2">
              Интерактивная визуализация
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Управление проектом в 3D
            </h2>
            <Interactive3DChart />
          </div>
        </section>

        {/* Phase 1: January */}
        <section id="phase1" className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-300 px-4 py-2">
              Январь 2026 (Недели 1-4)
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Мобилизация и инженерные изыскания
            </h2>

            <Card className="p-6 sm:p-8 mb-8 bg-gradient-to-br from-white to-blue-50 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-900 flex items-center gap-3">
                <Icon name="FileSearch" size={24} className="text-blue-600" />
                Этап 1: Подготовительные работы и анализ
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="p-3 text-left font-bold">№</th>
                      <th className="p-3 text-left font-bold">Мероприятие</th>
                      <th className="p-3 text-left font-bold">Срок (недели)</th>
                      <th className="p-3 text-left font-bold">Ответственный</th>
                      <th className="p-3 text-left font-bold">Результат</th>
                      <th className="p-3 text-left font-bold">Зависимости</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-3 font-semibold">1.1</td>
                      <td className="p-3">Получение допуска от ФГБУ «Канал им. Москвы»</td>
                      <td className="p-3">W1-W2</td>
                      <td className="p-3">ГИП / ЮГДОРПРОЕКТ</td>
                      <td className="p-3">Письмо-разрешение на мобилизацию</td>
                      <td className="p-3">-</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-3 font-semibold">1.2</td>
                      <td className="p-3">Анализ исходных данных и архивной документации</td>
                      <td className="p-3">W1-W2</td>
                      <td className="p-3">ГИП</td>
                      <td className="p-3">Отчет по анализу, выявление недостающих данных</td>
                      <td className="p-3">-</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-3 font-semibold">1.3</td>
                      <td className="p-3">Инженерно-геодезические изыскания</td>
                      <td className="p-3">W2-W4</td>
                      <td className="p-3">Геодезический отдел</td>
                      <td className="p-3">Топографическая съемка М1:500, цифровая модель рельефа</td>
                      <td className="p-3">1.1</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-3 font-semibold">1.4</td>
                      <td className="p-3">Инженерно-геологические и гидрогеотехнические изыскания</td>
                      <td className="p-3">W2-W5</td>
                      <td className="p-3">Геологический отдел</td>
                      <td className="p-3">Отчет по ИГИ, фильтрационные расчеты</td>
                      <td className="p-3">1.1</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-3 font-semibold">1.5</td>
                      <td className="p-3">Водолазное обследование ГУ-7</td>
                      <td className="p-3">W2-W3</td>
                      <td className="p-3">Подрядчик (водолазы)</td>
                      <td className="p-3">Акт обследования, дефектные ведомости</td>
                      <td className="p-3">1.1</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-3 font-semibold">1.6</td>
                      <td className="p-3">Водолазное обследование ГУ-8</td>
                      <td className="p-3">W3-W4</td>
                      <td className="p-3">Подрядчик (водолазы)</td>
                      <td className="p-3">Акт обследования, дефектные ведомости</td>
                      <td className="p-3">1.1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 bg-gradient-to-br from-white to-cyan-50 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-cyan-900 flex items-center gap-3">
                <Icon name="FileCheck" size={24} className="text-cyan-600" />
                Этап 2: Запрос технических условий (параллельно с изысканиями)
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-cyan-100">
                    <tr>
                      <th className="p-3 text-left font-bold">№</th>
                      <th className="p-3 text-left font-bold">Мероприятие</th>
                      <th className="p-3 text-left font-bold">Срок (недели)</th>
                      <th className="p-3 text-left font-bold">Ответственный</th>
                      <th className="p-3 text-left font-bold">Результат</th>
                      <th className="p-3 text-left font-bold">Зависимости</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-cyan-50/50 transition-colors">
                      <td className="p-3 font-semibold">1.7</td>
                      <td className="p-3">Запрос ТУ в ПАО «Россети» (ЛЭП)</td>
                      <td className="p-3">W1-W2</td>
                      <td className="p-3">Отдел электроснабжения</td>
                      <td className="p-3">Заявка на выдачу ТУ</td>
                      <td className="p-3">1.2</td>
                    </tr>
                    <tr className="hover:bg-cyan-50/50 transition-colors">
                      <td className="p-3 font-semibold">1.8</td>
                      <td className="p-3">Запрос ТУ в ПАО «Газпром» (газопровод)</td>
                      <td className="p-3">W1-W2</td>
                      <td className="p-3">Отдел газоснабжения</td>
                      <td className="p-3">Заявка на выдачу ТУ</td>
                      <td className="p-3">1.2</td>
                    </tr>
                    <tr className="hover:bg-cyan-50/50 transition-colors">
                      <td className="p-3 font-semibold">1.9</td>
                      <td className="p-3">Запрос ТУ на временное подключение стройплощадки</td>
                      <td className="p-3">W2-W3</td>
                      <td className="p-3">Отдел электроснабжения</td>
                      <td className="p-3">Заявка на временное присоединение</td>
                      <td className="p-3">1.2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* Phase 2: February */}
        <section id="phase2" className="min-h-screen py-20 px-4 bg-gradient-to-br from-purple-50/50 to-blue-50/50">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-300 px-4 py-2">
              Февраль 2026 (Недели 5-8)
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Специальные обследования и согласования
            </h2>

            <Card className="p-6 sm:p-8 mb-8 bg-gradient-to-br from-white to-purple-50 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-purple-900 flex items-center gap-3">
                <Icon name="Search" size={24} className="text-purple-600" />
                Этап 3: Инструментальный контроль и экология
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-purple-100">
                    <tr>
                      <th className="p-3 text-left font-bold">№</th>
                      <th className="p-3 text-left font-bold">Мероприятие</th>
                      <th className="p-3 text-left font-bold">Срок (недели)</th>
                      <th className="p-3 text-left font-bold">Ответственный</th>
                      <th className="p-3 text-left font-bold">Результат</th>
                      <th className="p-3 text-left font-bold">Зависимости</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-purple-50/50 transition-colors">
                      <td className="p-3 font-semibold">2.1</td>
                      <td className="p-3">Инженерно-гидрометеорологические изыскания</td>
                      <td className="p-3">W5-W7</td>
                      <td className="p-3">Гидрометеорологи</td>
                      <td className="p-3">Отчет: режимы уровней, ледовая нагрузка</td>
                      <td className="p-3">1.3, 1.4</td>
                    </tr>
                    <tr className="hover:bg-purple-50/50 transition-colors">
                      <td className="p-3 font-semibold">2.2</td>
                      <td className="p-3">Инженерно-экологические изыскания (для ПМООС)</td>
                      <td className="p-3">W5-W8</td>
                      <td className="p-3">Экологический отдел</td>
                      <td className="p-3">Отчет по ИЭИ, ОВОС</td>
                      <td className="p-3">1.3, 1.4</td>
                    </tr>
                    <tr className="hover:bg-purple-50/50 transition-colors">
                      <td className="p-3 font-semibold">2.3</td>
                      <td className="p-3">Дефектоскопия бетонных конструкций</td>
                      <td className="p-3">W5-W6</td>
                      <td className="p-3">Лаборатория НК</td>
                      <td className="p-3">Протоколы испытаний прочности бетона</td>
                      <td className="p-3">1.5, 1.6</td>
                    </tr>
                    <tr className="hover:bg-purple-50/50 transition-colors">
                      <td className="p-3 font-semibold">2.4</td>
                      <td className="p-3">Обследование металлоконструкций затворов</td>
                      <td className="p-3">W6-W7</td>
                      <td className="p-3">Лаборатория НК</td>
                      <td className="p-3">Дефектные ведомости, расчет остаточного ресурса</td>
                      <td className="p-3">1.5, 1.6</td>
                    </tr>
                    <tr className="hover:bg-purple-50/50 transition-colors">
                      <td className="p-3 font-semibold">2.5</td>
                      <td className="p-3">Получение ТУ от ПАО «Россети» (ответ)</td>
                      <td className="p-3">W6-W8</td>
                      <td className="p-3">Россети / СППИ</td>
                      <td className="p-3">Технические условия на переустройство ЛЭП</td>
                      <td className="p-3">1.7</td>
                    </tr>
                    <tr className="hover:bg-purple-50/50 transition-colors">
                      <td className="p-3 font-semibold">2.6</td>
                      <td className="p-3">Получение ТУ от ПАО «Газпром» (ответ)</td>
                      <td className="p-3">W7-W9</td>
                      <td className="p-3">Газпром / СППИ</td>
                      <td className="p-3">Технические условия на переустройство газопровода</td>
                      <td className="p-3">1.8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* Phase 3: March-April */}
        <section id="phase3" className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-indigo-100 text-indigo-700 border-indigo-300 px-4 py-2">
              Март-Апрель 2026 (Недели 9-16)
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Разработка проектной документации
            </h2>

            <Card className="p-6 sm:p-8 mb-8 bg-gradient-to-br from-white to-indigo-50 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-indigo-900 flex items-center gap-3">
                <Icon name="FileText" size={24} className="text-indigo-600" />
                Этап 4: Проектирование по ПП РФ №87
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-indigo-100">
                    <tr>
                      <th className="p-3 text-left font-bold">№</th>
                      <th className="p-3 text-left font-bold">Раздел ПД</th>
                      <th className="p-3 text-left font-bold">Срок (недели)</th>
                      <th className="p-3 text-left font-bold">Ответственный</th>
                      <th className="p-3 text-left font-bold">Результат</th>
                      <th className="p-3 text-left font-bold">Зависимости</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-indigo-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.1</td>
                      <td className="p-3">Раздел 1. Пояснительная записка</td>
                      <td className="p-3">W9-W12</td>
                      <td className="p-3">ГИП</td>
                      <td className="p-3">Полный текст ПЗ с обоснованием решений</td>
                      <td className="p-3">Все изыскания</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.2</td>
                      <td className="p-3">Раздел 2. Схема планировочной организации земельного участка</td>
                      <td className="p-3">W9-W12</td>
                      <td className="p-3">Архитектурный отдел</td>
                      <td className="p-3">Генплан, вертикальная планировка</td>
                      <td className="p-3">1.3, 2.2</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.3</td>
                      <td className="p-3">Раздел 3. Архитектурные решения</td>
                      <td className="p-3">W10-W13</td>
                      <td className="p-3">Архитектурный отдел</td>
                      <td className="p-3">АР зданий и сооружений</td>
                      <td className="p-3">3.2</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.4</td>
                      <td className="p-3">Раздел 4. Конструктивные и объемно-планировочные решения ГТС</td>
                      <td className="p-3">W9-W14</td>
                      <td className="p-3">Конструкторский отдел ГТС</td>
                      <td className="p-3">КР камер шлюзов, затворов, водосливных трактов</td>
                      <td className="p-3">1.4, 1.5, 1.6, 2.3, 2.4</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.5</td>
                      <td className="p-3">Раздел 5. Инженерно-технические системы (ИОС)</td>
                      <td className="p-3">W11-W15</td>
                      <td className="p-3">Отделы ИТП</td>
                      <td className="p-3">Водоснабжение, канализация, электроснабжение, связь</td>
                      <td className="p-3">2.5, 2.6, 3.4</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.6</td>
                      <td className="p-3">Раздел 6. Проект организации строительства (ПОС)</td>
                      <td className="p-3">W13-W16</td>
                      <td className="p-3">Отдел технологии</td>
                      <td className="p-3">ПОС, стройгенплан, график работ</td>
                      <td className="p-3">3.4, 3.5</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.7</td>
                      <td className="p-3">Раздел 8. Перечень мероприятий по охране окружающей среды (ПМООС)</td>
                      <td className="p-3">W10-W14</td>
                      <td className="p-3">Экологический отдел</td>
                      <td className="p-3">ПМООС с программой экомониторинга</td>
                      <td className="p-3">2.2, 3.2</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.8</td>
                      <td className="p-3">Раздел 10. Мероприятия по обеспечению пожарной безопасности</td>
                      <td className="p-3">W12-W15</td>
                      <td className="p-3">Отдел ПБ</td>
                      <td className="p-3">Раздел ПБ</td>
                      <td className="p-3">3.3, 3.5</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.9</td>
                      <td className="p-3">Раздел 11. Смета на строительство</td>
                      <td className="p-3">W14-W16</td>
                      <td className="p-3">Сметный отдел</td>
                      <td className="p-3">Сводный сметный расчет</td>
                      <td className="p-3">3.4, 3.5, 3.6</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.10</td>
                      <td className="p-3">Раздел 11.1. Обоснование безопасности ГТС (ФЗ-117)</td>
                      <td className="p-3">W12-W16</td>
                      <td className="p-3">Отдел ГТС + эксперт</td>
                      <td className="p-3">Декларация безопасности ГТС</td>
                      <td className="p-3">3.4, 2.1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 bg-gradient-to-br from-white to-violet-50 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-violet-900 flex items-center gap-3">
                <Icon name="Shield" size={24} className="text-violet-600" />
                Этап 5: Проекты переустройства инженерных сетей
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-violet-100">
                    <tr>
                      <th className="p-3 text-left font-bold">№</th>
                      <th className="p-3 text-left font-bold">Мероприятие</th>
                      <th className="p-3 text-left font-bold">Срок (недели)</th>
                      <th className="p-3 text-left font-bold">Ответственный</th>
                      <th className="p-3 text-left font-bold">Результат</th>
                      <th className="p-3 text-left font-bold">Зависимости</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-violet-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.11</td>
                      <td className="p-3">Проект переустройства ЛЭП (по ТУ Россети)</td>
                      <td className="p-3">W10-W14</td>
                      <td className="p-3">Отдел электроснабжения</td>
                      <td className="p-3">Проект переустройства ЛЭП</td>
                      <td className="p-3">2.5, 3.2</td>
                    </tr>
                    <tr className="hover:bg-violet-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.12</td>
                      <td className="p-3">Проект переустройства газопровода (по ТУ Газпром)</td>
                      <td className="p-3">W11-W15</td>
                      <td className="p-3">Отдел газоснабжения</td>
                      <td className="p-3">Проект переустройства газопровода</td>
                      <td className="p-3">2.6, 3.2</td>
                    </tr>
                    <tr className="hover:bg-violet-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.13</td>
                      <td className="p-3">Согласование проекта переустройства с ПАО «Россети»</td>
                      <td className="p-3">W14-W16</td>
                      <td className="p-3">Россети / СППИ</td>
                      <td className="p-3">Согласованный проект ЛЭП</td>
                      <td className="p-3">3.11</td>
                    </tr>
                    <tr className="hover:bg-violet-50/50 transition-colors">
                      <td className="p-3 font-semibold">3.14</td>
                      <td className="p-3">Согласование проекта переустройства с ПАО «Газпром»</td>
                      <td className="p-3">W15-W17</td>
                      <td className="p-3">Газпром / СППИ</td>
                      <td className="p-3">Согласованный проект газопровода</td>
                      <td className="p-3">3.12</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* Phase 4: May-June */}
        <section id="phase4" className="min-h-screen py-20 px-4 bg-gradient-to-br from-emerald-50/50 to-blue-50/50">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-emerald-100 text-emerald-700 border-emerald-300 px-4 py-2">
              Май-Июнь 2026 (Недели 17-24)
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Государственная экспертиза
            </h2>

            <Card className="p-6 sm:p-8 mb-8 bg-gradient-to-br from-white to-emerald-50 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-emerald-900 flex items-center gap-3">
                <Icon name="FileCheck" size={24} className="text-emerald-600" />
                Этап 6: Прохождение экспертизы в ФАУ «Главгосэкспертиза России»
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-emerald-100">
                    <tr>
                      <th className="p-3 text-left font-bold">№</th>
                      <th className="p-3 text-left font-bold">Контрольная точка</th>
                      <th className="p-3 text-left font-bold">Срок (недели)</th>
                      <th className="p-3 text-left font-bold">Ответственный</th>
                      <th className="p-3 text-left font-bold">Результат</th>
                      <th className="p-3 text-left font-bold">Зависимости</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-emerald-50/50 transition-colors">
                      <td className="p-3 font-semibold">4.1</td>
                      <td className="p-3">Предварительное согласование с ФГБУ «Канал им. Москвы»</td>
                      <td className="p-3">W17-W18</td>
                      <td className="p-3">ГИП / ЮГДОРПРОЕКТ</td>
                      <td className="p-3">Письмо-согласование балансодержателя</td>
                      <td className="p-3">3.1-3.10</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/50 transition-colors">
                      <td className="p-3 font-semibold">4.2</td>
                      <td className="p-3">Предварительное согласование с Росводресурсами</td>
                      <td className="p-3">W17-W19</td>
                      <td className="p-3">Эколог / ЮГДОРПРОЕКТ</td>
                      <td className="p-3">Согласование раздела ПМООС</td>
                      <td className="p-3">3.7</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/50 transition-colors">
                      <td className="p-3 font-semibold">4.3</td>
                      <td className="p-3">Согласование декларации безопасности ГТС с Ростехнадзором</td>
                      <td className="p-3">W17-W20</td>
                      <td className="p-3">Отдел ГТС / ЮГДОРПРОЕКТ</td>
                      <td className="p-3">Заключение Ростехнадзора на декларацию</td>
                      <td className="p-3">3.10</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/50 transition-colors">
                      <td className="p-3 font-semibold">4.4</td>
                      <td className="p-3">Подготовка комплекта документов для экспертизы</td>
                      <td className="p-3">W19-W20</td>
                      <td className="p-3">ГИП</td>
                      <td className="p-3">Полный комплект ПД + все согласования</td>
                      <td className="p-3">4.1, 4.2, 4.3</td>
                    </tr>
                    <tr className="hover:bg-amber-50/70 transition-colors border-l-4 border-amber-400">
                      <td className="p-3 font-semibold">4.4A</td>
                      <td className="p-3 font-semibold">Привлечение и работа с организацией, аккредитованной на проведение НТС для ГТС I класса</td>
                      <td className="p-3">W19-W20</td>
                      <td className="p-3">ГИП / Организация НТС</td>
                      <td className="p-3">Заключение по НТС для ГТС I класса</td>
                      <td className="p-3">4.4 (параллельно)</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/50 transition-colors">
                      <td className="p-3 font-semibold">4.5</td>
                      <td className="p-3">Подача документов в ГГЭ</td>
                      <td className="p-3">W20</td>
                      <td className="p-3">ГИП / ЮГДОРПРОЕКТ</td>
                      <td className="p-3">Регистрация заявления в ГГЭ</td>
                      <td className="p-3">4.4, 4.4A</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/50 transition-colors">
                      <td className="p-3 font-semibold">4.6</td>
                      <td className="p-3">Рассмотрение документации в ГГЭ (45 раб. дней)</td>
                      <td className="p-3">W20-W29</td>
                      <td className="p-3">ФАУ ГГЭ России</td>
                      <td className="p-3">Замечания экспертизы (ожидаемо на W28)</td>
                      <td className="p-3">4.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-orange-500 shadow-xl">
              <div className="flex items-start gap-4">
                <Icon name="AlertTriangle" size={32} className="text-orange-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Критический путь: Управление рисками экспертизы</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Экспертиза ГГЭ — ключевой этап с наибольшими рисками задержек. Для гарантии сроков применяются:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Предварительные согласования со всеми стейкхолдерами до подачи в ГГЭ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Внутренняя проверка качества ПД (Technical Review) перед подачей</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Резерв 2 недели на устранение замечаний ГГЭ (итерация 1)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Оперативный штаб для ускоренного реагирования на замечания</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Phase 5: July-August */}
        <section id="phase5" className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-red-100 text-red-700 border-red-300 px-4 py-2">
              Июль-Август 2026 (Недели 25-32)
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Завершение и получение разрешения на строительство
            </h2>

            <Card className="p-6 sm:p-8 mb-8 bg-gradient-to-br from-white to-red-50 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-red-900 flex items-center gap-3">
                <Icon name="BadgeCheck" size={24} className="text-red-600" />
                Этап 7: Устранение замечаний и финализация
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-red-100">
                    <tr>
                      <th className="p-3 text-left font-bold">№</th>
                      <th className="p-3 text-left font-bold">Контрольная точка</th>
                      <th className="p-3 text-left font-bold">Срок (недели)</th>
                      <th className="p-3 text-left font-bold">Ответственный</th>
                      <th className="p-3 text-left font-bold">Результат</th>
                      <th className="p-3 text-left font-bold">Зависимости</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-red-50/50 transition-colors">
                      <td className="p-3 font-semibold">5.1</td>
                      <td className="p-3">Получение замечаний ГГЭ (итерация 1)</td>
                      <td className="p-3">W28</td>
                      <td className="p-3">ГИП</td>
                      <td className="p-3">Список замечаний экспертизы</td>
                      <td className="p-3">4.6</td>
                    </tr>
                    <tr className="hover:bg-red-50/50 transition-colors">
                      <td className="p-3 font-semibold">5.2</td>
                      <td className="p-3">Устранение замечаний всеми отделами</td>
                      <td className="p-3">W28-W30</td>
                      <td className="p-3">Все профильные отделы</td>
                      <td className="p-3">Исправленная ПД + пояснения</td>
                      <td className="p-3">5.1</td>
                    </tr>
                    <tr className="hover:bg-red-50/50 transition-colors">
                      <td className="p-3 font-semibold">5.3</td>
                      <td className="p-3">Повторная подача в ГГЭ</td>
                      <td className="p-3">W30</td>
                      <td className="p-3">ГИП / ЮГДОРПРОЕКТ</td>
                      <td className="p-3">Регистрация доработанной ПД</td>
                      <td className="p-3">5.2</td>
                    </tr>
                    <tr className="hover:bg-red-50/50 transition-colors">
                      <td className="p-3 font-semibold">5.4</td>
                      <td className="p-3">Получение положительного заключения ГГЭ</td>
                      <td className="p-3">W31-W32</td>
                      <td className="p-3">ФАУ ГГЭ России</td>
                      <td className="p-3">Положительное заключение экспертизы</td>
                      <td className="p-3">5.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 mb-8 bg-gradient-to-br from-white to-green-50 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-green-900 flex items-center gap-3">
                <Icon name="Trophy" size={24} className="text-green-600" />
                Этап 8: Разрешительная документация
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="p-3 text-left font-bold">№</th>
                      <th className="p-3 text-left font-bold">Мероприятие</th>
                      <th className="p-3 text-left font-bold">Срок (недели)</th>
                      <th className="p-3 text-left font-bold">Ответственный</th>
                      <th className="p-3 text-left font-bold">Результат</th>
                      <th className="p-3 text-left font-bold">Зависимости</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-green-50/50 transition-colors">
                      <td className="p-3 font-semibold">5.5</td>
                      <td className="p-3">Получение разрешения на переустройство ЛЭП от Россети</td>
                      <td className="p-3">W18-W28</td>
                      <td className="p-3">Россети / ЮГДОРПРОЕКТ</td>
                      <td className="p-3">Разрешение на реконструкцию ЛЭП</td>
                      <td className="p-3">3.13</td>
                    </tr>
                    <tr className="hover:bg-green-50/50 transition-colors">
                      <td className="p-3 font-semibold">5.6</td>
                      <td className="p-3">Получение разрешения на переустройство газопровода от Газпром</td>
                      <td className="p-3">W22-W30</td>
                      <td className="p-3">Газпром / ЮГДОРПРОЕКТ</td>
                      <td className="p-3">Разрешение на реконструкцию газопровода</td>
                      <td className="p-3">3.14</td>
                    </tr>
                    <tr className="hover:bg-green-50/50 transition-colors">
                      <td className="p-3 font-semibold">5.7</td>
                      <td className="p-3">Подача заявления на разрешение строительства</td>
                      <td className="p-3">W32</td>
                      <td className="p-3">ЮГДОРПРОЕКТ / ФКУ Ространсмодернизация</td>
                      <td className="p-3">Заявление в уполномоченный орган</td>
                      <td className="p-3">5.4, 5.5, 5.6</td>
                    </tr>
                    <tr className="hover:bg-green-50/50 transition-colors bg-green-100 font-bold">
                      <td className="p-3">5.8</td>
                      <td className="p-3">✅ Получение разрешения на строительство</td>
                      <td className="p-3">W32 (Август 2026)</td>
                      <td className="p-3">Уполномоченный орган</td>
                      <td className="p-3">🎉 РАЗРЕШЕНИЕ НА СТРОИТЕЛЬСТВО</td>
                      <td className="p-3">5.7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* Gantt Chart Section */}
        <section id="gantt" className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <Badge className="mb-6 bg-slate-100 text-slate-700 border-slate-300 px-4 py-2">
              Визуализация
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Интерактивный календарь работ
            </h2>
            <GanttChart />
          </div>
        </section>

        {/* Charts Section */}
        <section id="charts" className="min-h-screen py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-300 px-4 py-2">
              Аналитика
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Диаграммы распределения работ
            </h2>
            <InteractiveChart />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            {/* Download Button */}
            <div className="mb-8">
              <Button
                onClick={exportRoadmapToWord}
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 px-8 py-6 text-base sm:text-lg"
              >
                <Icon name="Download" size={24} className="mr-3" />
                Скачать дорожную карту (Word)
              </Button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-4">ООО «Санкт-Петербургский проектный институт»</h3>
            <p className="text-sm sm:text-base text-blue-200 mb-6">
              Экспертиза в проектировании гидротехнических сооружений с 2005 года
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 flex-wrap text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Award" size={18} className="text-blue-300 sm:w-5 sm:h-5" />
                <span>Лицензии СРО</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={18} className="text-blue-300 sm:w-5 sm:h-5" />
                <span>120+ специалистов</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Trophy" size={18} className="text-blue-300 sm:w-5 sm:h-5" />
                <span>500+ реализованных проектов</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Roadmap;