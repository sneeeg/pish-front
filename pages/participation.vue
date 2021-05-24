<template>
  <div class="page">
    <Section is-layout>
      <FirstScreen adaptive-top video :title="page.title" />
    </Section>
    <Section v-view="$utils.scrollCenterDetection" background>
      <div class="participation-advertisement">
        <img
          v-scroll-element
          class="participation-advertisement__img"
          :src="
            $i18n.locale === 'ru'
              ? '/i/min-science-full.svg'
              : '/i/min-science-full-en.svg'
          "
          alt=""
        />
        <HTMLContent v-scroll-element :html="page.advertisement"></HTMLContent>
      </div>
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
          <img :src="`/participation/${index + 1}.svg`" alt="" />
        </div>
        <HTMLContent
          v-scroll-element="'right'"
          :html="requirement.content"
        ></HTMLContent>
      </div>
    </Section>
    <Section
      v-view="$utils.scrollCenterDetection"
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

export default {
  name: 'Participation',
  components: { FirstScreen, Section, TheStages, HTMLContent },
  mixins: [pageDataFetch, pageHead, pageDefault],
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
    }
  }

  &:not(:last-child) {
    margin-bottom: 4.2rem;
  }
}
</style>
