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
      description: 'Комиссия Минобрнауки РФ по отбору в программу',
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