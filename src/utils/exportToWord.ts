import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableCell, TableRow, WidthType, TableOfContents } from 'docx';
import { saveAs } from 'file-saver';

export const exportRoadmapToWord = async () => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: 'ДОРОЖНАЯ КАРТА ПРОЕКТА',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        
        new Paragraph({
          text: 'Реконструкция Гидроузлов №7 и №8',
          heading: HeadingLevel.HEADING_2,
          alignment: AlignmentType.CENTER,
        }),
        
        new Paragraph({
          text: 'Канала имени Москвы (канал №294)',
          heading: HeadingLevel.HEADING_2,
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
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Исполнитель', bold: true })] })] }),
                new TableCell({ children: [new Paragraph('ООО «СППИ»')] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Заказчик', bold: true })] })] }),
                new TableCell({ children: [new Paragraph('ООО «ЮГДОРПРОЕКТ»')] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Период', bold: true })] })] }),
                new TableCell({ children: [new Paragraph('Январь — Август 2026')] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Длительность', bold: true })] })] }),
                new TableCell({ children: [new Paragraph('32 недели (8 месяцев)')] }),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: 'Контроль прогресса',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 600, after: 200 },
        }),

        new Paragraph({
          text: 'Дорожная карта актуализируется по мере выполнения работ. Заказчик имеет возможность отслеживать статус проекта в реальном времени.',
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'Этапы согласования',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 600, after: 200 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '№', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Этап', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Статус', bold: true })] })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('1')] }),
                new TableCell({ children: [new Paragraph('Согласование коммерческого предложения')] }),
                new TableCell({ children: [new Paragraph('✓ Завершено')] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('2')] }),
                new TableCell({ children: [new Paragraph('Согласование дорожной карты')] }),
                new TableCell({ children: [new Paragraph('→ В процессе')] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('3')] }),
                new TableCell({ children: [new Paragraph('Согласование договора')] }),
                new TableCell({ children: [new Paragraph('○ Ожидается')] }),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: 'Производственные этапы',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 600, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Этап 1: Январь 2026 — Инициация и планирование',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 100 },
        }),
        new Paragraph({ text: '• Заключение договора и начало работ' }),
        new Paragraph({ text: '• Сбор и анализ исходных данных' }),
        new Paragraph({ text: '• Разработка ТЗ на инженерные изыскания' }),
        new Paragraph({ text: '• Оформление допусков к работам', spacing: { after: 200 } }),

        new Paragraph({
          text: 'Этап 2: Февраль 2026 — Инженерные изыскания',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 100 },
        }),
        new Paragraph({ text: '• Инженерно-геологические изыскания' }),
        new Paragraph({ text: '• Инженерно-гидрометеорологические изыскания' }),
        new Paragraph({ text: '• Инженерно-экологические изыскания' }),
        new Paragraph({ text: '• Топографическая съемка', spacing: { after: 200 } }),

        new Paragraph({
          text: 'Этап 3: Март-Апрель 2026 — Проектная документация (Часть 1)',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 100 },
        }),
        new Paragraph({ text: '• Разработка архитектурных решений' }),
        new Paragraph({ text: '• Конструктивные решения гидросооружений' }),
        new Paragraph({ text: '• Гидравлические расчеты' }),
        new Paragraph({ text: '• Расчеты устойчивости и прочности', spacing: { after: 200 } }),

        new Paragraph({
          text: 'Этап 4: Май 2026 — Проектная документация (Часть 2)',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 100 },
        }),
        new Paragraph({ text: '• Проект организации строительства' }),
        new Paragraph({ text: '• Инженерные системы и сети' }),
        new Paragraph({ text: '• Автоматизация управления' }),
        new Paragraph({ text: '• Смета и ПОС', spacing: { after: 200 } }),

        new Paragraph({
          text: 'Этап 5: Июнь 2026 — НТС и подготовка к экспертизе',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 100 },
        }),
        new Paragraph({ text: '• Привлечение организации для проведения НТС для ГТС I класса' }),
        new Paragraph({ text: '• Работа с организацией по научно-техническому сопровождению' }),
        new Paragraph({ text: '• Подготовка документов для государственной экспертизы' }),
        new Paragraph({ text: '• Подача ПД в экспертизу', spacing: { after: 200 } }),

        new Paragraph({
          text: 'Этап 6: Июль 2026 — Экспертиза проекта',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 100 },
        }),
        new Paragraph({ text: '• Проведение государственной экспертизы' }),
        new Paragraph({ text: '• Ответы на замечания экспертизы' }),
        new Paragraph({ text: '• Получение положительного заключения' }),
        new Paragraph({ text: '• Корректировка документации по замечаниям', spacing: { after: 200 } }),

        new Paragraph({
          text: 'Этап 7: Август 2026 (1-15) — Утверждение',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 100 },
        }),
        new Paragraph({ text: '• Окончательное утверждение проекта' }),
        new Paragraph({ text: '• Получение всех необходимых согласований' }),
        new Paragraph({ text: '• Передача документации Заказчику (1 этап)', spacing: { after: 200 } }),

        new Paragraph({
          text: 'Этап 8: Август 2026 (15-31) — Завершение',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 100 },
        }),
        new Paragraph({ text: '• Комплектация итоговых материалов' }),
        new Paragraph({ text: '• Передача полного комплекта документации' }),
        new Paragraph({ text: '• Подписание актов выполненных работ' }),
        new Paragraph({ text: '• Закрытие проекта', spacing: { after: 400 } }),

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
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Роль', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Организация', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ответственность', bold: true })] })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('Генеральный проектировщик')] }),
                new TableCell({ children: [new Paragraph('ООО «СППИ»')] }),
                new TableCell({ children: [new Paragraph('Разработка ПД, управление проектом')] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('Заказчик')] }),
                new TableCell({ children: [new Paragraph('ООО «ЮГДОРПРОЕКТ»')] }),
                new TableCell({ children: [new Paragraph('Финансирование, утверждение решений')] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('Эксплуатирующая организация')] }),
                new TableCell({ children: [new Paragraph('ФГБУ «Канал имени Москвы»')] }),
                new TableCell({ children: [new Paragraph('Техническое согласование, исходные данные')] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('Государственная экспертиза')] }),
                new TableCell({ children: [new Paragraph('ФАУ «Главгосэкспертиза России»')] }),
                new TableCell({ children: [new Paragraph('Экспертиза проектной документации')] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('Ростехнадзор')] }),
                new TableCell({ children: [new Paragraph('Федеральная служба')] }),
                new TableCell({ children: [new Paragraph('Надзор за соблюдением требований')] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('Организация НТС')] }),
                new TableCell({ children: [new Paragraph('Аккредитованная организация')] }),
                new TableCell({ children: [new Paragraph('Научно-техническое сопровождение для ГТС I класса')] }),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: '',
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'Документ сформирован автоматически из дорожной карты проекта',
          italics: true,
          alignment: AlignmentType.CENTER,
          spacing: { before: 600 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: 'ООО «Санкт-Петербургский проектный институт»',
              italics: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'Дорожная_карта_проекта.docx');
};
