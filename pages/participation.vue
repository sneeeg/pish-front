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
  computed: {
    ...mapState('default', ['lang']),
  },
  created() {
    /* TODO */

    if (!this.page.participationSteps) {
      this.page.participationSteps = [
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
          content: `<p>Информация о результатах отбора университетов будет опубликована 1 сентября 2021 года<p>`,
        },
      ]
    }

    if (!this.page.requirements.items[0].sections) {
      this.page.requirements.items[0].sections = [
        {
          id: 0,
          title: 'Первая группа критериев',
          items: [
            `численность обучающихся по образовательным программам высшего образования по очной форме обучения – <span>не менее 4000 человек</span>`,
            `совокупный объем доходов из всех источников – <span>не менее 1 млрд рублей</span>`,
            `удельный вес доходов от НИОКР в общем объеме доходов – <span>не менее 5%</span>`,
          ],
        },
        {
          id: 1,
          title: 'Вторая группа критериев',
          items: [
            `доля студентов, зачисленных на первый курс на обучение по специальностям и направлениям подготовки высшего образования творческой направленности в общем количестве первокурсников, – <span>не менее 60%</span>`,
            `<span>наличие письма за подписью руководителя</span> организации, осуществляющей функции и полномочия учредителя университета, о рекомендации к участию в отборе с обоснованием наличия потенциала университета, необходимого для участия в программе «Приоритет-2030»`,
          ],
        },
        {
          id: 2,
          title: 'Третья группа критериев',
          items: [
            `<span>соответствие двум из трех</span> критериев первой группы допуска к отбору`,
            `<span>обязательство университета</span> по достижении соответствия первой группе критериев не позднее 2023 года`,
            `наличие обязательства органа власти региона, на территории которого расположен университет, и (или) профильного ФОИВа, и (или) профильной системообразующей организации осуществлять дополнительную финансовую поддержку реализации программы развития университета в объеме <span>не менее 100 млн рублей в год</span>`,
          ],
        },
        {
          id: 3,
          title: 'Четвертая группа критериев',
          items: [
            `<span>соответствие двум из трех критериев</span> первой группы допуска к отбору`,
            `<span>решение университета об инициировании процедуры реорганизации</span> в форме слияния или присоединения с другими университетами и (или) научными организациями`,
            `<span>обязательство университета</span> о завершении реорганизационных процедур и достижении соответствия первой группе критериев допуска к отбору не позднее 2023 года`,
          ],
        },
      ]
    }
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
