<template>
  <div>
    <Section :title="tasks.title" background>
      <AccordionBlock :tasks="tasks" />
    </Section>
    <Section title="test">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
      animi assumenda consequuntur, debitis magni maiores minima minus odio
      odit, officia quae qui quis ratione rem rerum sequi! Blanditiis, possimus.
    </Section>
    <Section title="test" background>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
      animi assumenda consequuntur, debitis magni maiores minima minus odio
      odit, officia quae qui quis ratione rem rerum sequi! Blanditiis, possimus.
    </Section>
    <TextBlock title="text-content"></TextBlock>
  </div>
</template>

<script>
import TextBlock from '~/components/TextBlock'
import AccordionBlock from '~/components/AccordionBlock'

export default {
  components: {
    TextBlock,
    AccordionBlock,
  },
  data() {
    const tasks = {
      title: 'Задачи программы',
      items: [
        {
          title: 'Для страны',
          model3d: '/tasks/1.png',
          content:
            '<ul><li>увеличение доли российской науки на глобальном рынке исследований и разработок</li><li>обеспечение привлекательности работы в России для ведущих ученых и молодых перспективных исследователей</li><li>кадровое обеспечение приоритетных направлений развития науки, технологий, техники, отраслей экономики, социальной сферы</li><li>использование научного, образовательного и инновационного потенциала университетов для сокращения срока внедрения инноваций в экономику страны и субъектов РФ</li></ul>',
        },
        {
          title: 'Для университетов',
          model3d: '/tasks/2.png',
          content:
            '<ul><li>повышение научно-технологического потенциала российских университетов для создания новых технологий, отраслей и конкурентоспособных продуктов</li><li>расширение межинституционального сетевого взаимодействия</li><li>интеграция академической и университетской науки и международная кооперация</li></ul>',
        },
        {
          title: 'Для общества',
          model3d: '/tasks/3.png',
          content:
            '<ul><li>обеспечение условий для формирования цифровых компетенций и навыков использования цифровых технологий у обучающихся, в том числе у студентов ИТ-специальностей</li><li>повышение качества и востребованности образовательных, научно-технических, социальных услуг российских университетов</li></ul>',
        },
      ],
    }
    return {
      tasks,
    }
  },
}
</script>

<style></style>
