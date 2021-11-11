export default [
  {
    name: 'Научно-исследовательская политика',
    rows: [
      {
        title: '',
        models: [
          {
            component: 'Categories',
            props: {
              fillWidth: true,
              items: [
                {
                  label:
                    'Удельный вес финансового обеспечения университета от НИОКР в общих доходах университета за последний отчетный период',
                  icon: 'book-open-blank-variant',
                  text: '7,7 %',
                },
                {
                  label: 'Общее число публикаций за период 2016-2020 (Scopus)',
                  icon: 'book-open-blank-variant',
                  text: '207 шт.',
                },
                {
                  label: 'Общее число цитирований за период 2016-2020 (Scopus)',
                  icon: 'book-open-blank-variant',
                  text: '255 шт.',
                },
                {
                  label: 'Число публикаций отнесенных к QI и QII (Scopus)',
                  icon: 'book-open-blank-variant',
                  text: '11.938 шт.',
                },
                {
                  label: 'Число публикаций типов «Article» и «Review» (Scopus)',
                  icon: 'book-open-blank-variant',
                  text: '33.895 шт.',
                },
              ],
            },
          },
        ],
      },
    ],
    id: '1',
  },
  {
    name: 'Образовательная политика',
    rows: [
      {
        title: '',
        models: [
          {
            component: 'ChartDoughnut',
            props: {
              title: 'Численность обучающихся (очно)',
              showPercent: true,
              items: [
                {
                  label: 'Бюджет',
                  value: 52.61,
                },
                {
                  label: 'Контракт',
                  value: 47.39,
                },
              ],
            },
          },
          {
            component: 'ChartDoughnut',
            props: {
              title: 'Доля иностранных обучающихся (очно)',
              showPercent: true,
              items: [
                {
                  label: 'Иностранные граждане',
                  value: 37.43,
                },
                {
                  label: 'Граждане РФ',
                  value: 62.57,
                },
              ],
            },
          },
        ],
      },
      {
        models: [
          {
            component: 'ChartLine',
            props: {
              showPercent: false,
              showLegendValue: false,
              title: 'Средний балл ЕГЭ',
              labels: [2016, 2017, 2018, 2019, 2020],
              items: [
                {
                  label: 'Средний балл ЕГЭ – студенты (Бюджет)',
                  values: [60.76, 61.82, 64.12, 63.47, 64.91],
                },
                {
                  label: ' Средний балл ЕГЭ – студенты (Контракт)',
                  values: [55.46, 55.22, 57.03, 57.25, 59.19],
                },
              ],
            },
          },
        ],
      },
      {
        title: '',
        models: [
          {
            component: 'ChartDoughnut',
            props: {
              title: 'Численность обучающихся по уровням образования (очно)',
              showPercent: true,
              items: [
                {
                  label: 'Бакалавриат',
                  value: 90.9,
                },
                {
                  label: 'Специалитет',
                  value: 0.56,
                },
                {
                  label: 'Магистратура',
                  value: 7.55,
                },
                {
                  label: 'Кадры высшей квалификации',
                  value: 0.99,
                },
              ],
            },
          },
          {
            component: 'ChartDoughnut',
            props: {
              title:
                ' Численность иностранных обучающихся по уровням образования на условиях общего приема (очно)',
              showPercent: true,
              items: [
                {
                  label: 'Бакалавриат',
                  value: 95.32,
                },
                {
                  label: 'Специалитет',
                  value: 0,
                },
                {
                  label: 'Магистратура',
                  value: 4.27,
                },
                {
                  label: 'Кадры высшей квалификации ',
                  value: 0.4,
                },
              ],
            },
          },
        ],
      },
      {
        models: [
          {
            component: 'ChartDoughnut',
            props: {
              title:
                'Численность обучающихся по отраслям знаний (приведенный контингент)',
              showPercent: true,
              items: [
                {
                  label: 'Сельскохозяйственные науки',
                  value: 0,
                },
                {
                  label: 'Искусство и культура',
                  value: 1.11,
                },
                {
                  label: 'Образование и педагогические науки',
                  value: 39.59,
                },
                {
                  label: 'Инженерные науки',
                  value: 6.9,
                },
                {
                  label: 'Здравоохранение и медицинские науки',
                  value: 0,
                },
                {
                  label: 'Гуманитарные науки',
                  value: 12.23,
                },
                {
                  label: 'Математические и естественные науки',
                  value: 11.33,
                },
                {
                  label: 'Науки об обществе',
                  value: 28.84,
                },
              ],
            },
          },
        ],
      },
      {
        title: '',
        models: [
          {
            component: 'ChartDoughnut',
            props: {
              title:
                'Сведения об ученых степенях профессорско-преподавательского состава',
              showPercent: true,
              items: [
                {
                  label: 'Доктора наук',
                  value: 15.52,
                },
                {
                  label: 'Кандидаты наук',
                  value: 71.84,
                },
                {
                  label: 'Без степени',
                  value: 12.64,
                },
              ],
            },
          },
          {
            component: 'ChartDoughnut',
            props: {
              title: 'Профессорско-преподавательский состав',
              showPercent: true,
              items: [
                {
                  label: 'Иностранные граждане',
                  value: 0,
                },
                {
                  label: 'Граждане РФ',
                  value: 100,
                },
              ],
            },
          },
        ],
      },
    ],
    id: '2',
  },
  {
    name: 'Глобальная конкурентоспособность',
    rows: [
      {
        models: [
          {
            component: 'Content',
            props: {
              content:
                '<strong>Университет не представлен в международных рейтингах QS, THE, ARWU.</strong>',
            },
          },
        ],
      },
    ],
    id: '3',
  },
  {
    name: 'Качество системы управления',
    rows: [
      {
        models: [
          {
            component: 'ChartStacked',
            props: {
              title: 'Бюджет университета',
              showPercent: true,
              items: [
                {
                  label: 'Федеральный бюджет',
                  value: 60.04,
                },
                {
                  label: 'Бюджет субъекта РФ',
                  value: 0,
                },
                {
                  label: 'Местный бюджет и внебюджетные средства',
                  value: 39.96,
                },
              ],
            },
          },
        ],
      },
      {
        models: [
          {
            component: 'ChartRadar',
            props: {
              reference: true,
              title: 'Финансовая модель организации («Модель 40/30/30»)',
              items: [
                {
                  label: 'Бюджетное финансирование',
                  value: 47.51,
                },
                {
                  label:
                    'Внебюджетные доходы, связанные с выполнением НИР и ОКР, а также оказания услуг',
                  value: 2.33,
                },
                {
                  label:
                    'Внебюджетные доходы от образовательной деятельности (внебюджетные)',
                  value: 50.16,
                },
              ],
            },
          },
          {
            component: 'ChartRadar',
            props: {
              title:
                'Численность работников университета по категориям персонала',
              scales: [0, 100],
              items: [
                {
                  label: 'НР и инженерно-технический персонал',
                  value: 4.25,
                },
                {
                  label: 'ППС',
                  value: 51.03,
                },
                {
                  label:
                    'Административно-хозяйственный, производственный и прочий персонал',
                  value: 44.72,
                },
              ],
            },
          },
        ],
      },
    ],
    id: '4',
  },
]
