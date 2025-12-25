import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, TableOfContents, PageBreak, convertInchesToTwip } from 'docx';
import { saveAs } from 'file-saver';

export const exportRoadmapToWord = async () => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: 'Дорожная карта проекта',
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        new Paragraph({
          text: 'Реконструкция Гидроузлов №7 и №8 Канала имени Москвы',
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: 'Январь — Август 2026',
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: 'Исполнитель: ',
              bold: true,
            }),
            new TextRun('ООО «Санкт-Петербургский проектный институт»'),
          ],
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Заказчик: ',
              bold: true,
            }),
            new TextRun('ООО «ЮГДОРПРОЕКТ»'),
          ],
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'Оглавление',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          pageBreakBefore: true,
        }),
        new TableOfContents('Оглавление', {
          hyperlink: true,
          headingStyleRange: '1-3',
        }),

        new Paragraph({
          text: 'Обзор проекта',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Цель проекта',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: 'Разработка полного комплекта проектной документации для реконструкции гидроузлов №7 и №8 канала №294 с получением положительного заключения государственной экспертизы',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Уникальность проекта',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: 'Первая комплексная реконструкция крупных гидротехнических сооружений Канала им. Москвы за последние 40 лет с применением современных технологий BIM и цифрового моделирования',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Ключевые показатели',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• 2 гидроузла',
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: '• 15 разделов проектной документации',
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: '• 350+ чертежей',
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: '• 4 500+ страниц документации',
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'Ключевые участники проекта',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'ООО «Санкт-Петербургский проектный институт»',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: 'Роль и ответственность:',
          bold: true,
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: '• Разработка проектной документации',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Координация всех разделов проекта',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Техническое сопровождение экспертизы',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'ООО «ЮГДОРПРОЕКТ»',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: 'Роль и ответственность:',
          bold: true,
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: '• Заказчик проектной документации',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Финансирование работ',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Контроль исполнения контракта',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'ФГБУ «Канал имени Москвы»',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: 'Роль и ответственность:',
          bold: true,
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: '• Эксплуатирующая организация',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Предоставление исходных данных',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Техническое согласование решений',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Государственная экспертиза',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: 'Роль и ответственность:',
          bold: true,
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: '• Проверка соответствия нормам',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Оценка безопасности решений',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Выдача заключения экспертизы',
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'Фаза 1: Январь 2026 — Подготовительный этап',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Длительность: 4 недели',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Организационные мероприятия',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Формирование проектной команды (120+ специалистов)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Разработка календарного плана-графика',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Получение исходно-разрешительной документации',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Изыскательские работы',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Геодезические изыскания с БПЛА',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Инженерно-геологические исследования (15+ скважин)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Обследование существующих конструкций',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Сбор исходных данных',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Архивные материалы (чертежи 1937 года)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Эксплуатационные данные (20 лет наблюдений)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Климатические данные (метеорология, гидрология)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Всего собрано: 500+ документов',
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'Фаза 2: Февраль 2026 — Концептуальное проектирование',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Разработка вариантов',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Варианты реконструкции камер шлюзов',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Системы опорожнения и наполнения',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Гидравлическое моделирование',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Разработано: 5 вариантов решений',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Технико-экономическое обоснование',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Сравнительный анализ вариантов',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Предварительные сметы',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Выбор оптимального решения',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Использовано: 100+ критериев оценки',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Согласование с заказчиком',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: 'Презентация концепции заказчику и эксплуатирующей организации для получения принципиального одобрения решений. Проведено 3 раунда согласований.',
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'Фаза 3: Март-Апрель 2026 — Основное проектирование',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Архитектурно-строительный раздел',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Детальные чертежи конструкций',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Армирование и спецификации',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Узлы и детали',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Подготовлено: 150+ чертежей АС',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Электротехнический раздел',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Системы электроснабжения',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Автоматизация управления затворами',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Освещение и сигнализация',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Подготовлено: 80+ схем ЭМ',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Инженерные системы',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Водоснабжение (питьевое и техническое)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Водоотведение (бытовое и производственное)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Дренаж (понижение УГВ)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Отопление и вентиляция служебных помещений',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Подготовлено: 120+ чертежей ВК',
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'Фаза 4: Май-Июнь 2026 — Завершение разработки ПД',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Пояснительная записка',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Обоснование принятых решений',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Расчёты и моделирование',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Нормативное обоснование',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Объем: 800+ страниц текста',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Сметная документация',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Локальные сметные расчёты',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Объектные и сводные сметы',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Индексация цен',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Подготовлено: 250+ позиций смет',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Специальные разделы',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Охрана окружающей среды (ООС, ПМООС)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Пожарная безопасность (Раздел ПБ)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• ИТМ ГО и ЧС (Гражданская оборона)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Организация строительства (ПОС, календарный план)',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Всего разработано: 15 разделов ПД',
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'Фаза 5: Июль-Август 2026 — Экспертиза и утверждение',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          pageBreakBefore: true,
        }),

        new Paragraph({
          text: 'Внутренняя проверка',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Нормоконтроль всех разделов',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Проверка комплектности',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Устранение замечаний',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Выполнено: 3 уровня контроля',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Подача на экспертизу',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: '• Формирование комплекта документов',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Загрузка в ЕГРЗ',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Ответы на вопросы экспертов',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: '• Срок экспертизы: 45 дней',
          spacing: { after: 200 },
        }),

        new Paragraph({
          text: 'Положительное заключение',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: 'Получение положительного заключения государственной экспертизы — финальный этап разработки проектной документации. После этого документация готова для начала строительно-монтажных работ.',
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: 'Готовность к реализации: 100%',
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'Заключение',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          pageBreakBefore: true,
        }),
        new Paragraph({
          text: 'Проект реконструкции гидроузлов №7 и №8 Канала имени Москвы представляет собой масштабное инженерное мероприятие, направленное на модернизацию критически важной инфраструктуры водного транспорта.',
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: 'Реализация проекта в установленные сроки позволит обеспечить безопасную эксплуатацию гидротехнических сооружений на десятилетия вперёд и поддержать бесперебойное функционирование Канала имени Москвы.',
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: 'ООО «Санкт-Петербургский проектный институт»',
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 100 },
        }),
        new Paragraph({
          text: 'Экспертиза в проектировании гидротехнических сооружений с 2005 года',
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: '120+ специалистов • 500+ реализованных проектов',
          alignment: AlignmentType.CENTER,
        }),
      ],
    }],
  });

  const blob = await doc.getBlob();
  saveAs(blob, 'Дорожная_карта_проекта.docx');
};
