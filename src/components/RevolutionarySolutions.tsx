import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Solution {
  id: string;
  title: string;
  description: string;
  problem: string;
  benefit: string;
  savings: string;
  technology: string[];
  icon: string;
  color: string;
  implementation: string[];
}

const RevolutionarySolutions = () => {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const solutions: Solution[] = [
    {
      id: 'R1',
      title: 'BIM-модель цифрового двойника ГТС',
      description: 'Создание полной 3D BIM-модели гидроузлов №7 и №8 с интеграцией всех инженерных систем, историческими данными и прогнозной аналитикой',
      problem: 'Традиционная 2D документация не позволяет оценить взаимное влияние конструкций, затрудняет координацию разделов проекта и не даёт возможности прогнозировать поведение сооружения',
      benefit: 'Снижение ошибок проектирования на 70%, сокращение сроков согласования на 30%, возможность виртуальных обходов для заказчика и экспертов',
      savings: 'Экономия 2.5 млн ₽ за счёт предотвращения коллизий и переделок',
      technology: ['Autodesk Revit', 'Tekla Structures', 'BIM 360', 'Reality Capture', 'Navisworks'],
      icon: 'Box',
      color: 'from-blue-600 to-cyan-500',
      implementation: [
        'Лазерное сканирование существующих конструкций',
        'Создание информационной модели "as-built"',
        'Разработка проектной модели с уровнями детализации LOD 300-400',
        'Интеграция данных мониторинга напряжений, деформаций, фильтрации',
        'Настройка цифрового двойника для эксплуатационной стадии',
        'Обучение персонала ФГБУ "Канал им. Москвы"',
      ],
    },
    {
      id: 'R2',
      title: 'Автоматизированная система управления затворами (IoT + AI)',
      description: 'Замена устаревших гидравлических приводов на интеллектуальную систему с прогнозированием режимов работы на основе данных о трафике судов, уровнях воды и погоде',
      problem: 'Существующие затворы управляются вручную, нет данных о фактических нагрузках, износе механизмов, нет прогнозирования отказов. Простои из-за поломок блокируют навигацию на 3-7 дней',
      benefit: 'Сокращение простоев на 85%, снижение энергопотребления на 40%, предиктивное обслуживание вместо аварийного ремонта',
      savings: 'Экономия 8 млн ₽/год на эксплуатации, предотвращение убытков от простоев (20+ млн ₽/год)',
      technology: ['SCADA-система Siemens', 'Датчики вибрации IIoT', 'ИИ-модели (TensorFlow)', 'Облачная аналитика Azure', 'Приводы с частотным управлением'],
      icon: 'Cpu',
      color: 'from-purple-600 to-violet-500',
      implementation: [
        'Установка 120+ датчиков: давление, вибрация, положение, температура',
        'Замена приводов на современные с частотными преобразователями',
        'Разработка SCADA-системы диспетчерского управления',
        'Обучение ИИ-модели на исторических данных (20 лет эксплуатации)',
        'Интеграция с системой автоматизированного судоходства (АСУ "Шлюз")',
        'Мобильное приложение для оперативного персонала',
      ],
    },
    {
      id: 'R3',
      title: 'Умный мониторинг состояния конструкций',
      description: 'Распределённая сенсорная сеть для непрерывного контроля напряжённо-деформированного состояния бетона, арматуры, фильтрационных процессов с ИИ-анализом',
      problem: 'Обследования проводятся раз в 5 лет, трещины и деформации обнаруживаются постфактум, когда ремонт уже критичен. Нет данных о реальных нагрузках и запасе прочности',
      benefit: 'Раннее обнаружение дефектов (за 6-12 месяцев до критического состояния), планирование ремонтов без аварийных остановок, продление срока службы ГТС на 30%',
      savings: 'Экономия 15 млн ₽ за счёт предотвращения аварийных ремонтов и продления межремонтного цикла',
      technology: ['Оптоволоконные датчики деформаций', 'Акселерометры MEMS', 'Георадар для контроля фильтрации', 'ИИ для анализа трендов', 'Система раннего предупреждения'],
      icon: 'Activity',
      color: 'from-orange-600 to-red-500',
      implementation: [
        'Установка 300+ датчиков в критических зонах конструкций',
        'Оптоволоконные линии для контроля температуры и деформаций (5 км)',
        'Георадарное зондирование для мониторинга фильтрации',
        'Разработка ИИ-модели для прогнозирования дефектов',
        'Dashboard для диспетчеров с визуализацией состояния в реальном времени',
        'Автоматические оповещения при превышении пороговых значений',
      ],
    },
    {
      id: 'R4',
      title: 'Зелёная энергетика: малая ГЭС на перепаде шлюзов',
      description: 'Использование энергии воды при наполнении/опорожнении камер шлюзов для выработки электроэнергии. Установка гидротурбин в галереях систем опорожнения',
      problem: 'Энергия перепада 8 метров (ГУ-7) и 7 метров (ГУ-8) при пропуске ~2000 судов/год полностью теряется. Шлюзы потребляют 1.2 МВт/год на собственные нужды',
      benefit: 'Выработка 400 МВт·ч/год зелёной энергии, покрытие 30% собственных нужд, снижение углеродного следа на 180 тонн CO₂/год',
      savings: 'Экономия 2.4 млн ₽/год на электроэнергии, окупаемость за 7 лет',
      technology: ['Микрогидротурбины Kaplan', 'Синхронные генераторы', 'Системы частотного регулирования', 'Аккумуляторы Li-ion 50 кВт·ч', 'Умная сеть (Smart Grid)'],
      icon: 'Zap',
      color: 'from-green-600 to-emerald-500',
      implementation: [
        'Гидравлические расчёты режимов работы турбин',
        'Установка 4 микрогидротурбин (по 2 на каждый шлюз) в галереях опорожнения',
        'Интеграция с системой автоматизации затворов (синхронизация)',
        'Подключение к внутренней сети шлюзов через преобразователь',
        'Система аккумулирования для сглаживания пиков',
        'Мониторинг выработки и экономии в реальном времени',
      ],
    },
    {
      id: 'R5',
      title: 'Композитные материалы для восстановления конструкций',
      description: 'Применение углеродных и стеклопластиковых ламинатов FRP для усиления бетонных конструкций вместо традиционных металлических обойм',
      problem: 'Классические методы усиления (металлические обоймы, торкрет-бетон) увеличивают нагрузку на фундаменты, подвержены коррозии, требуют сложного монтажа под водой',
      benefit: 'Вес усиления в 8 раз меньше металла, срок службы 50+ лет без коррозии, монтаж в 3 раза быстрее, работа под водой без осушения камер',
      savings: 'Экономия 12 млн ₽ за счёт отказа от осушения камер и сокращения сроков работ на 4 месяца',
      technology: ['Углеродные ламинаты CFRP', 'Эпоксидные составы для подводного твердения', 'Системы S&P, Sika CarboDur', 'Неразрушающий контроль качества', 'Расчёты по СП 164'],
      icon: 'Layers',
      color: 'from-indigo-600 to-purple-500',
      implementation: [
        'Анализ дефектных зон и расчёт требуемого усиления',
        'Подводная подготовка поверхностей (механическая очистка)',
        'Нанесение эпоксидной грунтовки и клеевого состава',
        'Монтаж углеродных ламинатов водолазами',
        'Контроль качества адгезии ультразвуком',
        'Долгосрочный мониторинг работы усиления (датчики деформаций)',
      ],
    },
    {
      id: 'R6',
      title: 'Виртуальная реальность для обучения персонала',
      description: 'VR-симулятор для обучения диспетчеров и технического персонала работе в штатных и аварийных ситуациях без остановки реальных объектов',
      problem: 'Обучение на реальных шлюзах невозможно без остановки навигации. Новый персонал не имеет опыта работы в критических ситуациях до их возникновения',
      benefit: 'Снижение ошибок персонала на 60%, сокращение времени обучения с 6 месяцев до 2 месяцев, безопасная отработка аварийных сценариев',
      savings: 'Экономия 5 млн ₽/год за счёт предотвращения инцидентов по вине персонала',
      technology: ['Unity / Unreal Engine', 'VR-гарнитуры Meta Quest Pro', 'Интеграция с BIM-моделью', 'Физический движок для реалистичной гидравлики', 'Мультиплеер для командной работы'],
      icon: 'Glasses',
      color: 'from-pink-600 to-rose-500',
      implementation: [
        'Создание виртуальной копии гидроузлов на базе BIM-модели',
        'Разработка интерактивных сценариев (30+ ситуаций)',
        'Программирование физики воды, работы затворов, механизмов',
        'Интеграция голосовых команд и реакции на действия',
        'Система оценки действий и выдача рекомендаций',
        'Мультиплеерный режим для тренировки взаимодействия смен',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Заголовок секции */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-sm">
          Инновации
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
          Революционные решения
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Внедрение передовых технологий, которые выведут гидроузлы №7 и №8 на уровень объектов будущего с экономией <strong>44+ млн ₽</strong> за первый год эксплуатации
        </p>
      </div>

      {/* Сводная экономика */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 border-2 border-orange-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="TrendingUp" size={24} className="text-orange-600" />
          Суммарный эффект инноваций
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-3xl font-bold text-orange-600">44.9</div>
            <div className="text-sm text-gray-600">млн ₽ экономии в первый год</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-3xl font-bold text-red-600">2.8</div>
            <div className="text-sm text-gray-600">млн ₽ инвестиций в инновации</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-3xl font-bold text-green-600">16x</div>
            <div className="text-sm text-gray-600">окупаемость за 1 год</div>
          </div>
        </div>
      </Card>

      {/* Карточки решений */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((solution) => (
          <Card
            key={solution.id}
            className={`p-6 cursor-pointer transition-all hover:shadow-2xl hover:scale-105 bg-gradient-to-br ${solution.color} text-white relative overflow-hidden group`}
            onClick={() => setSelectedSolution(solution)}
          >
            {/* Анимированный фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <Icon name={solution.icon as any} size={40} className="flex-shrink-0" />
                <Badge className="bg-white/20 text-white border-white/30">
                  {solution.id}
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
              
              <p className="text-sm mb-4 text-white/90 line-clamp-3">
                {solution.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="DollarSign" size={16} />
                  <span className="font-semibold">{solution.savings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Sparkles" size={16} />
                  <span>{solution.technology.length} технологий</span>
                </div>
              </div>

              <Button
                className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedId(expandedId === solution.id ? null : solution.id);
                }}
              >
                {expandedId === solution.id ? 'Свернуть' : 'Подробнее'}
                <Icon name={expandedId === solution.id ? 'ChevronUp' : 'ChevronDown'} size={16} className="ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Детальная модалка */}
      {selectedSolution && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSolution(null)}
        >
          <Card
            className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedSolution.color} flex items-center justify-center text-white`}>
                  <Icon name={selectedSolution.icon as any} size={32} />
                </div>
                <div>
                  <Badge className="mb-2">{selectedSolution.id}</Badge>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedSolution.title}</h3>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSolution(null)}
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Icon name="FileText" size={20} className="text-blue-600" />
                  Описание
                </h4>
                <p className="text-gray-700">{selectedSolution.description}</p>
              </div>

              <div className="p-4 bg-red-50 border-l-4 border-l-red-600 rounded">
                <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <Icon name="AlertCircle" size={20} />
                  Проблема
                </h4>
                <p className="text-gray-700">{selectedSolution.problem}</p>
              </div>

              <div className="p-4 bg-green-50 border-l-4 border-l-green-600 rounded">
                <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <Icon name="CheckCircle2" size={20} />
                  Выгода
                </h4>
                <p className="text-gray-700">{selectedSolution.benefit}</p>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-l-blue-600 rounded">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  Экономический эффект
                </h4>
                <p className="text-gray-700 font-semibold">{selectedSolution.savings}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Icon name="Wrench" size={20} className="text-purple-600" />
                  Технологии
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSolution.technology.map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Icon name="ListChecks" size={20} className="text-orange-600" />
                  План внедрения
                </h4>
                <ol className="space-y-2">
                  {selectedSolution.implementation.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RevolutionarySolutions;
