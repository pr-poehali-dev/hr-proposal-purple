import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import GanttChart from '@/components/GanttChart';
import InteractiveChart from '@/components/InteractiveChart';
import RevolutionarySolutions from '@/components/RevolutionarySolutions';

const Roadmap = () => {
  const [activePhase, setActivePhase] = useState<string>('phase1');

  const phases = [
    { id: 'phase1', label: 'Месяц 1 (Январь)', icon: 'Calendar' },
    { id: 'phase2', label: 'Месяц 2 (Февраль)', icon: 'Calendar' },
    { id: 'phase3', label: 'Месяцы 3-4 (Март-Апрель)', icon: 'Calendar' },
    { id: 'revolutionary', label: 'Революционные решения', icon: 'Lightbulb' },
    { id: 'phase4', label: 'Месяцы 5-6 (Май-Июнь)', icon: 'Calendar' },
    { id: 'phase5', label: 'Месяцы 7-8 (Июль-Август)', icon: 'Calendar' },
    { id: 'gantt', label: 'План-график', icon: 'BarChart3' },
    { id: 'charts', label: 'Диаграммы', icon: 'PieChart' },
  ];

  const scrollToPhase = (id: string) => {
    setActivePhase(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      {/* Ссылка на главную страницу */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => window.location.href = '/'}
          className="bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600 text-white shadow-xl"
        >
          <Icon name="Users" size={16} className="mr-2" />
          Подбор команды
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-screen w-20 bg-white/80 backdrop-blur-lg border-r border-blue-200 shadow-lg z-50 hidden lg:flex flex-col items-center py-8 gap-6 mt-20">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">
            <Icon name="Map" size={24} />
          </div>
        </div>
        <Separator className="w-12 bg-blue-200" />
        {phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() => scrollToPhase(phase.id)}
            className={`group relative flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activePhase === phase.id
                ? 'bg-blue-100 text-blue-700'
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

      <main className="lg:ml-20 pt-20">
        {/* Header Section */}
        <section className="min-h-[40vh] flex items-center justify-center relative overflow-hidden px-4 py-12">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-blue-600/10" />
          
          <div className="relative z-10 max-w-5xl text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-300 px-4 py-2 text-sm">
              Проектная документация
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-700 bg-clip-text text-transparent leading-tight">
              Дорожная карта
              <br />проектного института
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 font-light px-2">
              Канал №294, Гидроузлы №7 и №8
            </p>

            <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-xl border border-blue-200 mb-8">
              <Icon name="Building2" size={20} className="text-blue-600 flex-shrink-0" />
              <div className="text-left">
                <div className="text-xs sm:text-sm text-gray-600">Заказчик</div>
                <div className="text-sm sm:text-lg font-bold text-gray-900">ООО «ЮГДОРПРОЕКТ»</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="bg-white rounded-xl px-5 py-3 shadow-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">8</div>
                <div className="text-xs text-gray-600">месяцев</div>
              </div>
              <div className="bg-white rounded-xl px-5 py-3 shadow-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">18.4</div>
                <div className="text-xs text-gray-600">млн рублей</div>
              </div>
              <div className="bg-white rounded-xl px-5 py-3 shadow-lg border border-blue-200">
                <div className="text-sm font-bold text-blue-700">Август 2025</div>
                <div className="text-xs text-gray-600">завершение</div>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 1: Month 1 - Initial Analysis and Surveys */}
        <section id="phase1" className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-300 px-4 py-2">
              Месяц 1
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Подготовительный этап и инженерные изыскания
            </h2>

            <Card className="p-4 sm:p-8 mb-8 bg-gradient-to-br from-white to-blue-50 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-900 flex items-center gap-3">
                <Icon name="FileSearch" size={24} className="text-blue-600" />
                1.1 Анализ исходных данных
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="CheckCircle2" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Анализ технического задания</p>
                    <p className="text-sm text-gray-600">Изучение требований ГК № РТМ-018/25 и Задания на проектирование</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="CheckCircle2" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Изучение архивной документации</p>
                    <p className="text-sm text-gray-600">Анализ проектов, исполнительной документации, ранее выполненных обследований</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="CheckCircle2" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Анализ гидрогеологических условий</p>
                    <p className="text-sm text-gray-600">Оценка фильтрационных процессов, причин течей, состояния конструкций</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 mb-8 bg-gradient-to-br from-white to-cyan-50 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-900 flex items-center gap-3">
                <Icon name="Waves" size={24} className="text-cyan-600" />
                1.2 Водолазные обследования
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Droplet" size={20} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Подводное обследование шлюзов №7 и №8</p>
                    <p className="text-sm text-gray-600">Инструментальные измерения геометрии камер, затворов, порогов</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Droplet" size={20} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Выявление дефектов конструкций</p>
                    <p className="text-sm text-gray-600">Фиксация трещин, каверн, разрушений бетона, коррозии металла</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Droplet" size={20} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Обследование донных конструкций</p>
                    <p className="text-sm text-gray-600">Состояние основания, анкерных устройств, водоприемных галерей</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Droplet" size={20} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Фото- и видеофиксация</p>
                    <p className="text-sm text-gray-600">Документирование состояния подводной части ГТС</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 mb-8 bg-gradient-to-br from-white to-green-50 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-green-900 flex items-center gap-3">
                <Icon name="Compass" size={24} className="text-green-600" />
                1.3 Инженерно-геодезические изыскания
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Map" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Создание топографического плана М 1:500</p>
                    <p className="text-sm text-gray-600">Съемка территории гидроузлов, подходных участков</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Map" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Исполнительная съемка сооружений</p>
                    <p className="text-sm text-gray-600">Фиксация фактических габаритов и отметок конструкций</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Map" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Трассировка инженерных сетей</p>
                    <p className="text-sm text-gray-600">Определение расположения подземных коммуникаций</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 bg-gradient-to-br from-white to-orange-50 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-orange-900 flex items-center gap-3">
                <Icon name="Mountain" size={24} className="text-orange-600" />
                1.4 Инженерно-геологические изыскания
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Drill" size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Бурение инженерно-геологических скважин</p>
                    <p className="text-sm text-gray-600">Изучение геологического строения основания ГТС</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Drill" size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Отбор проб грунта и воды</p>
                    <p className="text-sm text-gray-600">Лабораторные испытания физико-механических свойств</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Drill" size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Гидрогеологические наблюдения</p>
                    <p className="text-sm text-gray-600">Определение уровней грунтовых вод, водопроницаемости пород</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Drill" size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Подготовка отчета по изысканиям</p>
                    <p className="text-sm text-gray-600">Формирование технического отчета с рекомендациями</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Phase 2: Month 2 - Documentation and Approvals Preparation */}
        <section id="phase2" className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 to-gray-50">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-slate-700 text-white px-4 py-2">
              Месяц 2
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Согласования и разрешительная документация
            </h2>

            <Card className="p-4 sm:p-8 mb-8 bg-white shadow-xl border-l-4 border-l-red-500">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-red-900 flex items-center gap-3">
                <Icon name="FileCheck" size={24} className="text-red-600" />
                2.1 Согласование с эксплуатирующей организацией
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <Icon name="Building" size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">ФГБУ «Канал имени Москвы»</p>
                    <p className="text-sm text-gray-600">Согласование технических решений, сроков производства работ</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <Icon name="Building" size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Технические условия на подключение</p>
                    <p className="text-sm text-gray-600">Получение ТУ на электроснабжение, водоснабжение, связь</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <Icon name="Building" size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">График навигации и ограничений</p>
                    <p className="text-sm text-gray-600">Определение периодов проведения работ без остановки судоходства</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 mb-8 bg-white shadow-xl border-l-4 border-l-purple-500">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-purple-900 flex items-center gap-3">
                <Icon name="ShieldCheck" size={24} className="text-purple-600" />
                2.2 Согласования с надзорными органами
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Icon name="AlertCircle" size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Ростехнадзор</p>
                    <p className="text-sm text-gray-600">Согласование проектных решений по безопасности ГТС (декларация безопасности)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Icon name="AlertCircle" size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Росводресурсы</p>
                    <p className="text-sm text-gray-600">Согласование водохозяйственных мероприятий, использования водных объектов</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Icon name="AlertCircle" size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">МЧС России</p>
                    <p className="text-sm text-gray-600">Согласование противопожарных мероприятий</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Icon name="AlertCircle" size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Роспотребнадзор</p>
                    <p className="text-sm text-gray-600">Санитарно-эпидемиологическое заключение</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 bg-white shadow-xl border-l-4 border-l-yellow-500">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-900 flex items-center gap-3">
                <Icon name="Network" size={24} className="text-yellow-600" />
                2.3 Согласование переустройства инженерных сетей
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Icon name="Zap" size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">ПАО «Россети»</p>
                    <p className="text-sm text-gray-600">Вынос/переустройство ЛЭП, кабельных линий, согласование с Минэнерго</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Icon name="Flame" size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">ПАО «Газпром»</p>
                    <p className="text-sm text-gray-600">Вынос/переустройство газопроводов</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Icon name="Droplets" size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Мосводоканал</p>
                    <p className="text-sm text-gray-600">Согласование переустройства водопровода и канализации</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Icon name="Wifi" size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Операторы связи</p>
                    <p className="text-sm text-gray-600">МГТС, МТС, Билайн — переустройство кабельных линий связи</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Icon name="ThermometerSun" size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">ПАО «МОЭК»</p>
                    <p className="text-sm text-gray-600">Вынос/переустройство тепловых сетей</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Phase 3: Months 3-4 - Project Design */}
        <section id="phase3" className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-indigo-100 text-indigo-700 border-indigo-300 px-4 py-2">
              Месяцы 3-4
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Разработка проектной документации
            </h2>

            <Card className="p-4 sm:p-8 mb-8 bg-gradient-to-br from-indigo-50 to-violet-50 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-indigo-900">
                Состав разделов проектной документации (ПП РФ №87)
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-l-indigo-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 1. Пояснительная записка</h4>
                      <p className="text-sm text-gray-600 mb-2">Исходные данные, цели и задачи реконструкции, обоснование решений</p>
                      <Badge variant="outline" className="bg-green-100 text-green-700 text-xs">Согласование: ФКУ «Ространсмодернизация»</Badge>
                    </div>
                    <Icon name="FileText" size={24} className="text-indigo-600 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-l-blue-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 2. Схема планировочной организации земельного участка</h4>
                      <p className="text-sm text-gray-600 mb-2">Генплан, благоустройство, организация рельефа, дорожная сеть</p>
                      <Badge variant="outline" className="bg-red-100 text-red-700 text-xs">Согласование: Департамент архитектуры г. Москвы</Badge>
                    </div>
                    <Icon name="MapPin" size={24} className="text-blue-600 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-l-cyan-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 3. Архитектурные решения</h4>
                      <p className="text-sm text-gray-600 mb-2">Архитектурный облик надводной части ГТС, служебных зданий</p>
                      <Badge variant="outline" className="bg-red-100 text-red-700 text-xs">Согласование: Москомархитектура</Badge>
                    </div>
                    <Icon name="Building2" size={24} className="text-cyan-600 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-l-violet-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 4. Конструктивные и объемно-планировочные решения</h4>
                      <p className="text-sm text-gray-600 mb-2">Расчеты конструкций камер шлюзов, пал, затворов, систем наполнения/опорожнения</p>
                      <Badge variant="outline" className="bg-orange-100 text-orange-700 text-xs">Согласование: Ростехнадзор (декларация безопасности ГТС)</Badge>
                    </div>
                    <Icon name="Box" size={24} className="text-violet-600 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-l-green-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 5. Сведения об инженерном оборудовании</h4>
                      <p className="text-sm text-gray-600 mb-2">5.1 Водоснабжение и канализация<br/>5.2 Электроснабжение<br/>5.3 Системы автоматизации<br/>5.4 Связь и сигнализация</p>
                      <Badge variant="outline" className="bg-purple-100 text-purple-700 text-xs">Согласование: ПАО «Россети», ФГБУ «Канал им. Москвы»</Badge>
                    </div>
                    <Icon name="Settings" size={24} className="text-green-600 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-l-rose-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 6. Проект организации строительства (ПОС)</h4>
                      <p className="text-sm text-gray-600 mb-2">Календарный план, организация стройплощадки, схемы движения техники, ограничения навигации</p>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 text-xs">Согласование: ФГБУ «Канал им. Москвы», ГАТИ</Badge>
                    </div>
                    <Icon name="CalendarClock" size={24} className="text-rose-600 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-l-amber-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 7. Проект организации работ по сносу/демонтажу</h4>
                      <p className="text-sm text-gray-600 mb-2">Демонтаж старых конструкций, утилизация материалов</p>
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs">Согласование: Росприроднадзор</Badge>
                    </div>
                    <Icon name="Trash2" size={24} className="text-amber-600 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-l-emerald-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 8. Перечень мероприятий по охране окружающей среды</h4>
                      <p className="text-sm text-gray-600 mb-2">Оценка воздействия на окружающую среду (ОВОС), компенсационные мероприятия</p>
                      <Badge variant="outline" className="bg-green-100 text-green-700 text-xs">Согласование: Росприроднадзор, Мосприрода</Badge>
                    </div>
                    <Icon name="TreePine" size={24} className="text-emerald-600 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-l-red-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 9. Мероприятия по обеспечению пожарной безопасности</h4>
                      <p className="text-sm text-gray-600 mb-2">Противопожарные системы, эвакуационные пути</p>
                      <Badge variant="outline" className="bg-red-100 text-red-700 text-xs">Согласование: МЧС России</Badge>
                    </div>
                    <Icon name="Flame" size={24} className="text-red-600 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-l-sky-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 10. Мероприятия по обеспечению доступа инвалидов</h4>
                      <p className="text-sm text-gray-600 mb-2">Пандусы, специализированное оборудование</p>
                      <Badge variant="outline" className="bg-sky-100 text-sky-700 text-xs">Согласование: Департамент труда и соцзащиты</Badge>
                    </div>
                    <Icon name="Accessibility" size={24} className="text-sky-600 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-l-purple-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 11. Смета на строительство</h4>
                      <p className="text-sm text-gray-600 mb-2">Локальные и объектные сметы, сводный сметный расчет</p>
                      <Badge variant="outline" className="bg-indigo-100 text-indigo-700 text-xs">Согласование: ФКУ «Ространсмодернизация»</Badge>
                    </div>
                    <Icon name="Calculator" size={24} className="text-purple-600 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-l-teal-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Раздел 12. Мероприятия по обеспечению транспортной безопасности</h4>
                      <p className="text-sm text-gray-600 mb-2">Системы видеонаблюдения, СКУД, ограждение (Приложение №1 к ТЗ)</p>
                      <Badge variant="outline" className="bg-teal-100 text-teal-700 text-xs">Согласование: Росморречфлот, ФСБ России</Badge>
                    </div>
                    <Icon name="ShieldCheck" size={24} className="text-teal-600 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 bg-gradient-to-r from-orange-50 to-red-50 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-orange-900 flex items-center gap-3">
                <Icon name="AlertTriangle" size={24} className="text-orange-600" />
                Критические процедуры этапа
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="FileWarning" size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Декларация безопасности ГТС</p>
                    <p className="text-sm text-gray-600">Разработка, регистрация в Ростехнадзоре (обязательно до начала экспертизы)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="FileWarning" size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Документация по планировке территории (ДПТ)</p>
                    <p className="text-sm text-gray-600">Проект планировки и межевания, утверждение Правительством Москвы</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="FileWarning" size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">ОВОС (оценка воздействия на окружающую среду)</p>
                    <p className="text-sm text-gray-600">Общественные слушания, экологическая экспертиза</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Phase 4: Months 5-6 - State Expertise */}
        <section id="phase4" className="min-h-screen py-20 px-4 bg-gradient-to-br from-violet-50 to-purple-50">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-violet-100 text-violet-700 border-violet-300 px-4 py-2">
              Месяцы 5-6
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Государственная экспертиза и корректировка
            </h2>

            <Card className="p-4 sm:p-8 mb-8 bg-white shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-violet-900 flex items-center gap-3">
                <Icon name="BadgeCheck" size={24} className="text-violet-600" />
                4.1 Подача документации в экспертизу
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-violet-50 rounded-lg">
                  <Icon name="Building2" size={20} className="text-violet-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">ФАУ «Главгосэкспертиза России»</p>
                    <p className="text-sm text-gray-600">Подача проектной документации и результатов инженерных изысканий</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-violet-50 rounded-lg">
                  <Icon name="FolderCheck" size={20} className="text-violet-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Комплектность документации</p>
                    <p className="text-sm text-gray-600">Проверка наличия всех 12 разделов ПД, положительных заключений согласующих органов</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-violet-50 rounded-lg">
                  <Icon name="FileDigit" size={20} className="text-violet-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Электронная форма подачи</p>
                    <p className="text-sm text-gray-600">Загрузка томов в формате PDF с ЭЦП через портал Главгосэкспертизы</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 mb-8 bg-white shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-purple-900 flex items-center gap-3">
                <Icon name="MessageSquareText" size={24} className="text-purple-600" />
                4.2 Рассмотрение и замечания экспертизы
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Icon name="Clock" size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Срок рассмотрения — до 60 дней</p>
                    <p className="text-sm text-gray-600">Для особо сложных объектов (ГТС) может быть продлен</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Icon name="MessageCircle" size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Получение замечаний экспертов</p>
                    <p className="text-sm text-gray-600">Анализ требований по разделам: конструктивные решения, ГТС, инженерные сети</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Icon name="Wrench" size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Корректировка проектной документации</p>
                    <p className="text-sm text-gray-600">Устранение замечаний, пересчет конструкций, уточнение решений</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Icon name="FileEdit" size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Подготовка ответов на замечания</p>
                    <p className="text-sm text-gray-600">Формирование таблицы ответов, обоснование принятых решений</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-green-900 flex items-center gap-3">
                <Icon name="CheckCircle2" size={24} className="text-green-600" />
                4.3 Получение положительного заключения
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Award" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Повторная подача скорректированной ПД</p>
                    <p className="text-sm text-gray-600">Загрузка исправленных разделов с ответами на замечания</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Award" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Выдача заключения с ЭЦП</p>
                    <p className="text-sm text-gray-600">Криптоконтейнер с электронной подписью Главгосэкспертизы</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <Icon name="Award" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Регистрация в реестре</p>
                    <p className="text-sm text-gray-600">Внесение заключения в федеральный реестр</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Phase 5: Months 7-14 - Permitting */}
        <section id="phase5" className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-emerald-100 text-emerald-700 border-emerald-300 px-4 py-2">
              Месяцы 7-8 (Июль-Август)
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Завершение проектирования и сдача документации
            </h2>

            <Card className="p-4 sm:p-8 mb-8 bg-white shadow-xl border-l-4 border-l-blue-500">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-900 flex items-center gap-3">
                <Icon name="ScrollText" size={24} className="text-blue-600" />
                5.1 Подготовка документов для разрешения на строительство
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Icon name="FileCheck2" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Договор на проектные работы</p>
                    <p className="text-sm text-gray-600">В электронном виде (PDF)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Icon name="FileCheck2" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Положительное заключение экспертизы</p>
                    <p className="text-sm text-gray-600">PDF + криптоконтейнер с ЭЦП</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Icon name="FileCheck2" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Утвержденная документация по планировке территории</p>
                    <p className="text-sm text-gray-600">Постановление Правительства Москвы</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Icon name="FileCheck2" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Реестр земельных участков</p>
                    <p className="text-sm text-gray-600">Кадастровые номера, адреса (отдельно по этапам при необходимости)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Icon name="FileCheck2" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Тома проектной документации с подписями</p>
                    <p className="text-sm text-gray-600">Все 12 разделов в PDF</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 mb-8 bg-white shadow-xl border-l-4 border-l-amber-500">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-amber-900 flex items-center gap-3">
                <Icon name="Zap" size={24} className="text-amber-600" />
                5.2 Разрешения на переустройство инженерных коммуникаций
              </h3>
              <div className="space-y-3">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">ПАО «Россети» (электросети)</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Проект переустройства ЛЭП</li>
                    <li>• Согласование с Минэнерго (при необходимости)</li>
                    <li>• Получение разрешения на реконструкцию электросетей</li>
                    <li>• Выделение границ зон планируемого размещения в ДПТ</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">ПАО «Газпром» (газопроводы)</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Проект переустройства газопроводов</li>
                    <li>• Экспертиза проектной документации</li>
                    <li>• Получение разрешения на реконструкцию</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Прочие балансодержатели</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Мосводоканал: водопровод и канализация</li>
                    <li>• ПАО «МОЭК»: тепловые сети</li>
                    <li>• Операторы связи: МГТС, МТС, Билайн и др.</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 mb-8 bg-white shadow-xl border-l-4 border-l-green-500">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-green-900 flex items-center gap-3">
                <Icon name="ClipboardCheck" size={24} className="text-green-600" />
                5.3 Подача заявления на разрешение строительства
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Icon name="Building" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Уполномоченный орган</p>
                    <p className="text-sm text-gray-600">Мосгосстройнадзор или Москомархитектура (в зависимости от объекта)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Icon name="FileUp" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Подача через РГИС</p>
                    <p className="text-sm text-gray-600">Региональная государственная информационная система в сфере строительства</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Icon name="Clock3" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Срок рассмотрения — 5 рабочих дней</p>
                    <p className="text-sm text-gray-600">При наличии полного комплекта документов</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl">
              <div className="text-center">
                <Icon name="Rocket" size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Завершение проектной стадии</h3>
                <p className="text-lg mb-6">
                  После получения разрешения на строительство проект готов к передаче Заказчику для выхода на тендер по выбору генподрядчика
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                    <div className="text-sm opacity-90">Срок выполнения</div>
                    <div className="text-2xl font-bold">14 месяцев</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                    <div className="text-sm opacity-90">Стоимость</div>
                    <div className="text-2xl font-bold">18.4 млн ₽</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Summary Timeline */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-center">
              Сводный график работ
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-32 sm:w-40">
                  <Badge className="bg-blue-500 text-white">Месяц 1</Badge>
                </div>
                <div className="flex-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-bold mb-2">Изыскания и анализ</h4>
                    <p className="text-sm opacity-90">Геодезия, геология, водолазные работы, анализ исходных данных</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-32 sm:w-40">
                  <Badge className="bg-purple-500 text-white">Месяц 2</Badge>
                </div>
                <div className="flex-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-bold mb-2">Согласования</h4>
                    <p className="text-sm opacity-90">Эксплуатирующая организация, надзорные органы, балансодержатели сетей</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-32 sm:w-40">
                  <Badge className="bg-indigo-500 text-white">Месяцы 3-4</Badge>
                </div>
                <div className="flex-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-bold mb-2">Проектирование</h4>
                    <p className="text-sm opacity-90">Разработка всех 12 разделов ПД, декларация безопасности ГТС, ОВОС, ДПТ</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-32 sm:w-40">
                  <Badge className="bg-violet-500 text-white">Месяцы 5-6</Badge>
                </div>
                <div className="flex-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-bold mb-2">Экспертиза</h4>
                    <p className="text-sm opacity-90">Главгосэкспертиза, устранение замечаний, получение положительного заключения</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-32 sm:w-40">
                  <Badge className="bg-emerald-500 text-white">Месяцы 7-8</Badge>
                </div>
                <div className="flex-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-bold mb-2">Финализация и сдача</h4>
                    <p className="text-sm opacity-90">Подготовка полного комплекта документации, сдача заказчику (Август 2025)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Свяжитесь с нами
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Готовы обсудить детали проекта и приступить к работе
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl">
              <Icon name="Mail" size={20} className="mr-2" />
              Отправить запрос
            </Button>
          </div>
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-blue-200 shadow-lg z-50 px-2 py-2 pb-safe">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          {phases.slice(0, 5).map((phase) => (
            <button
              key={phase.id}
              onClick={() => scrollToPhase(phase.id)}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-all min-w-0 ${
                activePhase === phase.id
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-500'
              }`}
            >
              <Icon name={phase.icon} size={18} />
              <span className="text-[10px] whitespace-nowrap">{phase.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Roadmap;