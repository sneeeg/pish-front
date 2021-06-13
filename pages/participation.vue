<template>
  <div class="page">
    <Section is-layout>
      <FirstScreen adaptive-top video :title="page.title" />
    </Section>
    <!--    <Section v-view="$utils.scrollCenterDetection" background>-->
    <!--      <div class="participation-advertisement">-->
    <!--        <img-->
    <!--          v-scroll-element-->
    <!--          class="participation-advertisement__img"-->
    <!--          :src="-->
    <!--            $i18n.locale === 'ru'-->
    <!--              ? '/i/min-science-full.svg'-->
    <!--              : '/i/min-science-full-en.svg'-->
    <!--          "-->
    <!--          alt=""-->
    <!--        />-->
    <!--        <HTMLContent v-scroll-element :html="page.advertisement"></HTMLContent>-->
    <!--      </div>-->
    <!--    </Section>-->

    <Section v-view="$utils.scrollCenterDetection" background>
      <ParticipationSteps :steps="page.participationSteps" />
    </Section>
    <Section
      v-view="$utils.scrollCenterDetection"
      :title="page.requirements.title"
    >
      <div
        v-for="(requirement, index) in page.requirements.items"
        :key="index"
        class="participation-rules"
      >
        <div v-scroll-element="'left'" class="participation-rules__icon">
          <img
            :class="{ _IE: $store.state.responsive.browser.isIE }"
            :src="`/i/participation/${index + 1}.svg`"
            alt=""
          />
        </div>
        <HTMLContent
          v-scroll-element="'right'"
          :html="requirement.content"
        ></HTMLContent>
        <Tabs
          v-if="requirement.sections && requirement.sections.length"
          v-scroll-element
          class="participation-rules__tabs"
          :sections="requirement.sections"
        />
      </div>
    </Section>
    <Section
      v-view="$utils.scrollCenterDetection"
      class="_mb-0"
      :title="page.steps.title"
      :has-overflow="false"
    >
      <TheStages :stages="page.steps.sections"></TheStages>
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import FirstScreen from '~/components/FirstScreen'
import TheStages from '~/components/TheStages'
import HTMLContent from '~/components/utils/HTMLContent'
import Tabs from '~/components/Tabs'
import ParticipationSteps from '~/components/ParticipationSteps'

export default {
  name: 'Participation',
  components: {
    ParticipationSteps,
    Tabs,
    FirstScreen,
    Section,
    TheStages,
    HTMLContent,
  },
  mixins: [pageDataFetch, pageHead, pageDefault],
  created() {
    /* TODO */

    if (!this.page.participationSteps) {
      this.participationSteps = [
        {
          title: 'Подготовить пакет документов',
          content: `<p>Ознакомиться с пакетом документов вы можете <a href="#">здесь</a><p>`,
        },
        {
          title: 'Направить пакет документов ',
          content: `<p>В Министерство науки и образования Российской Федерации <p>`,
        },
        {
          title: 'Узнать результаты отбора',
          content: `<p>Информация о <a href="#">результатах отбора университетов</a> будет опубликована 1 сентября 2021 года<p>`,
        },
      ]
    }

    if (!this.page.requirements.items[0].sections) {
      this.page.requirements.items[0].sections = [
        {
          id: 0,
          title: 'Первая группа критериев',
          items: [
            'создание условий для участия студентов и аспирантов в научно-исследовательских и опытно-конструкторских работах, инновационных проектах',
            'развитие и реализация прорывных научных исследований и разработок',
          ],
        },
        {
          id: 1,
          title: 'Вторая группа критериев',
          items: [
            'развитие материально-технических условий образовательной, научной, инновационной, творческой деятельности университетов',
            'цифровая трансформация университетов и научных организаций',
            'внедрение в экономику и социальную сферу высоких технологий',
          ],
        },
        {
          id: 2,
          title: 'Третья группа критериев',
          items: [
            'подготовка кадров для приоритетных направлений научно-технологического развития РФ, субъектов РФ, отраслей экономики и социальной сферы',
            'развитие кадрового потенциала системы высшего образования, привлечение в университеты ведущих ученых и специалистов-практиков',
            'вовлечение обучающихся и работников университетов к реализации творческих и социально ориентированных проектов',
            'новые востребованные основные и дополнительные образовательные программы',
            'содействие карьере выпускников университетов в секторе исследований и разработок и высокотехнолгичных отраслях экономики',
            'тиражирование лучших практик университета в других университетах, не являющихся участниками программы',
            'реализация программ академической мобильности научно-педагогических работников и обучающихся',
          ],
        },
        {
          id: 3,
          title: 'Четвертая группа критериев',
          items: [
            'подготовка кадров для приоритетных направлений научно-технологического развития РФ, субъектов РФ, отраслей экономики и социальной сферы',
            'развитие кадрового потенциала системы высшего образования, привлечение в университеты ведущих ученых и специалистов-практиков',
            'вовлечение обучающихся и работников университетов к реализации творческих и социально ориентированных проектов',
            'новые востребованные основные и дополнительные образовательные программы',
            'содействие карьере выпускников университетов в секторе исследований и разработок и высокотехнолгичных отраслях экономики',
            'тиражирование лучших практик университета в других университетах, не являющихся участниками программы',
            'реализация программ академической мобильности научно-педагогических работников и обучающихся',
          ],
        },
      ]
    }
  },
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss">
$participationTextPadding: 8.7rem;
$participationTextPaddingMobile: 8.7rem;

.participation-advertisement {
  &__img {
    display: block;
    width: 23.5rem;
    margin-bottom: 2.4rem;
  }

  .html-content {
    padding-left: $participationTextPadding;

    @include --mobile {
      padding-left: 0;
    }
  }
}

.participation-rules {
  position: relative;
  padding-left: $participationTextPadding;

  &__tabs {
    position: relative;
    left: -8.7rem;
    width: calc(100% + 8.7rem);
    margin-top: 9.2rem;

    @include --mobile {
      left: -7rem;
      width: calc(100% + 7rem);
      margin-top: 7.2rem;
    }
  }

  @include --mobile {
    padding-left: 7rem;
  }

  &__icon {
    position: absolute;
    left: 0;
    display: flex;
    justify-content: center;
    width: 5rem;

    img {
      max-width: 100%;

      &._IE {
        width: 100%;
      }
    }
  }

  &:not(:last-child) {
    margin-bottom: 4.2rem;
  }
}
</style>
