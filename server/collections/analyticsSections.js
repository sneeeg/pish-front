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
      {
        models: [
          {
            component: 'ChartPie',
            props: {
              title: 'Публикации в Scopus по предметным областям (ТОП-10), шт',
              showPercent: true,
              items: [
                {
                  label: 'Сельскохозяйственные и биологические науки',
                  value: 24,
                },
                {
                  label: 'Науки об обществе',
                  value: 40,
                },
                {
                  label: 'Науки об окружающей среде',
                  value: 17,
                },
                {
                  label: 'Гуманитарные науки и искусство',
                  value: 18,
                },
                {
                  label: 'Инженерные науки',
                  value: 42,
                },
                {
                  label: 'Компьютерные науки',
                  value: 34,
                },
                {
                  label: 'Математика',
                  value: 69,
                },
                {
                  label: 'Энергетика',
                  value: 16,
                },
                {
                  label: 'Управление, бизнес, учёт',
                  value: 12,
                },
                {
                  label: 'Экономика и финансы',
                  value: 14,
                },
              ],
            },
          },
        ],
      },
      {
        models: [
          {
            component: 'ChartPie',
            props: {
              title: 'Доля публикаций (Scopus) по типам сотрудничества, %',
              showPercent: true,
              items: [
                {
                  label: 'Международное сотрудничество',
                  value: 11.6,
                },
                {
                  label: 'Национальное сотрудничество',
                  value: 62.3,
                },
                {
                  label: 'Институциональное сотрудничество',
                  value: 21.3,
                },
                {
                  label: 'Без сотрудничества (один автор)',
                  value: 4.8,
                },
              ],
            },
          },
        ],
      },
      {
        title:
          'Ведущие страны-партнеры по количеству публикаций в соавторстве с университетом (ТОП 5)',
        models: [
          {
            component: 'DataTable',
            props: {
              headers: [
                {
                  text: 'Страна',
                  value: 'country',
                },
                {
                  text: 'Число публикаций',
                  value: 'publish',
                },
              ],
              items: [
                {
                  country: 'США',
                  publish: 9,
                },
                {
                  country: 'Швейцария',
                  publish: 7,
                },
                {
                  country: 'Франция',
                  publish: 4,
                },
                {
                  country: 'Китай',
                  publish: 4,
                },
                {
                  country: 'Австрия',
                  publish: 2,
                },
              ],
            },
          },
        ],
      },
      {
        title:
          'Ведущие организации-партнеры по количеству публикаций в соавторстве с университетом (ТОП 10)',
        models: [
          {
            component: 'DataTable',
            props: {
              headers: [
                {
                  text: 'Организация',
                  value: 'country',
                },
                {
                  text: 'Число публикаций',
                  value: 'publish',
                },
              ],
              items: [
                {
                  country: 'Moscow Institute of Physics and Technology',
                  publish: 57,
                },
                {
                  country: 'Lomonosov Moscow State University',
                  publish: 27,
                },
                {
                  country: 'Buryat State University',
                  publish: 20,
                },
                {
                  country: 'Kuban State Agrarian University',
                  publish: 19,
                },
                {
                  country: 'Russian Academy of Sciences',
                  publish: 15,
                },
                {
                  country:
                    'Institute for Information Transmission Problems of the Russian Academy of Sciences',
                  publish: 14,
                },
                {
                  country:
                    'Russian Presidential Academy of National Economy and Public Administration',
                  publish: 11,
                },
                {
                  country: 'Saint Petersburg State University',
                  publish: 10,
                },
                {
                  country:
                    'National Research University Higher School of Economics',
                  publish: 10,
                },
                {
                  country: 'Kuban State University',
                  publish: 9,
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
              title: 'Численность обучающихся (очно), чел',
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
              title:
                'Численность обучающихся по уровням образования (очно), чел',
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
        ],
      },
      {
        title: '',
        models: [
          {
            component: 'ChartDoughnut',
            props: {
              title: 'Доля иностранных обучающихся (очно), чел',
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
          {
            component: 'ChartDoughnut',
            props: {
              title:
                ' Численность иностранных обучающихся по уровням образования на условиях общего приема (очно), чел',
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
                  label: 'Кадры высшей квалификации ',
                  value: 0.4,
                },
                {
                  label: 'Магистратура',
                  value: 4.27,
                },
              ],
            },
          },
        ],
      },
      {
        models: [
          {
            component: 'ChartPie',
            props: {
              title:
                'Численность обучающихся по отраслям знаний (приведенный контингент), чел',
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
                  label: 'Инженерные науки',
                  value: 6.9,
                },
                {
                  label: 'Здравоохранение и медицинские науки',
                  value: 0,
                },
                {
                  label: 'Образование и педагогические науки',
                  value: 39.59,
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
              title: 'Профессорско-преподавательский состав, чел',
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
          {
            component: 'ChartDoughnut',
            props: {
              title:
                'Сведения об ученых степенях профессорско-преподавательского состава, чел',
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
            component: 'ChartPie',
            props: {
              title: 'Бюджет университета, тыс. рублей',
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
            component: 'ChartLine',
            props: {
              showPercent: false,
              showLegendValue: false,
              title: 'Объем поступивших средств, тыс. рублей',
              hideLegend: true,
              labels: [2016, 2017, 2018, 2019, 2020],
              items: [
                {
                  label: 'ОбъемПоступившихСредств',
                  values: [760364.6, 741335, 853545, 959226.6, 1028703.9],
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
              title:
                'Финансовая модель организации («Модель 40/30/30»), тыс. рублей',
              items: [
                {
                  label: 'Бюджетное финансирование',
                  value: null,
                },
                {
                  label:
                    'Внебюджетные доходы, связанные с выполнением НИР и ОКР, а также оказания услуг',
                  value: null,
                },
                {
                  label:
                    'Внебюджетные доходы от образовательной деятельности (внебюджетные)',
                  value: null,
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
              title:
                'Численность работников университета по категориям персонала, чел.',
              items: [
                {
                  label: 'НР и инженерно-технический персонал',
                  value: null,
                },
                {
                  label: 'ППС',
                  value: null,
                },
                {
                  label:
                    'Административно-хозяйственный, производственный и прочий персонал',
                  value: null,
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
