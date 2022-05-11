<template>
  <Section>
    <div class="main-programs">
      <div class="main-programs__wrapper">
        <SmartLink
          v-for="program in programs"
          :key="program.id"
          :to="program.href"
          :class="[
            'main-program',
            program.image ? '_main' : '_sub',
            'hover-opacity',
          ]"
        >
          <div class="main-program__title" v-html="program.title"></div>
          <p class="main-program__description">{{ program.description }}</p>
          <Btn
            class="main-first__item-btn"
            :text="lang['base.more']"
            :is-link="true"
            :grey="true"
          />
        </SmartLink>
      </div>
    </div>
  </Section>
</template>

<script>
import { mapState } from 'vuex'
import Section from '~/components/layout/Section'
import SmartLink from '~/components/utils/SmartLink'
import Btn from '~/components/controls/Btn'
export default {
  name: 'MainPrograms',
  components: { SmartLink, Btn, Section },
  props: {
    programs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['browser']),
  },
}
</script>

<style lang="scss">
.main-programs {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
}

.main-program {
  padding: 4rem;

  &._main {
    background: $color_accent;

    .main-program__title {
      color: $color_white;
      font-weight: 500;
      font-size: 32px;
      line-height: 35px;
    }

    .main-program__description {
      margin-top: 32px;
      color: $color_white;
    }
  }

  &._sub {
    flex-basis: 608px;
    flex-grow: 1;
    background: $color_background;

    .main-program__title {
      font-weight: 500;
      font-size: 18px;
      line-height: 23px;
    }

    .main-program__description {
      margin-top: 19px;
      color: $color_dark_grey;
    }
  }
}
</style>
