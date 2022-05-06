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
    cells: [
      {
        icon: 'council',
        text: 'Совет',
        counter: false,
        href: '/council',
      },
      {
        icon: 'commission',
        text: 'Комиссия',
        counter: false,
        href: '/commission',
      },
      {
        icon: 'build',
        text: 'Аналитика программы',
        counter: false,
        href: '/analytics',
      },
      {
        icon: 'user',
        text: 'Этапы отбора в&nbsp;2021&nbsp;году',
        counter: false,
        href: '/about#steps',
      },
    ],
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
      counter: false,
      href: '/council',
    },
    {
      icon: 'commission',
      text: 'Комиссия',
      description: 'Комиссия Минобрнауки РФ по отбору в программу',
      counter: false,
      href: '/commission',
    },
    {
      icon: 'build',
      text: 'Аналитика',
      description: 'Статистические данные о ходе программы',
      counter: false,
      href: '/analytics',
    },
    {
      icon: 'user',
      text: 'Этапы отбора',
      description: 'Помощь для университетов в 2022 году',
      counter: false,
      href: '/about#steps',
    },
  ],
  newsTitle: 'Новости',
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
}
