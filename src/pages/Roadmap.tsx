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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 relative overflow-hidden">
      {/* Animated 3D Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${scrollY * 0.1}px, ${scrollY * 0.15}px, 0) scale(${1 + scrollY * 0.0001})`,
            top: '10%',
            left: '5%',
          }}
        />
        <div 
          className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-cyan-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${-scrollY * 0.12}px, ${scrollY * 0.1}px, 0) scale(${1 + scrollY * 0.0001})`,
            top: '40%',
            right: '10%',
          }}
        />
        <div 
          className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${scrollY * 0.08}px, ${-scrollY * 0.1}px, 0) scale(${1 + scrollY * 0.0001})`,
            bottom: '20%',
            left: '15%',
          }}
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-24 right-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-blue-200"
      >
        <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} className="text-blue-600" />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-40 right-4 z-50 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-200 p-4 max-h-[70vh] overflow-y-auto">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => scrollToPhase(phase.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all mb-2 ${
                activePhase === phase.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-blue-50'
              }`}
            >
              <Icon name={phase.icon} size={20} />
              <span className="font-medium">{phase.label}</span>
            </button>
          ))}
        </div>
      )}

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
            <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-700 border-blue-300 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm animate-pulse">
              Проектная документация ПП РФ №87
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-700 via-cyan-600 to-purple-700 bg-clip-text text-transparent leading-tight px-2">
              Дорожная карта проекта
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-4 sm:mb-6 font-light px-2">
              Реконструкция Гидроузлов №7 и №8<br />Канала имени Москвы (канал №294)<br />
              <span className="text-sm sm:text-base text-gray-600">Январь — Август 2026</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-3 sm:px-6 sm:py-4 shadow-2xl border border-blue-200 hover:shadow-blue-300/50 transition-all transform hover:scale-105">
                <Icon name="FileText" size={20} className="text-blue-600 sm:w-6 sm:h-6" />
                <div className="text-left">
                  <div className="text-xs text-gray-600">Исполнитель</div>
                  <div className="text-base sm:text-lg font-bold text-gray-900">ООО «СППИ»</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-3 sm:px-6 sm:py-4 shadow-2xl border border-blue-200 hover:shadow-blue-300/50 transition-all transform hover:scale-105">
                <Icon name="Building2" size={20} className="text-blue-600 sm:w-6 sm:h-6" />
                <div className="text-left">
                  <div className="text-xs text-gray-600">Заказчик</div>
                  <div className="text-base sm:text-lg font-bold text-gray-900">ООО «ЮГДОРПРОЕКТ»</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-2xl border border-blue-200 hover:shadow-blue-300/50 transition-all transform hover:scale-110 hover:-rotate-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-700">32</div>
                <div className="text-xs sm:text-sm text-gray-600">недели</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-2xl border border-blue-200 hover:shadow-blue-300/50 transition-all transform hover:scale-110 hover:rotate-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-700">8</div>
                <div className="text-xs sm:text-sm text-gray-600">месяцев</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-2xl border border-blue-200 hover:shadow-blue-300/50 transition-all transform hover:scale-110 hover:-rotate-2">
                <div className="text-base sm:text-xl font-bold text-blue-700">Август 2026</div>
                <div className="text-xs sm:text-sm text-gray-600">завершение</div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="min-h-screen py-12 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-700 border-blue-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Обзор проекта
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              Стратегическое управление проектом ГТС
            </h2>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-white to-blue-50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:-rotate-1">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-900 flex items-center gap-2 sm:gap-3">
                  <Icon name="Target" size={20} className="text-blue-600 sm:w-6 sm:h-6" />
                  Цель проекта
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Разработка полного комплекта проектной документации для реконструкции гидроузлов №7 и №8 канала №294 с получением положительного заключения государственной экспертизы
                </p>
              </Card>

              <Card className="p-4 sm:p-6 bg-gradient-to-br from-white to-cyan-50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:rotate-1">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-cyan-900 flex items-center gap-2 sm:gap-3">
                  <Icon name="Rocket" size={20} className="text-cyan-600 sm:w-6 sm:h-6" />
                  Уникальность проекта
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Первая комплексная реконструкция крупных гидротехнических сооружений Канала им. Москвы за последние 40 лет с применением современных технологий BIM и цифрового моделирования
                </p>
              </Card>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card className="p-3 sm:p-4 text-center bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-110 hover:-rotate-3">
                <div className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1">2</div>
                <div className="text-xs sm:text-sm text-gray-600">гидроузла</div>
              </Card>

              <Card className="p-3 sm:p-4 text-center bg-gradient-to-br from-cyan-50 to-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-110 hover:rotate-3">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-700 mb-1">15</div>
                <div className="text-xs sm:text-sm text-gray-600">разделов ПД</div>
              </Card>

              <Card className="p-3 sm:p-4 text-center bg-gradient-to-br from-purple-50 to-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-110 hover:-rotate-3">
                <div className="text-2xl sm:text-3xl font-bold text-purple-700 mb-1">350+</div>
                <div className="text-xs sm:text-sm text-gray-600">чертежей</div>
              </Card>

              <Card className="p-3 sm:p-4 text-center bg-gradient-to-br from-orange-50 to-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-110 hover:rotate-3">
                <div className="text-2xl sm:text-3xl font-bold text-orange-700 mb-1">4 500+</div>
                <div className="text-xs sm:text-sm text-gray-600">страниц</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Stakeholders Section */}
        <section id="stakeholders" className="min-h-screen py-12 sm:py-20 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-purple-100 text-purple-700 border-purple-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Стейкхолдеры
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              Ключевые участники проекта
            </h2>
            
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
              Проект объединяет ведущих экспертов в области гидротехники, проектирования и эксплуатации водных путей
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-900 flex items-center gap-2 sm:gap-3">
                  <Icon name="Briefcase" size={24} className="text-blue-600" />
                  ООО «Санкт-Петербургский проектный институт»
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Роль и ответственность</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Разработка проектной документации</li>
                      <li>Координация всех разделов проекта</li>
                      <li>Техническое сопровождение экспертизы</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Ключевые ожидания</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Соблюдение сроков разработки</li>
                      <li>Качество технических решений</li>
                      <li>Прохождение экспертизы с первого раза</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Риски для стейкхолдера</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Репутационные риски при срыве сроков</li>
                      <li>Финансовые потери при отрицательном заключении экспертизы</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-gradient-to-br from-cyan-50 to-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-cyan-900 flex items-center gap-2 sm:gap-3">
                  <Icon name="Building" size={24} className="text-cyan-600" />
                  ООО «ЮГДОРПРОЕКТ»
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Роль и ответственность</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Заказчик проектной документации</li>
                      <li>Финансирование работ</li>
                      <li>Контроль исполнения контракта</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Ключевые ожидания</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Получение полного комплекта ПД в срок</li>
                      <li>Положительное заключение экспертизы</li>
                      <li>Оптимальная стоимость строительства</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Риски для стейкхолдера</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Срыв сроков реализации федеральной программы</li>
                      <li>Неосвоение бюджетных средств</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-green-900 flex items-center gap-2 sm:gap-3">
                  <Icon name="Waves" size={24} className="text-green-600" />
                  ФГБУ «Канал имени Москвы»
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Роль и ответственность</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Эксплуатирующая организация</li>
                      <li>Предоставление исходных данных</li>
                      <li>Техническое согласование решений</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Ключевые ожидания</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Минимизация простоев навигации</li>
                      <li>Современные решения для эксплуатации</li>
                      <li>Снижение затрат на обслуживание</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Риски для стейкхолдера</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Увеличение эксплуатационных расходов</li>
                      <li>Сложность обслуживания новых систем</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-orange-900 flex items-center gap-2 sm:gap-3">
                  <Icon name="Shield" size={24} className="text-orange-600" />
                  Государственная экспертиза
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Роль и ответственность</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Проверка соответствия нормам</li>
                      <li>Оценка безопасности решений</li>
                      <li>Выдача заключения экспертизы</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Ключевые ожидания</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Полнота и качество документации</li>
                      <li>Обоснованность технических решений</li>
                      <li>Соответствие всем требованиям законодательства</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Риски для стейкхолдера</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                      <li>Репутационные риски при выявлении недостатков</li>
                      <li>Давление по срокам со стороны заказчика</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive 3D Chart Section */}
        <section id="interactive" className="min-h-screen py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              3D Визуализация
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              Интерактивная диаграмма проекта
            </h2>
            <Card className="p-0 overflow-hidden shadow-2xl">
              <Interactive3DChart />
            </Card>
          </div>
        </section>

        {/* Phase 1: January */}
        <section id="phase1" className="min-h-screen py-12 sm:py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Фаза 1
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              Январь 2026: Подготовительный этап
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-900 flex items-center gap-2">
                  <Icon name="ClipboardList" size={20} className="text-blue-600" />
                  Организационные мероприятия
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Формирование проектной команды (120+ специалистов)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Разработка календарного плана-графика</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Получение исходно-разрешительной документации</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-700">4</div>
                  <div className="text-xs sm:text-sm text-gray-600">недели</div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-cyan-900 flex items-center gap-2">
                  <Icon name="FileSearch" size={20} className="text-cyan-600" />
                  Изыскательские работы
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Геодезические изыскания с БПЛА</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Инженерно-геологические исследования</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Обследование существующих конструкций</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-cyan-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-700">15+</div>
                  <div className="text-xs sm:text-sm text-gray-600">скважин</div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 md:col-span-2">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-purple-900 flex items-center gap-2">
                  <Icon name="Database" size={20} className="text-purple-600" />
                  Сбор исходных данных
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Архивные материалы</div>
                    <div className="text-xs sm:text-sm text-gray-600">Чертежи 1937 года</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Эксплуатационные данные</div>
                    <div className="text-xs sm:text-sm text-gray-600">20 лет наблюдений</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Климатические данные</div>
                    <div className="text-xs sm:text-sm text-gray-600">Метеорология, гидрология</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-700">500+</div>
                  <div className="text-xs sm:text-sm text-gray-600">документов</div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Phase 2: February */}
        <section id="phase2" className="min-h-screen py-12 sm:py-20 px-4 bg-gradient-to-br from-cyan-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-cyan-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Фаза 2
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              Февраль 2026: Концептуальное проектирование
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-cyan-900 flex items-center gap-2">
                  <Icon name="Lightbulb" size={20} className="text-cyan-600" />
                  Разработка вариантов
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Варианты реконструкции камер шлюзов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Системы опорожнения и наполнения</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Гидравлическое моделирование</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-cyan-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-700">5</div>
                  <div className="text-xs sm:text-sm text-gray-600">вариантов решений</div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-900 flex items-center gap-2">
                  <Icon name="Calculator" size={20} className="text-blue-600" />
                  Технико-экономическое обоснование
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Сравнительный анализ вариантов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Предварительные сметы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Выбор оптимального решения</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-700">100+</div>
                  <div className="text-xs sm:text-sm text-gray-600">критериев оценки</div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 md:col-span-2">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-purple-900 flex items-center gap-2">
                  <Icon name="Users" size={20} className="text-purple-600" />
                  Согласование с заказчиком
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3">
                  Презентация концепции заказчику и эксплуатирующей организации для получения принципиального одобрения решений
                </p>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-700">3</div>
                  <div className="text-xs sm:text-sm text-gray-600">раунда согласований</div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Phase 3: March-April */}
        <section id="phase3" className="min-h-screen py-12 sm:py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-purple-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Фаза 3
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              Март-Апрель 2026: Основное проектирование
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-purple-900 flex items-center gap-2">
                  <Icon name="Layers" size={20} className="text-purple-600" />
                  Архитектурно-строительный раздел
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Детальные чертежи конструкций</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Армирование и спецификации</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Узлы и детали</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-700">150+</div>
                  <div className="text-xs sm:text-sm text-gray-600">чертежей АС</div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-pink-900 flex items-center gap-2">
                  <Icon name="Zap" size={20} className="text-pink-600" />
                  Электротехнический раздел
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Системы электроснабжения</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Автоматизация управления затворами</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Освещение и сигнализация</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-pink-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-pink-700">80+</div>
                  <div className="text-xs sm:text-sm text-gray-600">схем ЭМ</div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 md:col-span-2">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-900 flex items-center gap-2">
                  <Icon name="Droplet" size={20} className="text-blue-600" />
                  Инженерные системы
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Водоснабжение</div>
                    <div className="text-xs sm:text-sm text-gray-600">Питьевое и техническое</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Водоотведение</div>
                    <div className="text-xs sm:text-sm text-gray-600">Бытовое и производственное</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Дренаж</div>
                    <div className="text-xs sm:text-sm text-gray-600">Понижение УГВ</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Отопление и вентиляция</div>
                    <div className="text-xs sm:text-sm text-gray-600">Служебных помещений</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-700">120+</div>
                  <div className="text-xs sm:text-sm text-gray-600">чертежей ВК</div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Phase 4: May-June */}
        <section id="phase4" className="min-h-screen py-12 sm:py-20 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Фаза 4
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              Май-Июнь 2026: Завершение разработки ПД
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-orange-900 flex items-center gap-2">
                  <Icon name="FileText" size={20} className="text-orange-600" />
                  Пояснительная записка
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Обоснование принятых решений</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Расчёты и моделирование</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Нормативное обоснование</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-700">800+</div>
                  <div className="text-xs sm:text-sm text-gray-600">страниц текста</div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-amber-900 flex items-center gap-2">
                  <Icon name="DollarSign" size={20} className="text-amber-600" />
                  Сметная документация
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Локальные сметные расчёты</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Объектные и сводные сметы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Индексация цен</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-700">250+</div>
                  <div className="text-xs sm:text-sm text-gray-600">позиций смет</div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 md:col-span-2">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-900 flex items-center gap-2">
                  <Icon name="Shield" size={20} className="text-red-600" />
                  Специальные разделы
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Охрана окружающей среды</div>
                    <div className="text-xs sm:text-sm text-gray-600">ООС, ПМООС</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Пожарная безопасность</div>
                    <div className="text-xs sm:text-sm text-gray-600">Раздел ПБ</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">ИТМ ГО и ЧС</div>
                    <div className="text-xs sm:text-sm text-gray-600">Гражданская оборона</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Организация строительства</div>
                    <div className="text-xs sm:text-sm text-gray-600">ПОС, календарный план</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-red-700">15</div>
                  <div className="text-xs sm:text-sm text-gray-600">разделов ПД</div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Phase 5: July-August */}
        <section id="phase5" className="min-h-screen py-12 sm:py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Фаза 5
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              Июль-Август 2026: Экспертиза и утверждение
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-green-900 flex items-center gap-2">
                  <Icon name="CheckCircle2" size={20} className="text-green-600" />
                  Внутренняя проверка
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Нормоконтроль всех разделов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Проверка комплектности</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Устранение замечаний</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-green-700">3</div>
                  <div className="text-xs sm:text-sm text-gray-600">уровня контроля</div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-emerald-900 flex items-center gap-2">
                  <Icon name="Send" size={20} className="text-emerald-600" />
                  Подача на экспертизу
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Формирование комплекта документов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Загрузка в ЕГРЗ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Ответы на вопросы экспертов</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-700">45</div>
                  <div className="text-xs sm:text-sm text-gray-600">дней экспертизы</div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 md:col-span-2">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-teal-900 flex items-center gap-2">
                  <Icon name="Award" size={20} className="text-teal-600" />
                  Положительное заключение
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3">
                  Получение положительного заключения государственной экспертизы — финальный этап разработки проектной документации. После этого документация готова для начала строительно-монтажных работ.
                </p>
                <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-teal-700">100%</div>
                  <div className="text-xs sm:text-sm text-gray-600">готовность к реализации</div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Gantt Chart Section */}
        <section id="gantt" className="min-h-screen py-12 sm:py-20 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-700 border-blue-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Календарный план
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              Временной график проекта
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
              Интерактивная диаграмма Гантта для управления сроками выполнения разделов проектной документации
            </p>
            <Card className="p-0 overflow-x-auto shadow-2xl">
              <GanttChart />
            </Card>
          </div>
        </section>

        {/* Charts Section */}
        <section id="charts" className="min-h-screen py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-700 border-blue-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Аналитика
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              Диаграммы распределения работ
            </h2>
            <InteractiveChart />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 px-4 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-6 sm:mb-8">
              <Button
                onClick={exportRoadmapToWord}
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <Icon name="Download" size={20} className="mr-2" />
                Скачать дорожную карту (Word)
              </Button>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">ООО «Санкт-Петербургский проектный институт»</h3>
            <p className="text-sm sm:text-base text-blue-200 mb-4 sm:mb-6">
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