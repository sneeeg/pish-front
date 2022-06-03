module.exports = {
  id: 100, // id
  title:
    'Приоритет 2030 | Государственная программа поддержки университетов Российской Федерации', // Заголовок на вкладке
  metaTitle:
    'Приоритет 2030 | Государственная программа поддержки университетов Российской Федерации', // Мета заголовок
  metaDescription:
    'Цель программы — сформировать широкую группу университетов, которые станут лидерами в создании нового научного знания, технологий и разработок для внедрения в российскую экономику и социальную сферу.', // Мета описание
  ogVk: '', // Opengraph vk
  ogFb: '', // Opengraph fb
  firstScreen: {
    slides: [
      {
        src: '/i/main-first-diag.png',
        alt: 'diag',
        title: 'Улучшаем образование в регионах',
        description:
          'Статистика программы, данные об участниках <br> и проведенные мероприятия',
      },
      {
        src: '/i/main-first-diag.png',
        alt: 'diag',
        title: 'Улучшаем образование',
        description:
          'Статистика программы, данные об участниках и проведенные мероприятия lorem ipsum dolor.',
      },
    ],
  },
  cells: [
    {
      icon: 'council',
      text: 'Совет',
      description: 'Совет по поддержке программ развития',
      href: '/council',
    },
    {
      icon: 'commission',
      text: 'Комиссия',
      description:
        'Комиссия Минобрнауки РФ по отбору в программу Комиссия Минобрнауки РФ по отбору в программу Минобрнауки РФ',
      href: '/commission',
    },
    {
      icon: 'build',
      text: 'Аналитика',
      description: 'Статистические данные о ходе программы',
      href: '/analytics',
    },
    {
      icon: 'user',
      text: 'Этапы отбора',
      description: 'Помощь для университетов в 2022 году',
      href: '/about#steps',
    },
  ],
  programs: [
    {
      title: 'Программы развития дальневосточных вузов',
      description:
        'Открыт второй этап рассмотрения заявок на получение дотаций для вузов. В этапе принимают участия вузы из следующих регионов',
      image: 'i/new/program-image.png',
      href: '#',
    },
    {
      title: 'Программы развития дальневосточных вузов',
      description:
        'Открыт второй этап рассмотрения заявок на получение дотаций для вузов. В этапе принимают участия вузы из следующих регионов',
      href: '#',
    },
    {
      title: 'Программы развития дальневосточных вузов',
      description:
        'Открыт второй этап рассмотрения заявок на получение дотаций для вузов. В этапе принимают участия вузы из следующих регионов',
      href: '#',
    },
  ],
  links: [
    {
      href: '/participation',
      text: 'Как стать участником',
      icon: 'page-member',
    },
    {
      href: '/participation#requirements',
      text: 'Критерии',
      icon: 'page-docs',
    },
    {
      href: '/participation#steps',
      text: 'Этапы',
      icon: 'page-screen',
    },
    {
      href: '/participation#stats',
      text: 'Показатели',
      icon: 'page-pie',
    },
  ],
  sectionTitles: {
    members: 'Участники',
    events: 'Мероприятия',
    news: 'Новости',
  },
  posts: [
    {
      id: 1,
      slug: 'horoshaia_novost',
      tags: ['приоритет 2030', 'консорциум', 'партнерство', 'регионы'],
      activeFrom: '2020-12-09T16:09:53+00:00',
      title:
        'ЧГУ им. А. А. Кадырова и ВГЛТУ им. Г. Ф. Морозова рассчитают потенциал карбонового полигона',
      previewPicture: {
        src: '/i/posts/example-1.png',
        alt: 'test',
      },
    },
    {
      id: 2,
      slug: 'horoshaia_novost',
      tags: ['участники программы', 'регионы', 'технологии'],
      activeFrom: '2020-12-09T16:09:53+00:00',
      title: 'Изобретение поможет уменьшить количество мусора в Арктике',
      previewPicture: {
        src: '/i/posts/example-2.png',
        alt: 'test',
      },
    },
    {
      id: 3,
      slug: 'horoshaia_novost',
      tags: ['приоритет 2030', 'лидерство', 'участники программы'],
      activeFrom: '2020-12-09T16:09:53+00:00',
      title:
        'Образование с перспективой развития в университетах регионов России',
      previewPicture: {
        src: '/i/posts/example-3.png',
        alt: 'test',
      },
    },
  ],
  events: [
    {
      id: 1,
      title: 'График членов комиссии',
      body: [
        {
          title: 'Уральский Федеральный Университет им. Б. Ельцина',
          status: 1,
          dateStart: '2022-05-22',
          dateEnd: '2022-05-30',
          logo: '/i/new/events/logo-1.png',
          city: 'г. Москва',
          avatar: 'i/commission/example.jpg',
          council: 'Волков Андрей Евгеньевич',
        },
        {
          title:
            'Санкт-Петербургский национальный исследовательский университет информационных технологий, механики и оптики',
          status: 0,
          dateStart: '2022-05-19',
          dateEnd: '2022-05-22',
          logo: '/i/new/events/logo-2.png',
          city: 'г. Санкт-Петербург',
          avatar: 'i/commission/example.jpg',
          council: 'Афанасьев Дмитрий Владимирович',
        },
        {
          title:
            'Национальный исследовательский ядерный университет (Московский инженерно-физический институт)',
          status: 0,
          dateStart: '2022-06-10',
          dateEnd: '2022-06-17',
          logo: '/i/new/events/logo-3.png',
          city: 'г. Москва',
          avatar: 'i/commission/example.jpg',
          council: 'Омельчук Андрей Владимирович',
        },
        {
          title:
            'Национальный исследовательский ядерный университет (Московский инженерно-физический институт)',
          status: 0,
          dateStart: '2022-06-10',
          dateEnd: '2022-06-17',
          logo: '/i/new/events/logo-3.png',
          city: 'г. Москва',
          avatar: 'i/commission/example.jpg',
          council: 'Омельчук Андрей Владимирович',
        },
        {
          title:
            'Национальный исследовательский ядерный университет (Московский инженерно-физический институт)',
          status: 0,
          dateStart: '2022-06-10',
          dateEnd: '2022-06-17',
          logo: '/i/new/events/logo-3.png',
          city: 'г. Москва',
          avatar: 'i/commission/example.jpg',
          council: 'Омельчук Андрей Владимирович',
        },
      ],
    },
    {
      id: 2,
      title: 'Заседания',
      body: [
        {
          title: 'Заседание, посвященное программе',
          status: 1,
          date: '2022-05-18',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['заседание', 'минобрнауки'],
        },
        {
          title:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus minus molestiae nesciunt ratione saepe veritatis.',
          status: 2,
          date: '2022-05-19',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['заседание', 'минобрнауки'],
        },
        {
          title:
            'Заседание, посвященное программе, название которого в 2 строки',
          status: 3,
          date: '2022-04-23',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['заседание', 'минобрнауки'],
        },
        {
          title:
            'Заседание, посвященное программе, название которого в 2 строки',
          status: 3,
          date: '2022-04-23',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['заседание', 'минобрнауки'],
        },
        {
          title:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus minus molestiae nesciunt ratione saepe veritatis.',
          status: 2,
          date: '2022-05-19',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['заседание', 'минобрнауки'],
        },
      ],
    },
    {
      id: 3,
      title: 'Совещания',
      body: [
        {
          title: 'Совещание, посвященное программе',
          status: 1,
          date: '2022-06-15',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['совещание', 'минобрнауки'],
        },
        {
          title:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus minus molestiae nesciunt ratione saepe veritatis.',
          status: 2,
          date: '2022-05-20',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['совещание', 'минобрнауки'],
        },
        {
          title:
            'Совещание, посвященное программе, название которого в 2 строки',
          status: 3,
          date: '2022-05-23',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['совещание', 'минобрнауки'],
        },
        {
          title:
            'Совещание, посвященное программе, название которого в 2 строки',
          status: 3,
          date: '2022-05-23',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['совещание', 'минобрнауки'],
        },
      ],
    },
  ],
  members: [
    {
      id: 1,
      title: 'По регионам',
      body: [
        {
          title: 'Уральский Федеральный Университет им. Б. Ельцина',
          status: 1,
          dateStart: '2022-05-22',
          dateEnd: '2022-05-30',
          logo: '/i/new/events/logo-1.png',
          city: 'г. Москва',
          avatar: 'i/commission/example.jpg',
          council: 'Волков Андрей Евгеньевич',
        },
        {
          title:
            'Санкт-Петербургский национальный исследовательский университет информационных технологий, механики и оптики',
          status: 0,
          dateStart: '2022-05-19',
          dateEnd: '2022-05-22',
          logo: '/i/new/events/logo-2.png',
          city: 'г. Санкт-Петербург',
          avatar: 'i/commission/example.jpg',
          council: 'Афанасьев Дмитрий Владимирович',
        },
        {
          title:
            'Национальный исследовательский ядерный университет (Московский инженерно-физический институт)',
          status: 0,
          dateStart: '2022-06-10',
          dateEnd: '2022-06-17',
          logo: '/i/new/events/logo-3.png',
          city: 'г. Москва',
          avatar: 'i/commission/example.jpg',
          council: 'Омельчук Андрей Владимирович',
        },
      ],
    },
    {
      id: 2,
      title: 'По учредителям',
      body: [
        {
          title: 'Заседание, посвященное программе',
          status: 1,
          date: '2022-05-18',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['заседание', 'минобрнауки'],
        },
        {
          title:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus minus molestiae nesciunt ratione saepe veritatis.',
          status: 2,
          date: '2022-05-19',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['заседание', 'минобрнауки'],
        },
        {
          title:
            'Заседание, посвященное программе, название которого в 2 строки',
          status: 3,
          date: '2022-04-23',
          timeStart: '15:00',
          timeEnd: '17:00',
          city: 'г. Москва, Брюсов пер., д.21',
          tags: ['заседание', 'минобрнауки'],
        },
      ],
    },
  ],
}
