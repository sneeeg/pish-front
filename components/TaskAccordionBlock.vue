<template>
  <div class="task-accordion-block">
    <TaskAccordion :tasks="tasks" />
    <div class="task-accordion-block__image-wrapper">
      <img :src="img" alt="Тематическое изображение" />
    </div>
  </div>
</template>

<script>
import TaskAccordion from '~/components/TaskAccordion'

export default {
  name: 'TaskAccordionBlock',
  components: {
    TaskAccordion,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
  },
  data() {
    const tasks = [
      {
        id: 0,
        label: 'Для страны',
        content:
          '<ul><li>увеличение доли российской науки на глобальном рынке исследований и разработок</li><li>обеспечение привлекательности работы в России для ведущих ученых и молодых перспективных исследователей</li><li>кадровое обеспечение приоритетных направлений развития науки, технологий, техники, отраслей экономики, социальной сферы</li><li>использование научного, образовательного и инновационного потенциала университетов для сокращения срока внедрения инноваций в экономику страны и субъектов РФ</li></ul>',
      },
      {
        id: 1,
        label: 'Для университетов',
        content:
          '<ul><li>повышение научно-технологического потенциала российских университетов для создания новых технологий, отраслей и конкурентоспособных продуктов</li><li>расширение межинституционального сетевого взаимодействия</li><li>интеграция академической и университетской науки и международная кооперация</li></ul>',
      },
      {
        id: 2,
        label: 'Для общества',
        content:
          '<ul><li>обеспечение условий для формирования цифровых компетенций и навыков использования цифровых технологий у обучающихся, в том числе у студентов ИТ-специальностей</li><li>повышение качества и востребованности образовательных, научно-технических, социальных услуг российских университетов</li></ul>',
      },
    ]
    return {
      tasks,
    }
  },
}
</script>

<style lang="scss">
.task-accordion-block {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  .task-accordion {
    flex: 0 0 57%;
    margin: -2.4rem 6.4rem 0 0;

    @include --tablet {
      margin: 0 4rem 0 0;
    }

    @include --mobile {
      flex: 0 0 100%;
      margin: 0;
    }
  }

  &__image-wrapper {
    position: relative;
    flex: 1 1 auto;

    @include --mobile {
      display: none;
    }

    &::before {
      display: block;
      padding-top: 75%;
      content: '';

      @include --tablet {
        padding-top: 100%;
      }
    }

    > img {
      position: absolute;
      top: 40%;
      left: 50%;
      max-width: 100%;
      max-height: 125%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
