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
                  text: '36,2 %',
                },
                {
                  label: 'Общее число публикаций за период 2016-2020 (Scopus)',
                  icon: 'book-open-blank-variant',
                  text: '3138 шт.',
                },
                {
                  label: 'Общее число цитирований за период 2016-2020 (Scopus)',
                  icon: 'book-open-blank-variant',
                  text: '11926 шт.',
                },
                {
                  label: 'Число публикаций отнесенных к QI и QII (Scopus)',
                  icon: 'book-open-blank-variant',
                  text: '210.976 шт.',
                },
                {
                  label: 'Число публикаций типов «Article» и «Review» (Scopus)',
                  icon: 'book-open-blank-variant',
                  text: '583.611 шт.',
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
                  value: 88.51,
                },
                {
                  label: 'Контракт',
                  value: 11.49,
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
                  value: 3.93,
                },
                {
                  label: 'Граждане РФ',
                  value: 96.07,
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
                  values: [74.17, 75.88, 77.9, 81.39, 79.44],
                },
                {
                  label: ' Средний балл ЕГЭ – студенты (Контракт)',
                  values: [62.13, 62.81, 64.55, 66.36, 70.33],
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
                  value: 46.63,
                },
                {
                  label: 'Специалитет',
                  value: 41.38,
                },
                {
                  label: 'Магистратура',
                  value: 8.11,
                },
                {
                  label: 'Кадры высшей квалификации',
                  value: 3.88,
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
                  value: 48.48,
                },
                {
                  label: 'Специалитет',
                  value: 39.09,
                },
                {
                  label: 'Кадры высшей квалификации ',
                  value: 1.52,
                },
                {
                  label: 'Магистратура',
                  value: 10.91,
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
                  value: 0,
                },
                {
                  label: 'Инженерные науки',
                  value: 94.5,
                },
                {
                  label: 'Здравоохранение и медицинские науки',
                  value: 0,
                },
                {
                  label: 'Образование и педагогические науки',
                  value: 0,
                },
                {
                  label: 'Гуманитарные науки',
                  value: 0,
                },
                {
                  label: 'Математические и естественные науки',
                  value: 1.64,
                },
                {
                  label: 'Науки об обществе',
                  value: 3.87,
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
                  value: 16.85,
                },
                {
                  label: 'Кандидаты наук',
                  value: 76.4,
                },
                {
                  label: 'Без степени',
                  value: 6.74,
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
                  value: 11.4,
                },
                {
                  label: 'Граждане РФ',
                  value: 88.6,
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
            component: 'ChartLine',
            props: {
              showPercent: false,
              showLegendValue: false,
              reverse: true,
              title:
                'Динамика университета в международных институциональных рейтингах',
              labels: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
              items: [
                {
                  label: 'THE',
                  values: [
                    'NaN',
                    'NaN',
                    'NaN',
                    'NaN',
                    'NaN',
                    'NaN',
                    801,
                    401,
                    401,
                  ],
                },
                {
                  label: 'QS',
                  values: [
                    'NaN',
                    'NaN',
                    'NaN',
                    'NaN',
                    'NaN',
                    'NaN',
                    'NaN',
                    'NaN',
                    1001,
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        models: [
          {
            component: 'DataTable',
            props: {
              title:
                'Динамика университета в международных институциональных рейтингах',
              headers: [
                {
                  text: 'Рейтинг',
                  value: 'rating',
                },
                {
                  text: 2013,
                  value: 'Y2013',
                },
                {
                  text: 2014,
                  value: 'Y2014',
                },
                {
                  text: 2015,
                  value: 'Y2015',
                },
                {
                  text: 2016,
                  value: 'Y2016',
                },
                {
                  text: 2017,
                  value: 'Y2017',
                },
                {
                  text: 2018,
                  value: 'Y2018',
                },
                {
                  text: 2019,
                  value: 'Y2019',
                },
                {
                  text: 2020,
                  value: 'Y2020',
                },
                {
                  text: 2021,
                  value: 'Y2021',
                },
              ],
              items: [
                {
                  Y2016: 51,
                  Y2017: 15,
                  Y2018: 16,
                  Y2019: 19,
                  Y2020: 18,
                  rating: 'Engineering - Mineral & Mining',
                  category: 'QS',
                },
                {
                  Y2021: 12,
                  rating: 'Engineering, Mineral & Mining',
                  category: 'QS',
                },
                {
                  Y2021: 101,
                  rating: 'Engineering, Petroleum',
                  category: 'QS',
                },
                {
                  Y2019: 601,
                  Y2020: 301,
                  rating: 'Engineering & Technology',
                  category: 'THE',
                },
                {
                  Y2019: 501,
                  Y2020: 251,
                  rating: 'Physical Sciences',
                  category: 'THE',
                },
              ],
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
                  value: 47.7,
                },
                {
                  label: 'Бюджет субъекта РФ',
                  value: 0,
                },
                {
                  label: 'Местный бюджет и внебюджетные средства',
                  value: 52.3,
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
                  value: 59.85,
                },
                {
                  label:
                    'Внебюджетные доходы, связанные с выполнением НИР и ОКР, а также оказания услуг',
                  value: 34.35,
                },
                {
                  label:
                    'Внебюджетные доходы от образовательной деятельности (внебюджетные)',
                  value: 5.8,
                },
              ],
            },
          },
          {
            component: 'ChartRadar',
            props: {
              title:
                'Численность работников университета по категориям персонала',
              items: [
                {
                  label: 'НР и инженерно-технический персонал',
                  value: 11.7,
                },
                {
                  label: 'ППС',
                  value: 34.53,
                },
                {
                  label:
                    'Административно-хозяйственный, производственный и прочий персонал',
                  value: 53.77,
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
