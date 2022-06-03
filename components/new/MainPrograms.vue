<template>
  <div class="main-programs">
    <div class="main-programs__wrapper">
      <div
        v-for="program in programs"
        :key="program.id"
        :class="['main-program', program.image ? '_main' : '_sub']"
      >
        <div class="main-program__content">
          <div class="main-program__title" v-html="program.title"></div>
          <p class="main-program__description">{{ program.description }}</p>
          <Btn
            class="main-program__btn"
            :text="lang['base.more']"
            :to="program.href"
          />
        </div>
        <div v-if="!!program.image" class="main-program__image">
          <img :src="program.image" alt="image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Btn from '~/components/controls/Btn'
export default {
  name: 'MainPrograms',
  components: { Btn },
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
  &__content {
    padding: 4rem;

    @include --tablet {
      padding: 2.4rem;
    }
  }

  &._main {
    display: flex;
    flex-basis: auto;
    justify-content: space-between;
    max-height: 387px;
    background: $color_accent;

    @include --tablet {
      max-height: unset;
    }

    .main-program__content {
      max-width: 50%;

      @include --tablet {
        max-width: 100%;
        max-height: unset;
      }
    }

    .main-program__title {
      color: $color_white;
      font-weight: 500;
      font-size: 32px;
      line-height: 35px;

      @include --tablet {
        font-size: 28px;
      }
    }

    .main-program__description {
      margin-top: 32px;
      color: $color_white;
      line-height: 27px;
    }

    .main-program__btn {
      margin-top: 80px;
      color: $color_accent !important;
      background-color: $color_white;

      &::before {
        background-color: rgba($color_accent, 0.1);
      }

      @include --mobile {
        width: 100%;
      }
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

      @include --tablet {
        font-size: 22px;
      }
    }

    .main-program__description {
      margin-top: 19px;
      color: $color_dark_grey;
      line-height: 24px;
    }

    .main-program__btn {
      margin-top: 50px;
      border: 1px solid $color_accent;
      color: $color_accent !important;
      background-color: transparent;

      &::before {
        background-color: rgba($color_accent, 0.1);
      }

      @include --mobile {
        width: 100%;
      }
    }
  }

  &__image {
    max-width: 50%;
    clip-path: polygon(40% 0, 100% 0, 100% 100%, 0% 100%);

    @include --tablet {
      display: none;
    }
  }
}
</style>
