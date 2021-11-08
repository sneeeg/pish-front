<template>
  <Section background class="_registration-preview">
    <div class="registration-preview">
      <div
        class="registration-preview__image"
        :style="{ backgroundImage: 'url(/i/registration.png)' }"
      ></div>
      <div class="registration-preview__content">
        <div class="registration-preview__forehead">
          {{ forehead }}
        </div>
        <div class="registration-preview__title _visually-h3">
          {{ title }}
        </div>
        <Btn
          class="registration-preview__btn"
          :text="lang['registration.action']"
          is-link
          to="/registration"
        />
      </div>
    </div>
  </Section>
</template>

<script>
import { mapState } from 'vuex'
import Section from '~/components/layout/Section'
import Btn from '~/components/controls/Btn'
export default {
  name: 'RegistrationPreview',
  components: { Btn, Section },
  props: {
    forehead: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss">
._registration-preview {
  overflow: hidden;
}

.registration-preview {
  position: relative;

  &__image {
    @include background;
    position: absolute;
    top: -10rem;
    left: -30rem;
    width: 89rem;
    height: 78.5rem;

    @include --tablet {
      top: 10rem;
      right: -20rem;
      left: auto;
      width: 60rem;
      height: 53rem;
    }

    @include --mobile {
      top: 15rem;
      width: 42rem;
      height: 37rem;
    }
  }

  &__content {
    width: 56rem;
    padding: 8rem 0;

    @include --from-tablet {
      position: relative;
      left: 50%;
    }

    @include --mobile {
      width: 100%;
    }
  }

  &__forehead {
    margin-bottom: 2rem;
    color: $color_accent;
    font-weight: 700;
    text-transform: uppercase;
  }

  &__title {
    margin-bottom: 6.4rem;
    font-weight: 700;

    @include --mobile {
      margin-bottom: 4.8rem;
    }
  }

  &__btn {
    width: 26.7rem;
  }
}
</style>
