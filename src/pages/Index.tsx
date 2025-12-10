import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('cover');

  const sections = [
    { id: 'cover', label: 'Обложка', icon: 'FileText' },
    { id: 'problem', label: 'Проблема', icon: 'AlertCircle' },
    { id: 'technology', label: 'AI-технология', icon: 'Cpu' },
    { id: 'team', label: 'Команда', icon: 'Users' },
    { id: 'pricing', label: 'Тарифы', icon: 'DollarSign' },
    { id: 'benefits', label: 'Выгоды', icon: 'TrendingUp' },
    { id: 'contacts', label: 'Контакты', icon: 'Phone' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-lavender-50">
      <nav className="fixed left-0 top-0 h-screen w-20 bg-white/80 backdrop-blur-lg border-r border-purple-200 shadow-lg z-50 hidden lg:flex flex-col items-center py-8 gap-6">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white font-bold text-xl">
            1D
          </div>
        </div>
        <Separator className="w-12 bg-purple-200" />
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group relative flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600'
            }`}
            title={section.label}
          >
            <Icon name={section.icon} size={20} />
            <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {section.label}
            </div>
          </button>
        ))}
      </nav>

      <main className="lg:ml-20">
        <section id="cover" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-purple-600/10" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg4ODg4OCIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative z-10 max-w-5xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white shadow-2xl">
                <div className="text-center">
                  <div className="text-4xl font-bold">1 DAY</div>
                  <div className="text-xl font-light">HR</div>
                </div>
              </div>
            </div>
            
            <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-300 px-4 py-2 text-sm">
              Коммерческое предложение
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-700 via-violet-600 to-purple-700 bg-clip-text text-transparent leading-tight">
              Гарантированный подбор
              <br />команды из 21 специалиста
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-4 font-light">
              для объектов на Тагульском и Русском месторождениях
            </p>
            
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-8 py-4 shadow-xl border border-purple-200 mb-12">
              <Icon name="Building2" size={24} className="text-purple-600" />
              <div className="text-left">
                <div className="text-sm text-gray-600">Для компании</div>
                <div className="text-xl font-bold text-gray-900">ООО "МС-ГРУПП"</div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white rounded-xl px-6 py-4 shadow-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-700">21</div>
                <div className="text-sm text-gray-600">специалист</div>
              </div>
              <div className="bg-white rounded-xl px-6 py-4 shadow-lg border border-purple-200">
                <div className="text-3xl font-bold text-violet-600">900 000 ₽</div>
                <div className="text-sm text-gray-600">итоговая стоимость</div>
              </div>
              <div className="bg-white rounded-xl px-6 py-4 shadow-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-700">72</div>
                <div className="text-sm text-gray-600">часа до старта</div>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm">Дата: 10.12.2025</p>
            
            <Button 
              onClick={() => scrollToSection('problem')}
              className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl"
            >
              Читать предложение
              <Icon name="ArrowDown" size={20} className="ml-2" />
            </Button>
          </div>
        </section>

        <section id="problem" className="min-h-screen py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-6 bg-red-100 text-red-700 border-red-300 px-4 py-2">
              Глава 1
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">
              Почему стандартный подбор — это риск для вашего проекта
            </h2>
            
            <Card className="p-8 mb-8 border-l-4 border-l-purple-600 shadow-xl bg-gradient-to-br from-white to-purple-50">
              <p className="text-lg text-gray-700 leading-relaxed">
                Строительство на месторождениях требует не просто людей, а <strong className="text-purple-700">профессиональные, проверенные кадры</strong>, готовые работать в сложных условиях. Понимая ваши ключевые боли — <strong className="text-red-600">риски простоев, несоответствие квалификации и текучку на объектах</strong>, — мы предлагаем принципиально новый подход к подбору.
              </p>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 hover:shadow-xl transition-shadow border-t-4 border-t-red-500">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <Icon name="Clock" size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Простои объекта</h3>
                <p className="text-gray-600">
                  Каждый день без нужного специалиста стоит сотни тысяч рублей упущенной прибыли
                </p>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-shadow border-t-4 border-t-orange-500">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <Icon name="AlertTriangle" size={24} className="text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Низкая квалификация</h3>
                <p className="text-gray-600">
                  Резюме не отражают реальных навыков — брак в работе выявляется уже на объекте
                </p>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-shadow border-t-4 border-t-yellow-500">
                <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-4">
                  <Icon name="Users" size={24} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Высокая текучка</h3>
                <p className="text-gray-600">
                  Люди не выдерживают условий работы — постоянный поиск замен отвлекает от стройки
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-gradient-to-br from-purple-600 to-violet-500 text-white shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Lightbulb" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Наше решение</h3>
                  <p className="text-lg leading-relaxed text-purple-50">
                    Поставка полных монтажных бригад «под ключ» с использованием искусственного интеллекта для объективной проверки профессиональных качеств. Мы берем на себя кадровые риски, чтобы вы могли сосредоточиться на главном — своевременной сдаче объекта.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="technology" className="min-h-screen py-20 px-4 bg-gradient-to-br from-purple-50 to-violet-50">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-300 px-4 py-2">
              Глава 2
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Наша уникальная технология
            </h2>
            <p className="text-2xl text-purple-700 font-semibold mb-12">AI-ГАРАНТ КАЧЕСТВА</p>

            <Card className="p-8 mb-12 shadow-xl bg-white">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Мы не используем шаблонный подбор. Каждый специалист проходит проверку через нашу систему <strong className="text-purple-700">AI-верификации</strong>:
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Создание цифрового эталона</h3>
                    <p className="text-gray-600 leading-relaxed">
                      На основе вашего ТЗ мы закладываем в ИИ ключевые параметры идеального кандидата: от конкретных технологий (сварка ТТ, монтаж по специфическим нормативам) до необходимых мягких навыков.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Глубинное собеседование с AI-анализом</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Кандидат отвечает на серию технических и ситуационных вопросов. Нейросеть анализирует не только содержание, но и структуру ответов, выявляя реальный уровень знаний.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Измеримый результат</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Вы получаете отчет с процентным соответствием кандидата вашим требованиям.
                    </p>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                      <p className="text-purple-700 font-semibold">
                        Например: "Соответствие параметру 'работа с графиками ППР' — 96%"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckCircle2" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Результат для вас</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Вы устраняете человеческий фактор. К вашему мастеру на собеседование попадают только кандидаты, прошедшие объективную алгоритмическую проверку.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="team" className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-300 px-4 py-2">
              Глава 3
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Состав команды
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Комплексный пакет для закрытия всех ваших вакансий с фиксированной стоимостью
            </p>

            <Card className="p-8 mb-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Icon name="MapPin" size={24} className="text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Тагульское месторождение</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-purple-200">
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Должность</th>
                      <th className="text-center py-3 px-4 text-gray-700 font-semibold">Кол-во</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Фокус AI-проверки</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Инженер ПТО</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-purple-100 text-purple-700">1</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Знание СНиП, ППР, смет, опыт работы с технадзором</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Мастер СМР</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-purple-100 text-purple-700">1</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Управленческие навыки, чтение ПСД, контроль сроков</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Мастер ЭМР</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-purple-100 text-purple-700">1</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Знание ПУЭ, монтажа электрооборудования, организация ЭМР</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Начальник участка</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-purple-100 text-purple-700">1</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Опыт руководства на объектах ТЭКа, управление бюджетом</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Электрогазосварщик ТТ</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-violet-100 text-violet-700">2</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Сварка трубопроводов высокого давления, контроль швов</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Электрогазосварщик (без НАКС)</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">1</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Работа по неответственным конструкциям, безопасность труда</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Электромонтажники</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">2</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Знание схем, монтаж электрооборудования и КИПиА</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Монтажники</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">4</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Сборка металлоконструкций, чтение чертежей, работа на высоте</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Отделочники</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">2</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Технологии внутренней отделки бытовых помещений</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-8 mb-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon name="MapPin" size={24} className="text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Челябинская обл. (г. Озёрск)</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-blue-200">
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Должность</th>
                      <th className="text-center py-3 px-4 text-gray-700 font-semibold">Кол-во</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Фокус AI-проверки</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Бетонщики</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">4</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Работа в условиях промобъекта, типы бетонов, зимнее бетонирование</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-8 mb-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center">
                  <Icon name="MapPin" size={24} className="text-violet-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Русское месторождение</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-violet-200">
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Должность</th>
                      <th className="text-center py-3 px-4 text-gray-700 font-semibold">Кол-во</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Фокус AI-проверки</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-violet-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Электрогазосварщик (без НАКС)</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">1</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Работа по неответственным конструкциям, безопасность труда</td>
                    </tr>
                    <tr className="hover:bg-violet-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Отделочники</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">2</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Технологии внутренней отделки бытовых помещений</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon name="Users" size={32} />
                  </div>
                  <div>
                    <div className="text-sm text-purple-100">Всего специалистов</div>
                    <div className="text-5xl font-bold">21</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-purple-100 mb-1">3 объекта</div>
                  <div className="text-sm text-purple-100">14 различных специальностей</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="pricing" className="min-h-screen py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-6 bg-green-100 text-green-700 border-green-300 px-4 py-2">
              Глава 4
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Стоимость услуг и гарантии
            </h2>

            <Card className="p-8 mb-8 shadow-xl bg-white">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-4 px-4 text-gray-700 font-semibold">Объект / Должность</th>
                      <th className="text-center py-4 px-4 text-gray-700 font-semibold">Кол-во</th>
                      <th className="text-left py-4 px-4 text-gray-700 font-semibold">Категория</th>
                      <th className="text-right py-4 px-4 text-gray-700 font-semibold">Цена за 1</th>
                      <th className="text-right py-4 px-4 text-gray-700 font-semibold">Итого</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-purple-50">
                      <td colSpan={5} className="py-3 px-4 font-bold text-purple-700">ТАГУЛЬСКОЕ МЕСТОРОЖДЕНИЕ</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Инженер ПТО</td>
                      <td className="text-center py-3 px-4">1</td>
                      <td className="py-3 px-4"><Badge className="bg-purple-600">Высококвалифицированные</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">80 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">80 000 ₽</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Мастер СМР</td>
                      <td className="text-center py-3 px-4">1</td>
                      <td className="py-3 px-4"><Badge className="bg-purple-600">Высококвалифицированные</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">80 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">80 000 ₽</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Мастер ЭМР</td>
                      <td className="text-center py-3 px-4">1</td>
                      <td className="py-3 px-4"><Badge className="bg-purple-600">Высококвалифицированные</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">80 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">80 000 ₽</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Начальник участка</td>
                      <td className="text-center py-3 px-4">1</td>
                      <td className="py-3 px-4"><Badge className="bg-purple-600">Высококвалифицированные</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">80 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">80 000 ₽</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Электрогазосварщик ТТ</td>
                      <td className="text-center py-3 px-4">2</td>
                      <td className="py-3 px-4"><Badge className="bg-violet-600">Ключевые с сертификатами</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">60 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">120 000 ₽</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Электрогазосварщик (без НАКС)</td>
                      <td className="text-center py-3 px-4">1</td>
                      <td className="py-3 px-4"><Badge className="bg-blue-600">Рабочие специалисты</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">35 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">35 000 ₽</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Электромонтажники</td>
                      <td className="text-center py-3 px-4">2</td>
                      <td className="py-3 px-4"><Badge className="bg-blue-600">Рабочие специалисты</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">35 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">70 000 ₽</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Монтажники</td>
                      <td className="text-center py-3 px-4">4</td>
                      <td className="py-3 px-4"><Badge className="bg-blue-600">Рабочие специалисты</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">35 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">140 000 ₽</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Отделочники</td>
                      <td className="text-center py-3 px-4">2</td>
                      <td className="py-3 px-4"><Badge className="bg-blue-600">Рабочие специалисты</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">35 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">70 000 ₽</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td colSpan={5} className="py-3 px-4 font-bold text-blue-700">ЧЕЛЯБИНСКАЯ ОБЛ. (г. ОЗЁРСК)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Бетонщики</td>
                      <td className="text-center py-3 px-4">4</td>
                      <td className="py-3 px-4"><Badge className="bg-blue-600">Рабочие специалисты</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">35 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">140 000 ₽</td>
                    </tr>
                    <tr className="bg-violet-50">
                      <td colSpan={5} className="py-3 px-4 font-bold text-violet-700">РУССКОЕ МЕСТОРОЖДЕНИЕ</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Электрогазосварщик (без НАКС)</td>
                      <td className="text-center py-3 px-4">1</td>
                      <td className="py-3 px-4"><Badge className="bg-blue-600">Рабочие специалисты</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">35 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">35 000 ₽</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Отделочники</td>
                      <td className="text-center py-3 px-4">2</td>
                      <td className="py-3 px-4"><Badge className="bg-blue-600">Рабочие специалисты</Badge></td>
                      <td className="text-right py-3 px-4 font-semibold">35 000 ₽</td>
                      <td className="text-right py-3 px-4 font-semibold">70 000 ₽</td>
                    </tr>
                    <tr className="border-t-2 border-gray-300 bg-gray-100">
                      <td colSpan={4} className="py-4 px-4 text-right font-bold text-lg">Итого по всем позициям:</td>
                      <td className="text-right py-4 px-4 font-bold text-lg">1 000 000 ₽</td>
                    </tr>
                    <tr className="bg-green-100">
                      <td colSpan={4} className="py-4 px-4 text-right font-bold text-lg text-green-700">Пакетная скидка (10%):</td>
                      <td className="text-right py-4 px-4 font-bold text-lg text-green-700">- 100 000 ₽</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                      <td colSpan={4} className="py-5 px-4 text-right font-bold text-2xl">ИТОГО К ОПЛАТЕ:</td>
                      <td className="text-right py-5 px-4 font-bold text-3xl">900 000 ₽</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 border-l-4 border-l-purple-600 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Срок исполнения</h3>
                </div>
                <p className="text-gray-700">
                  Поэтапная поставка специалистов в соответствии с согласованным календарным планом.
                </p>
                <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                  <p className="text-purple-700 font-semibold">
                    Первые кандидаты — в течение 72 часов после подписания договора
                  </p>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-green-600 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Icon name="Shield" size={20} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Гарантии</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Пожизненная гарантия на каждого подобранного специалиста.
                </p>
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-700 font-semibold">
                    В случае увольнения — одна бесплатная замена
                  </p>
                </div>
              </Card>
            </div>

            <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Что входит в стоимость (ВСЁ ВКЛЮЧЕНО)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Настройка AI-профилей под каждую из 21 вакансий',
                  'Активный поиск, первичный отбор, AI-собеседования',
                  'Полная проверка документов и верификация в реестрах',
                  'Организация финальных собеседований (онлайн)',
                  'Юридическое и организационное сопровождение',
                  'Персональный менеджер проекта и еженедельная отчетность'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={16} className="text-white" />
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="benefits" className="min-h-screen py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-6 bg-orange-100 text-orange-700 border-orange-300 px-4 py-2">
              Глава 5
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">
              Выгоды для вас как генподрядчика
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8 hover:shadow-2xl transition-all border-t-4 border-t-blue-500 group">
                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="Wallet" size={32} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Контроль бюджета</h3>
                <p className="text-gray-700 leading-relaxed">
                  Пакетная цена с фиксированной скидкой экономит ваш бюджет <strong className="text-green-600">100 000 рублей</strong> и обеспечивает предсказуемые расходы на подбор всей команды.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-2xl transition-all border-t-4 border-t-green-500 group">
                <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="ShieldCheck" size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Снижение рисков</h3>
                <p className="text-gray-700 leading-relaxed">
                  AI-отбор минимизирует процент брака, а <strong className="text-purple-700">пожизненная гарантия</strong> страхует ваши вложения.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-2xl transition-all border-t-4 border-t-purple-500 group">
                <div className="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="Zap" size={32} className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Скорость</h3>
                <p className="text-gray-700 leading-relaxed">
                  Параллельный подбор по всем вакансиям силами выделенной команды рекрутеров. <strong className="text-purple-700">Первые кандидаты через 72 часа.</strong>
                </p>
              </Card>

              <Card className="p-8 hover:shadow-2xl transition-all border-t-4 border-t-violet-500 group">
                <div className="w-16 h-16 rounded-xl bg-violet-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="Timer" size={32} className="text-violet-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Экономия внутренних ресурсов</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ваши инженеры и мастера не тратят время на поиск, а занимаются строительством. <strong className="text-violet-700">Фокус на главном.</strong>
                </p>
              </Card>
            </div>

            <Card className="p-10 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 text-white shadow-2xl">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-6">Следующие шаги к сотрудничеству</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      1
                    </div>
                    <h4 className="text-xl font-bold mb-2">Детализация ТЗ</h4>
                    <p className="text-purple-100">
                      Совместно заполним брифы по ключевым позициям для настройки AI-профилей
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      2
                    </div>
                    <h4 className="text-xl font-bold mb-2">Договор</h4>
                    <p className="text-purple-100">
                      Заключаем договор с четким графиком поставки специалистов
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      3
                    </div>
                    <h4 className="text-xl font-bold mb-2">Старт проекта</h4>
                    <p className="text-purple-100">
                      Запускаем поиск и предоставляем первых кандидатов
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => scrollToSection('contacts')}
                  className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl font-bold shadow-xl"
                >
                  Связаться с нами
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        <section id="contacts" className="min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gray-800 text-white px-4 py-2">
              Глава 6
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">
              Контакты и реквизиты
            </h2>

            <Card className="p-10 shadow-2xl mb-8 bg-white">
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1 DAY</div>
                    <div className="text-sm font-light">HR</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">1 DAY HR</h3>
                  <p className="text-gray-600">Первое HR агентство с AI-подбором</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Телефон</div>
                      <a href="tel:+79955556231" className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                        +7 (995) 555-62-31
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Email</div>
                      <a href="mailto:1dayhunter24@gmail.com" className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                        1dayhunter24@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="Globe" size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Веб-сайт</div>
                      <a href="https://1-day-hr.ru" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                        1-day-hr.ru
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="FileText" size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">ИП</div>
                      <p className="text-lg font-semibold text-gray-900">
                        Зленко Денис Игоревич
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="Building" size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">ОГРН</div>
                      <p className="text-lg font-semibold text-gray-900">
                        325350000020848
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="Hash" size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">ИНН</div>
                      <p className="text-lg font-semibold text-gray-900">
                        352828469363
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">Готовы начать сотрудничество?</h3>
              <p className="text-lg mb-6 text-purple-100">
                Свяжитесь с нами любым удобным способом, и мы приступим к подбору вашей команды
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-white text-purple-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Позвонить
                </Button>
                <Button className="bg-white/10 backdrop-blur border-2 border-white text-white hover:bg-white/20 px-6 py-3 rounded-lg font-semibold">
                  <Icon name="Mail" size={20} className="mr-2" />
                  Написать письмо
                </Button>
              </div>
            </Card>

            <div className="text-center mt-12 text-gray-500">
              <p className="mb-2">© 2025 1 DAY HR. Все права защищены.</p>
              <p className="text-sm">Первое HR агентство с AI-подбором персонала</p>
            </div>
          </div>
        </section>
      </main>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-purple-200 shadow-lg z-50 px-4 py-3">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          {sections.slice(0, 5).map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                activeSection === section.id
                  ? 'text-purple-700'
                  : 'text-gray-500'
              }`}
            >
              <Icon name={section.icon} size={20} />
              <span className="text-xs">{section.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;