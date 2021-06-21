module.exports = {
  id: 1, // id
  title:
    'ПРИОРИТЕТ 2030 | Единая программа государственной поддержки университетов Российской Федерации', // Заголовок на вкладке
  metaTitle:
    'ПРИОРИТЕТ 2030 | Единая программа государственной поддержки университетов Российской Федерации', // Мета заголовок
  metaDescription:
    'Единая программа государственной поддержки университетов Россииской Федерации в целях реализации прорывных проектов, направленных на научно-технологическое развитие страны', // Мета описание
  ogVk: '', // Opengraph vk
  ogFb: '', // Opengraph fb
  firstScreen: {
    title:
      'Самая масштабная в истории России</br> программа государственной поддержки университетов',
    subtitle: 'Ориентирована на достижение</br> национальных целей',
    mainCell: {
      text: 'О программе «Приоритет 2030»',
      href: '/about',
    },
    cells: [
      {
        icon: '',
        text: 'Ход программы',
        counter: true,
        href: '/about#progress',
      },
      {
        icon: 'build',
        text: 'Регистрация на мероприятие',
        counter: false,
        href: '/registration',
      },
      {
        icon: 'page-screen',
        text: 'Задачи программы',
        counter: false,
        href: '/about#tasks',
      },
      {
        icon: 'page-docs',
        text: 'Информация для СМИ',
        counter: false,
        href: '/contacts',
      },
    ],
  },
  quotes: [
    {
      content:
        '<p>Начиная с 2021 года не менее 100 вузов в субъектах Федерации будут получать гранты от 100 миллионов рублей и выше на открытие студенческих технопарков, бизнес-инкубаторов, обновление учебно-лабораторной базы и программ обучения. На такую поддержку смогут претендовать все государственные вузы, в том числе те, где готовят будущих педагогов, врачей, работников сферы транспорта и культуры. Уверен, что молодое поколение россиян, российских учёных в полной мере заявит о себе в новых значимых исследовательских проектах. <…></p><p>Этот год объявлен в нашей стране Годом науки и технологий. Мы понимаем, что наука в современном мире имеет абсолютно ключевое значение».</p>', // Текст цитаты html
      author: {
        image: '/i/blockquote/2.jpg', // Аватарка
        name: 'Владимир Путин',
        position: 'Президент России',
        source: 'Послание Президента Федеральному Собранию (21 апреля 2021 г.)',
      },
    },
    {
      content:
        '<p>Это новый этап развития программ, которые работали в отечественной системе высшего образования предыдущие 15 лет. Отличие в том, что Приоритет 2030 аккумулировал в себе лучшие практики и послужит не только развитию университетов, но и позволит увеличить долю российских науки и высшего образования на мировом рынке.</p>', // Текст цитаты html
      author: {
        image: '/i/blockquote/1.jpg', // Аватарка
        name: 'Валерий Фальков',
        position: 'Министр науки и высшего образования Российской Федерации',
      },
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
