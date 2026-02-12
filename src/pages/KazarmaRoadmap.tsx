import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const KazarmaRoadmap = () => {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById("roadmap-content");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = pdfWidth / imgWidth;
      const imgX = 0;
      const imgY = 0;

      let heightLeft = imgHeight * ratio;
      let position = 0;

      pdf.addImage(imgData, "PNG", imgX, imgY, pdfWidth, imgHeight * ratio);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight * ratio;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", imgX, position, pdfWidth, imgHeight * ratio);
        heightLeft -= pdfHeight;
      }

      pdf.save("Дорожная_карта_Казарма_ООО_РТС.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Дорожная карта проекта</h1>
            <p className="text-slate-600">Капитальный ремонт казармы — полный план работ</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/kazarma")}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Icon name="ArrowLeft" size={20} />
              К предложению
            </Button>
            <Button
              onClick={exportToPDF}
              disabled={isExporting}
              size="lg"
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Icon name="Download" size={20} />
              {isExporting ? "Генерация PDF..." : "Скачать PDF"}
            </Button>
          </div>
        </div>

        <div id="roadmap-content" className="bg-white rounded-xl shadow-lg p-12">
          {/* Заголовок */}
          <div className="text-center mb-12 pb-8 border-b-2 border-slate-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Санкт-Петербургский Проектный Институт
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Дорожная карта выполнения работ
            </h3>
            <p className="text-xl text-slate-700 mb-2">
              по капитальному ремонту казармы
            </p>
            <div className="mt-6 grid grid-cols-4 gap-4 text-slate-600">
              <div>
                <p className="text-sm text-slate-500">Объект</p>
                <p className="font-semibold">Казарма (14 325 м³)</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Заказчик</p>
                <p className="font-semibold">ООО «РТС»</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Стоимость</p>
                <p className="font-semibold text-blue-600">7 000 000 ₽</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Срок</p>
                <p className="font-semibold">23 недели (~5,5 мес)</p>
              </div>
            </div>
          </div>

          {/* Ключевые преимущества */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Как мы закрываем боли клиентов в проектировании
            </h3>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  icon: "Shield",
                  title: "Прозрачность процесса",
                  desc: "Четкие этапы и сроки — вы всегда знаете, на каком этапе находится проект",
                  color: "text-blue-600"
                },
                {
                  icon: "Target",
                  title: "Контроль бюджета",
                  desc: "Фиксированная стоимость по этапам — никаких неожиданных расходов",
                  color: "text-green-600"
                },
                {
                  icon: "Users",
                  title: "Одна команда",
                  desc: "Все специалисты под управлением ГИП — не нужно координировать подрядчиков",
                  color: "text-purple-600"
                },
                {
                  icon: "Clock",
                  title: "Гарантия сроков",
                  desc: "Четкий календарный план с контрольными точками и вехами проекта",
                  color: "text-orange-600"
                },
                {
                  icon: "FileCheck",
                  title: "Полное согласование",
                  desc: "Берем на себя все согласования с эксплуатирующими организациями",
                  color: "text-red-600"
                },
                {
                  icon: "Award",
                  title: "Соответствие нормам",
                  desc: "Документация по ГОСТ Р 21.101-2020, ПП РФ №87 и требованиям Минобороны",
                  color: "text-indigo-600"
                }
              ].map((benefit, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-all border-2 hover:border-blue-300">
                  <Icon name={benefit.icon} size={40} className={`${benefit.color} mb-4`} />
                  <h4 className="font-bold text-lg text-slate-900 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-slate-600">{benefit.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* ЭТАП 1 */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 p-8 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-3 bg-blue-600">Этап 1</Badge>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    Предпроектная подготовка и комплексное обследование
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Техническое заключение, обмерные чертежи, дефектная ведомость, ведомость объемов работ
                  </p>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={20} className="text-blue-600" />
                      <span className="font-semibold">8 недель</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Wallet" size={20} className="text-blue-600" />
                      <span className="font-semibold">2 800 000 ₽</span>
                    </div>
                  </div>
                </div>
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                  1
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              {[
                { week: "1", title: "Старт проекта", desc: "Подписание договора, получение аванса 40% (2 800 000 ₽). Формирование рабочей группы", resp: "Руководитель проекта" },
                { week: "1-2", title: "Анализ исходных данных", desc: "Получение от Заказчика документации. Анализ полноты, формирование запросов", resp: "ГИП, технический специалист" },
                { week: "2-3", title: "Визуальное обследование", desc: "Выезд на объект, осмотр здания, фотофиксация, предварительная оценка состояния", resp: "Инженер-обследователь" },
                { week: "3-6", title: "Инструментальное обследование", desc: "Обмерные работы, вскрытия узлов, определение прочности, поверочные расчеты", resp: "Инженер-обследователь" },
                { week: "6-7", title: "Камеральная обработка", desc: "Обмерные чертежи, анализ дефектов, поверочные расчеты несущей способности", resp: "Инженер-обследователь" },
                { week: "7-8", title: "Отчетная документация", desc: "Техническое заключение, акт состояния, дефектная ведомость, ведомость объемов", resp: "ГИП" },
                { week: "8", title: "Сдача этапа 1", desc: "Передача Заказчику полного комплекта документации по обследованию", resp: "Руководитель проекта", milestone: true }
              ].map((task, idx) => (
                <Card key={idx} className={`p-4 ${task.milestone ? 'bg-green-50 border-2 border-green-400' : 'hover:bg-slate-50'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      {task.milestone ? (
                        <Icon name="Flag" size={28} className="text-green-600" />
                      ) : (
                        <span className="font-bold text-blue-600">{task.week}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 mb-1">{task.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{task.desc}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Icon name="User" size={14} />
                        <span>{task.resp}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* ЭТАП 2 */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 p-8 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-3 bg-green-600">Этап 2</Badge>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    Разработка проектной документации
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Комплект ПД в составе разделов АР, КР, ИОС (без ПОС)
                  </p>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={20} className="text-green-600" />
                      <span className="font-semibold">12 недель</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Wallet" size={20} className="text-green-600" />
                      <span className="font-semibold">2 800 000 ₽</span>
                    </div>
                  </div>
                </div>
                <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-white text-4xl font-bold">
                  2
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              {[
                { week: "8-9", title: "Архитектурные решения (АР)", desc: "Объемно-планировочные решения, планы этажей, разрезы, фасады, кровля, отмостка", resp: "Архитектор", icon: "Home" },
                { week: "9-10", title: "Конструктивные решения (КР)", desc: "Усиление/восстановление конструкций, узлы сопряжений, армирование, спецификации", resp: "Конструктор", icon: "Building" },
                { week: "10-12", title: "ИОС 5.1 Электроснабжение", desc: "Расчет нагрузок, схемы электроснабжения, осветительные сети, щитовое оборудование", resp: "Инженер-электрик", icon: "Zap" },
                { week: "12-13", title: "ИОС 5.2 Водоснабжение", desc: "Схемы внутреннего водопровода, аксонометрия, узлы вводов, спецификации", resp: "Инженер-сантехник", icon: "Droplet" },
                { week: "13-14", title: "ИОС 5.3 Водоотведение", desc: "Схемы канализации, аксонометрия, выпуски, спецификации оборудования", resp: "Инженер-сантехник", icon: "Droplets" },
                { week: "14-16", title: "ИОС 5.4 Отопление и вентиляция", desc: "Теплотехнический расчет, схемы отопления (регистры), вентиляция, узлы управления", resp: "Инженер-теплотехник", icon: "Wind" },
                { week: "16-17", title: "ИОС 5.5 АПС (Болид)", desc: "Схемы размещения извещателей, трассировка кабелей, структурные схемы", resp: "Инженер-слаботочник", icon: "Bell" },
                { week: "17-18", title: "Увязка разделов и нормоконтроль", desc: "Проверка взаимного соответствия, устранение коллизий, проверка на соответствие нормам", resp: "ГИП, нормоконтролер", icon: "CheckCheck" },
                { week: "18", title: "Внутренняя приемка ПД", desc: "Комплексная проверка готовой документации, подготовка к передаче Заказчику", resp: "Руководитель проекта", icon: "Clipboard" },
                { week: "19", title: "Сдача этапа 2", desc: "Передача комплекта ПД. Получение промежуточного платежа 40% (2 800 000 ₽)", resp: "Руководитель проекта", milestone: true }
              ].map((task, idx) => (
                <Card key={idx} className={`p-4 ${task.milestone ? 'bg-green-50 border-2 border-green-400' : 'hover:bg-slate-50'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      {task.milestone ? (
                        <Icon name="Flag" size={28} className="text-green-600" />
                      ) : task.icon ? (
                        <Icon name={task.icon} size={28} className="text-green-600" />
                      ) : (
                        <span className="font-bold text-green-600">{task.week}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 mb-1">{task.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{task.desc}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Icon name="User" size={14} />
                        <span>{task.resp}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* ЭТАП 3 */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-300 p-8 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-3 bg-purple-600">Этап 3</Badge>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    ПОС, согласование и итоговая сдача
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Разработка ПОС, согласование ПД, полный комплект документации, итоговый акт
                  </p>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={20} className="text-purple-600" />
                      <span className="font-semibold">4 недели</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Wallet" size={20} className="text-purple-600" />
                      <span className="font-semibold">1 400 000 ₽</span>
                    </div>
                  </div>
                </div>
                <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                  3
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              {[
                { week: "19-20", title: "Разработка ПОС", desc: "Календарный план, стройгенплан, ведомости демонтажа, схема вывоза отходов", resp: "Инженер ПОС", icon: "HardHat" },
                { week: "20-21", title: "Согласование с пользователем", desc: "Направление ПД пользователю, получение замечаний, внесение корректировок", resp: "ГИП" },
                { week: "21-22", title: "Согласование с эксплуатирующими организациями", desc: "Направление разделов в электросети, водоканал, теплосети. Внесение корректировок", resp: "ГИП, инженеры ИОС" },
                { week: "22-23", title: "Комплектация и выпуск", desc: "Тиражирование документации, формирование томов, подготовка электронной версии", resp: "Технический специалист" },
                { week: "23", title: "Итоговая сдача", desc: "Передача полного комплекта согласованной ПД. Подписание итогового акта", resp: "Руководитель проекта", milestone: true },
                { week: "23", title: "Окончательный расчет", desc: "Получение окончательного платежа 20% (1 400 000 ₽)", resp: "Руководитель проекта", milestone: true }
              ].map((task, idx) => (
                <Card key={idx} className={`p-4 ${task.milestone ? 'bg-green-50 border-2 border-green-400' : 'hover:bg-slate-50'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      {task.milestone ? (
                        <Icon name="Flag" size={28} className="text-green-600" />
                      ) : (
                        <span className="font-bold text-purple-600">{task.week}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 mb-1">{task.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{task.desc}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Icon name="User" size={14} />
                        <span>{task.resp}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Ключевые вехи */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Icon name="TrendingUp" size={28} className="text-blue-600" />
              Ключевые вехи проекта
            </h3>
            
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-green-400 to-purple-400"></div>
              
              <div className="space-y-6">
                {[
                  { week: "Неделя 1", title: "Старт проекта", desc: "Подписан договор, получен аванс", color: "bg-blue-500" },
                  { week: "Неделя 8", title: "Завершение обследования", desc: "Передано техническое заключение, подписан акт этапа 1", color: "bg-blue-500" },
                  { week: "Неделя 19", title: "Завершение разработки ПД", desc: "Передан комплект ПД (АР, КР, ИОС), подписан акт этапа 2, получен промежуточный платеж", color: "bg-green-500" },
                  { week: "Неделя 20", title: "Завершение ПОС", desc: "Разработан раздел ПОС (календарный план, стройгенплан, ведомости)", color: "bg-purple-500" },
                  { week: "Неделя 22", title: "Получение всех согласований", desc: "Листы согласования с пользователем и эксплуатирующими организациями", color: "bg-purple-500" },
                  { week: "Неделя 23", title: "Итоговая сдача", desc: "Подписан итоговый акт, передан полный комплект, получен окончательный платеж", color: "bg-green-600" }
                ].map((milestone, idx) => (
                  <div key={idx} className="relative flex items-start gap-6 pl-16">
                    <div className={`absolute left-4 w-8 h-8 rounded-full ${milestone.color} ring-4 ring-white flex items-center justify-center`}>
                      <Icon name="Check" size={20} className="text-white" />
                    </div>
                    <Card className="flex-1 p-4 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className="mb-2">{milestone.week}</Badge>
                          <h4 className="font-bold text-lg text-slate-900 mb-1">{milestone.title}</h4>
                          <p className="text-sm text-slate-600">{milestone.desc}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* График финансирования */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Icon name="PiggyBank" size={28} className="text-blue-600" />
              График финансирования
            </h3>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { title: "Аванс", percent: "40%", amount: "2 800 000 ₽", timing: "Начало работ (после подписания договора)", color: "from-blue-500 to-blue-600" },
                { title: "Промежуточный платеж", percent: "40%", amount: "2 800 000 ₽", timing: "По завершении разработки ПД (этап 2)", color: "from-green-500 to-green-600" },
                { title: "Окончательный расчет", percent: "20%", amount: "700 000 ₽", timing: "После полного согласования и передачи документации", color: "from-purple-500 to-purple-600" }
              ].map((payment, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-full h-2 bg-gradient-to-r ${payment.color} rounded-full mb-4`}></div>
                  <h4 className="font-bold text-lg text-slate-900 mb-2">{payment.title}</h4>
                  <p className="text-4xl font-bold text-slate-900 mb-1">{payment.percent}</p>
                  <p className="text-2xl font-semibold text-blue-600 mb-3">{payment.amount}</p>
                  <p className="text-sm text-slate-600">{payment.timing}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Риски и меры */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Icon name="AlertTriangle" size={28} className="text-orange-600" />
              Риски и меры их минимизации
            </h3>
            
            <div className="space-y-4">
              {[
                { risk: "Неполнота исходных данных", prob: "Средняя", impact: "Высокое", measure: "Формирование детального запроса на старте, регулярный контроль" },
                { risk: "Выявление скрытых дефектов при вскрытиях", prob: "Высокая", impact: "Среднее", measure: "Оперативная фиксация, включение в дефектную ведомость, корректировка объемов" },
                { risk: "Задержки согласований", prob: "Высокая", impact: "Высокое", measure: "Параллельное направление во все инстанции, предварительные консультации" },
                { risk: "Изменение требований в процессе", prob: "Низкая", impact: "Среднее", measure: "Фиксация в протоколах совещаний, оформление дополнительных соглашений" }
              ].map((risk, idx) => (
                <Card key={idx} className="p-4 hover:bg-slate-50">
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-4">
                      <h4 className="font-bold text-slate-900 mb-1">{risk.risk}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">{risk.prob}</Badge>
                        <Badge variant="outline" className="text-xs">{risk.impact}</Badge>
                      </div>
                    </div>
                    <div className="col-span-8">
                      <p className="text-sm text-slate-600 flex items-start gap-2">
                        <Icon name="ShieldCheck" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                        <span>{risk.measure}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Футер */}
          <div className="mt-16 pt-8 border-t-2 border-slate-200">
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-4">
                Дорожная карта является детализацией календарного плана и подлежит уточнению при подписании договора
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => navigate("/kazarma")}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <Icon name="ArrowLeft" size={20} />
                  Вернуться к КП
                </Button>
                <Button
                  onClick={exportToPDF}
                  disabled={isExporting}
                  size="lg"
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Icon name="Download" size={20} />
                  {isExporting ? "Генерация PDF..." : "Скачать дорожную карту"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KazarmaRoadmap;