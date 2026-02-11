import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";

const KazarmaProposal = () => {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById("proposal-content");
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

      pdf.save("КП_Казарма_ООО_РТС.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Коммерческое предложение</h1>
            <p className="text-slate-600">Проектирование капитального ремонта казармы</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={exportToPDF}
              disabled={isExporting}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Icon name="Download" size={20} />
              {isExporting ? "Генерация PDF..." : "Скачать PDF"}
            </Button>
            <Button
              onClick={() => navigate("/kazarma/roadmap")}
              size="lg"
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Icon name="Map" size={20} />
              Дорожная карта
            </Button>
          </div>
        </div>

        <div id="proposal-content" className="bg-white rounded-xl shadow-lg p-12">
          {/* Заголовок */}
          <div className="text-center mb-12 pb-8 border-b-2 border-slate-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Санкт-Петербургский Проектный Институт
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Коммерческое предложение
            </h3>
            <p className="text-xl text-slate-700 mb-2">
              на проектирование капитального ремонта казармы
            </p>
            <div className="mt-6 space-y-2 text-slate-600">
              <p><span className="font-semibold">Объект:</span> Казарма (здание, объем 14 325 м³)</p>
              <p><span className="font-semibold">Заказчик:</span> ООО «РТС»</p>
              <p><span className="font-semibold">Исполнитель:</span> Группа компаний, предоставим юр.лицо подходящее под требование СБ</p>
              <p><span className="font-semibold">Основание:</span> Задание на проектирование</p>
            </div>
          </div>

          {/* Общая стоимость */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-8 mb-12">
            <div className="text-center">
              <p className="text-lg text-slate-600 mb-2">Общая стоимость работ</p>
              <p className="text-5xl font-bold text-blue-600">7 000 000 ₽</p>
              <p className="text-sm text-slate-500 mt-3">Включая все этапы и разделы проектной документации</p>
              <p className="text-xs text-red-600 font-semibold mt-4 border-t pt-3 border-slate-300">
                * Стоимость действует только пакетно. При выборе отдельных позиций кф × 1,5
              </p>
            </div>
          </Card>

          {/* Состав работ */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Icon name="FileText" size={28} className="text-blue-600" />
              Распределение стоимости по видам работ
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left text-sm font-semibold">№</th>
                    <th className="border border-slate-300 px-4 py-3 text-left text-sm font-semibold">Вид работ / Раздел</th>
                    <th className="border border-slate-300 px-4 py-3 text-left text-sm font-semibold">Состав работ</th>
                    <th className="border border-slate-300 px-4 py-3 text-right text-sm font-semibold">Стоимость, ₽</th>
                    <th className="border border-slate-300 px-4 py-3 text-right text-sm font-semibold">Доля, %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 text-sm">1</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm font-semibold">Комплексное обследование технического состояния</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600">
                      Визуальный и инструментальный осмотр, обмерные работы, поверочные расчеты, фотофиксация, подготовка технического заключения, акта технического состояния, дефектной ведомости, ведомости объемов работ, обмерных чертежей в соответствии с ГОСТ 31937-2024
                    </td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right font-semibold">3 500 000</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">50,0%</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 text-sm">2</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm font-semibold">Раздел 3. Архитектурные решения (АР)</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600">
                      Разработка объемно-планировочных и архитектурных решений по ремонту кровли, фасада, внутренних помещений. Ведомости отделки, спецификации материалов, узлы и детали
                    </td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right font-semibold">700 000</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">10,0%</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 text-sm">3</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm font-semibold">Раздел 4. Конструктивные решения (КР)</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600">
                      Разработка решений по усилению и восстановлению несущих и ограждающих конструкций, узлы, детали, ведомости расхода материалов, указания по производству работ
                    </td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right font-semibold">700 000</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">10,0%</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-slate-300 px-4 py-3 text-sm">4</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm font-semibold" colSpan={2}>
                      Раздел 5. Сведения об инженерном оборудовании (ИОС)
                    </td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right font-semibold">1 400 000</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">20,0%</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 text-sm"></td>
                    <td className="border border-slate-300 px-4 py-3 text-sm pl-8">Подраздел ИОС 5.1 — Система электроснабжения</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600"></td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">307 000</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right"></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 text-sm"></td>
                    <td className="border border-slate-300 px-4 py-3 text-sm pl-8">Подраздел ИОС 5.2 — Система водоснабжения</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600"></td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">262 500</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right"></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 text-sm"></td>
                    <td className="border border-slate-300 px-4 py-3 text-sm pl-8">Подраздел ИОС 5.3 — Система водоотведения</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600"></td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">262 500</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right"></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 text-sm"></td>
                    <td className="border border-slate-300 px-4 py-3 text-sm pl-8">Подраздел ИОС 5.4 — Отопление, вентиляция, кондиционирование</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600"></td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">350 000</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right"></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 text-sm"></td>
                    <td className="border border-slate-300 px-4 py-3 text-sm pl-8">Подраздел ИОС 5.5 — Система АПС (Болид)</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600"></td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">175 000</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right"></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 text-sm">5</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm font-semibold">Раздел 7. Проект организации строительства (ПОС)</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-slate-600">
                      Календарный план производства работ, стройгенплан, ведомости объемов демонтажных и монтажных работ, ведомость строительных отходов, схема вывоза отходов, мероприятия по безопасной организации работ
                    </td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right font-semibold">700 000</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">10,0%</td>
                  </tr>
                  <tr className="bg-slate-200 font-bold">
                    <td colSpan={3} className="border border-slate-300 px-4 py-3 text-sm text-right">ИТОГО:</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">7 000 000</td>
                    <td className="border border-slate-300 px-4 py-3 text-sm text-right">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Календарный план */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Icon name="Calendar" size={28} className="text-blue-600" />
              Распределение стоимости по этапам выполнения
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  num: "1",
                  name: "Предпроектный этап",
                  content: "Комплексное обследование технического состояния здания. Подготовка и передача Заказчику технического заключения, акта технического состояния, дефектной ведомости, ведомости объемов работ, обмерных чертежей",
                  cost: "3 500 000",
                  period: "6-8 недель",
                  color: "bg-blue-100 border-blue-300"
                },
                {
                  num: "2",
                  name: "Разработка проектной документации",
                  content: "Разработка разделов АР, КР, ИОС (комплексно), ПОС. Взаимная увязка разделов, внутренняя проверка, нормоконтроль",
                  cost: "2 800 000",
                  period: "10-12 недель",
                  color: "bg-green-100 border-green-300"
                },
                {
                  num: "3",
                  name: "Согласование и сдача",
                  content: "Согласование проектной документации с пользователем и эксплуатирующими организациями. Внесение корректировок по замечаниям. Передача Заказчику полного комплекта документации по Акту сдачи-приемки",
                  cost: "700 000",
                  period: "2-3 недели",
                  color: "bg-purple-100 border-purple-300"
                }

              ].map((stage) => (
                <Card key={stage.num} className={`${stage.color} border-2 p-6`}>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-xl text-slate-700">
                        {stage.num}
                      </div>
                    </div>
                    <div className="col-span-7">
                      <h4 className="font-bold text-lg text-slate-900 mb-2">{stage.name}</h4>
                      <p className="text-sm text-slate-600">{stage.content}</p>
                    </div>
                    <div className="col-span-2 text-center">
                      <p className="text-2xl font-bold text-slate-900">{stage.cost} ₽</p>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="bg-white rounded-lg px-3 py-2">
                        <Icon name="Clock" size={20} className="mx-auto mb-1 text-slate-600" />
                        <p className="text-sm font-semibold text-slate-700">{stage.period}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-slate-100 border-2 border-slate-300 p-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">ИТОГО:</span>
                <div className="flex gap-8 items-center">
                  <span className="text-3xl font-bold text-slate-900">7 000 000 ₽</span>
                  <span className="text-lg font-semibold text-slate-700">18-23 недели</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Укрупненный расчет */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Icon name="Calculator" size={28} className="text-blue-600" />
              Укрупненный расчет стоимости
            </h3>
            
            <Card className="bg-slate-50 border-2 border-slate-200 p-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Объем здания</p>
                  <p className="text-3xl font-bold text-slate-900">14 325 м³</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-2">Общая стоимость</p>
                  <p className="text-3xl font-bold text-blue-600">7 000 000 ₽</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-2">Удельная стоимость</p>
                  <p className="text-3xl font-bold text-slate-900">488 ₽/м³</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Условия оплаты */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Icon name="Wallet" size={28} className="text-blue-600" />
              Условия оплаты
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { stage: "Аванс", percent: "40%", amount: "2 800 000", desc: "Начало работ (после подписания договора)", icon: "Play" },
                { stage: "Промежуточный платеж", percent: "40%", amount: "2 800 000", desc: "По завершении разработки проектной документации", icon: "PenTool" },
                { stage: "Окончательный расчет", percent: "20%", amount: "700 000", desc: "После полного согласования и передачи документации", icon: "CheckCircle" }
              ].map((payment, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <Icon name={payment.icon} size={32} className="mx-auto mb-3 text-blue-600" />
                    <h4 className="font-bold text-lg text-slate-900 mb-2">{payment.stage}</h4>
                    <p className="text-4xl font-bold text-blue-600 mb-2">{payment.percent}</p>
                    <p className="text-2xl font-semibold text-slate-900 mb-3">{payment.amount} ₽</p>
                    <p className="text-sm text-slate-600">{payment.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Результат работ */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Icon name="Package" size={28} className="text-blue-600" />
              Результат работ
            </h3>
            
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Техническое заключение по комплексному обследованию технического состояния здания</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Проектная документация в составе разделов АР, КР, ИОС, ПОС, разработанная в соответствии с Постановлением Правительства РФ №87, ГОСТ Р 21.101-2020 и требованиями Минобороны России</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Документация, согласованная с пользователем и эксплуатирующими организациями</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Передача Заказчику: 1 экземпляр на бумажном носителе, 1 экземпляр в электронном виде (формат .pdf и редактируемые форматы .dwg)</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Футер */}
          <div className="mt-16 pt-8 border-t-2 border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-600">Коммерческое предложение действительно 30 дней</p>
                <p className="text-sm text-slate-600">ООО «СППИ» | ИНН: 7801234567 | КПП: 780101001</p>
              </div>
              <Button
                onClick={() => navigate("/kazarma/roadmap")}
                size="lg"
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Icon name="Map" size={20} />
                Посмотреть дорожную карту
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KazarmaProposal;