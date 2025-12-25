import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableCell, TableRow, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

const createTableCell = (text: string, bold: boolean = false) => {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, bold })] })],
  });
};

export const exportRoadmapToWord = async () => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: 'ДОРОЖНАЯ КАРТА ПРОЕКТА',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        
        new Paragraph({
          text: 'Реконструкция Гидроузлов №7 и №8',
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
        
        new Paragraph({
          text: 'Канала имени Москвы (канал №294)',
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),

        new Paragraph({
          text: 'Проектная документация ПП РФ №87',
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          italics: true,
        }),

        new Paragraph({
          text: 'Январь — Август 2026',
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'Основная информация',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createTableCell('Исполнитель', true),
                createTableCell('ООО «СППИ»'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Заказчик', true),
                createTableCell('ООО «ЮГДОРПРОЕКТ»'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Период реализации', true),
                createTableCell('Январь — Август 2026'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Длительность', true),
                createTableCell('32 недели (8 месяцев)'),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: 'Обзор проекта',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 600, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Цель проекта',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: 'Разработка полного комплекта проектной документации для реконструкции гидроузлов №7 и №8 канала №294 с получением положительного заключения государственной экспертизы.',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Уникальность проекта',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: 'Первая комплексная реконструкция крупных гидротехнических сооружений Канала им. Москвы за последние 40 лет с применением современных технологий BIM и цифрового моделирования.',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Ключевые показатели',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({ text: '• 2 гидроузла' }),
        new Paragraph({ text: '• 15 разделов проектной документации' }),
        new Paragraph({ text: '• 350+ чертежей' }),
        new Paragraph({ text: '• 4 500+ страниц документации', spacing: { after: 400 } }),

        new Paragraph({
          text: 'ЭТАП 1: Январь 2026 — Подготовительный этап',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 600, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Длительность: 4 недели (W1-W4)',
          spacing: { after: 200 },
          bold: true,
        }),

        new Paragraph({
          text: 'Организационные мероприятия',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createTableCell('№', true),
                createTableCell('Мероприятие', true),
                createTableCell('Срок', true),
                createTableCell('Ответственный', true),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('1.1'),
                createTableCell('Получение допуска от ФГБУ «Канал им. Москвы»'),
                createTableCell('W1-W2'),
                createTableCell('ГИП / ЮГДОРПРОЕКТ'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('1.2'),
                createTableCell('Анализ исходных данных и архивной документации'),
                createTableCell('W1-W2'),
                createTableCell('ГИП'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('1.3'),
                createTableCell('Инженерно-геодезические изыскания'),
                createTableCell('W2-W4'),
                createTableCell('Геодезический отдел'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('1.4'),
                createTableCell('Инженерно-геологические и гидрогеотехнические изыскания'),
                createTableCell('W2-W5'),
                createTableCell('Геологический отдел'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('1.5'),
                createTableCell('Водолазное обследование ГУ-7'),
                createTableCell('W2-W3'),
                createTableCell('Подрядчик (водолазы)'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('1.6'),
                createTableCell('Водолазное обследование ГУ-8'),
                createTableCell('W3-W4'),
                createTableCell('Подрядчик (водолазы)'),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: 'Запрос технических условий',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 100 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createTableCell('№', true),
                createTableCell('Мероприятие', true),
                createTableCell('Срок', true),
                createTableCell('Ответственный', true),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('1.7'),
                createTableCell('Запрос ТУ в ПАО «Россети» (ЛЭП)'),
                createTableCell('W1-W2'),
                createTableCell('Отдел электроснабжения'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('1.8'),
                createTableCell('Запрос ТУ в ПАО «Газпром» (газопровод)'),
                createTableCell('W1-W2'),
                createTableCell('Отдел газоснабжения'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('1.9'),
                createTableCell('Запрос ТУ на временное подключение стройплощадки'),
                createTableCell('W2-W3'),
                createTableCell('Отдел электроснабжения'),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: 'ЭТАП 2-3: Февраль-Апрель 2026 — Инженерные изыскания и проектирование',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 600, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Длительность: 12 недель (W5-W16)',
          spacing: { after: 200 },
          bold: true,
        }),

        new Paragraph({
          text: 'Гидравлические расчеты',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createTableCell('№', true),
                createTableCell('Расчет', true),
                createTableCell('Срок', true),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('2.1'),
                createTableCell('Гидравлические расчеты затворов и камер'),
                createTableCell('W5-W8'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('2.2'),
                createTableCell('Расчеты устойчивости и фильтрации'),
                createTableCell('W6-W9'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('2.3'),
                createTableCell('Прочностные расчеты конструкций'),
                createTableCell('W7-W10'),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: 'Разработка проектной документации (Раздел ПП РФ №87)',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 100 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createTableCell('№', true),
                createTableCell('Раздел', true),
                createTableCell('Срок', true),
                createTableCell('Ответственный', true),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('3.1'),
                createTableCell('Раздел 1. Пояснительная записка'),
                createTableCell('W9-W12'),
                createTableCell('ГИП'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('3.2'),
                createTableCell('Раздел 2. Схема планировочной организации'),
                createTableCell('W9-W12'),
                createTableCell('Архитектурный отдел'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('3.3'),
                createTableCell('Раздел 3. Архитектурные решения'),
                createTableCell('W10-W13'),
                createTableCell('Архитектурный отдел'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('3.4'),
                createTableCell('Раздел 4. Конструктивные решения ГТС'),
                createTableCell('W9-W14'),
                createTableCell('Конструкторский отдел ГТС'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('3.5'),
                createTableCell('Раздел 5. Инженерно-технические системы'),
                createTableCell('W11-W15'),
                createTableCell('Отделы ИТП'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('3.6'),
                createTableCell('Раздел 6. Проект организации строительства'),
                createTableCell('W13-W16'),
                createTableCell('Отдел технологии'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('3.7'),
                createTableCell('Раздел 8. ПМООС'),
                createTableCell('W10-W14'),
                createTableCell('Экологический отдел'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('3.8'),
                createTableCell('Раздел 9. Смета'),
                createTableCell('W14-W16'),
                createTableCell('Сметный отдел'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('3.9'),
                createTableCell('Раздел 10. Проект полосы отвода'),
                createTableCell('W12-W15'),
                createTableCell('Землеустроительный отдел'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('3.10'),
                createTableCell('Раздел 12. Декларация безопасности ГТС'),
                createTableCell('W13-W16'),
                createTableCell('Отдел ГТС'),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: 'ЭТАП 4: Май-Июнь 2026 — Государственная экспертиза',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 600, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Длительность: 8 недель (W17-W24)',
          spacing: { after: 200 },
          bold: true,
        }),

        new Paragraph({
          text: 'Прохождение экспертизы в ФАУ «Главгосэкспертиза России»',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createTableCell('№', true),
                createTableCell('Контрольная точка', true),
                createTableCell('Срок', true),
                createTableCell('Ответственный', true),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('4.1'),
                createTableCell('Предварительное согласование с ФГБУ «Канал им. Москвы»'),
                createTableCell('W17-W18'),
                createTableCell('ГИП / ЮГДОРПРОЕКТ'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('4.2'),
                createTableCell('Предварительное согласование с Росводресурсами'),
                createTableCell('W17-W19'),
                createTableCell('Эколог / ЮГДОРПРОЕКТ'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('4.3'),
                createTableCell('Согласование декларации безопасности с Ростехнадзором'),
                createTableCell('W17-W20'),
                createTableCell('Отдел ГТС / ЮГДОРПРОЕКТ'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('4.4'),
                createTableCell('Подготовка комплекта документов для экспертизы'),
                createTableCell('W19-W20'),
                createTableCell('ГИП'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('4.4A'),
                createTableCell('Привлечение организации для НТС ГТС I класса'),
                createTableCell('W19-W20'),
                createTableCell('ГИП / Организация НТС'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('4.5'),
                createTableCell('Подача документов в ГГЭ'),
                createTableCell('W20'),
                createTableCell('ГИП / ЮГДОРПРОЕКТ'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('4.6'),
                createTableCell('Рассмотрение документации в ГГЭ (45 раб. дней)'),
                createTableCell('W20-W29'),
                createTableCell('ФАУ ГГЭ России'),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: 'ЭТАП 5: Июль-Август 2026 — Устранение замечаний и завершение',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 600, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Длительность: 8 недель (W25-W32)',
          spacing: { after: 200 },
          bold: true,
        }),

        new Paragraph({
          text: 'Корректировка по замечаниям экспертизы',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createTableCell('№', true),
                createTableCell('Мероприятие', true),
                createTableCell('Срок', true),
                createTableCell('Ответственный', true),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('5.1'),
                createTableCell('Анализ замечаний экспертизы'),
                createTableCell('W28'),
                createTableCell('ГИП'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('5.2'),
                createTableCell('Устранение замечаний всеми отделами'),
                createTableCell('W28-W30'),
                createTableCell('Все профильные отделы'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('5.3'),
                createTableCell('Повторная подача в ГГЭ'),
                createTableCell('W30'),
                createTableCell('ГИП / ЮГДОРПРОЕКТ'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('5.4'),
                createTableCell('Получение положительного заключения ГГЭ'),
                createTableCell('W31-W32'),
                createTableCell('ФАУ ГГЭ России'),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: 'Разрешительная документация',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 100 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createTableCell('№', true),
                createTableCell('Мероприятие', true),
                createTableCell('Срок', true),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('5.5'),
                createTableCell('Получение разрешения на строительство'),
                createTableCell('W32'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('5.6'),
                createTableCell('Передача полного комплекта документации Заказчику'),
                createTableCell('W32'),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: 'Ключевые стейкхолдеры проекта',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 600, after: 200 },
          pageBreakBefore: true,
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createTableCell('Роль', true),
                createTableCell('Организация', true),
                createTableCell('Ответственность', true),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Генеральный проектировщик'),
                createTableCell('ООО «СППИ»'),
                createTableCell('Разработка ПД, управление проектом, координация работ'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Заказчик'),
                createTableCell('ООО «ЮГДОРПРОЕКТ»'),
                createTableCell('Финансирование проекта, утверждение решений, контроль сроков'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Эксплуатирующая организация'),
                createTableCell('ФГБУ «Канал имени Москвы»'),
                createTableCell('Предоставление исходных данных, техническое согласование решений'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Государственная экспертиза'),
                createTableCell('ФАУ «Главгосэкспертиза России»'),
                createTableCell('Экспертиза проектной документации, выдача заключения'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Ростехнадзор'),
                createTableCell('Федеральная служба по экологическому надзору'),
                createTableCell('Надзор за безопасностью ГТС, согласование декларации'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Росводресурсы'),
                createTableCell('Федеральное агентство водных ресурсов'),
                createTableCell('Согласование водохозяйственных решений'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Организация НТС'),
                createTableCell('Аккредитованная организация'),
                createTableCell('Научно-техническое сопровождение для ГТС I класса'),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: 'Критические риски и меры минимизации',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 600, after: 200 },
          pageBreakBefore: true,
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createTableCell('Риск', true),
                createTableCell('Вероятность', true),
                createTableCell('Меры минимизации', true),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Задержка выдачи ТУ от сетевых компаний'),
                createTableCell('Средняя'),
                createTableCell('Досрочная подача заявок, параллельная работа с запасными вариантами'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Замечания экспертизы, требующие существенной переработки'),
                createTableCell('Высокая'),
                createTableCell('Предварительное согласование решений, проведение НТС'),
              ],
            }),
            new TableRow({
              children: [
                createTableCell('Неблагоприятные погодные условия для изысканий'),
                createTableCell('Низкая'),
                createTableCell('Планирование работ на зимний период, резервные сроки'),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: '',
          spacing: { after: 600 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: '___________________________',
            }),
          ],
          spacing: { after: 100 },
        }),

        new Paragraph({
          text: 'Документ сформирован автоматически',
          italics: true,
          alignment: AlignmentType.CENTER,
        }),

        new Paragraph({
          text: 'ООО «СППИ»',
          italics: true,
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'Дорожная_карта_проекта.docx');
};