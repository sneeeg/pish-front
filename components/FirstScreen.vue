<template>
  <div :class="['first-screen', { '_adaptive-top': adaptiveTop }]">
    <div class="first-screen__content">
      <h1 :class="['first-screen__title', { '_visually-h2': !major }]">
        {{ title }}
      </h1>
      <HTMLContent v-if="lead" :html="lead" class="first-screen__lead" />
      <Btn
        v-if="link"
        :text="lang['base.sendRequest']"
        class="first-screen__link"
        is-link
        :to="settings.lkLink"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HTMLContent from '~/components/utils/HTMLContent'
import Btn from '~/components/controls/Btn'
export default {
  name: 'FirstScreen',
  components: { Btn, HTMLContent },
  props: {
    title: {
      type: String,
      required: true,
    },
    lead: {
      type: String,
      default: '',
    },
    link: {
      type: Boolean,
      default: false,
    },
    major: {
      type: Boolean,
      default: false,
    },
    adaptiveTop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('default', ['lang', 'settings']),
  },
}
</script>

<style lang="scss">
.first-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 14rem);

  @include --tablet {
    justify-content: flex-end;
  }

  &._adaptive-top {
    @include --tablet {
      justify-content: flex-start;
    }
  }

  &__content {
    @include container;
    @include padding-section;
  }

  &__title {
    max-width: 60rem;
  }

  &__link {
    width: 22rem;
    margin-top: 6.8rem;
  }

  &__lead {
    margin-top: 8.4rem;
    max-width: 57rem;

    @include --mobile {
      margin-top: 4rem;
    }

    p {
      font-size: 1.8rem;

      @include --mobile {
        font-size: 1.6rem;
      }
    }
  }
}
</style>
