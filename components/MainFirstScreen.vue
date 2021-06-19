<template>
  <Section>
    <div class="main-first-screen">
      <div ref="mainFirstScreenHead" class="main-first-screen-head">
        <div v-scroll-element class="main-first-screen-head__logo">
          <img
            :src="$i18n.locale === 'ru' ? '/i/logo.svg' : '/i/logo-en.svg'"
            alt=""
          />
        </div>
        <div class="main-first-screen-head__content">
          <strong v-scroll-element v-html="title"></strong>
          <span v-scroll-element v-html="subtitle"></span>
        </div>
      </div>

      <div class="main-first-screen__content">
        <div
          v-show="$motion"
          ref="mainFirstScreenMainCell"
          class="main-first-screen-cell _main"
        >
          <SmartLink
            v-scroll-element
            :to="mainCell.href"
            class="main-first-screen-cell__title _visually-h2"
            >{{ mainCell.text }}</SmartLink
          >

          <ArrowLink
            v-scroll-element
            class="main-first-screen-cell__link"
            :text="lang['base.more']"
            :to="mainCell.href"
          >
          </ArrowLink>
        </div>
        <div class="_main-first-screen-cells__wrapper">
          <div ref="mainFirstScreenCells" class="main-first-screen-cells">
            <div
              v-for="cell in cells"
              :key="cell.id"
              v-scroll-element
              class="main-first-screen-cell _sub"
            >
              <div
                v-if="!cell.counter && cell.icon"
                class="main-first-screen-cell__icon"
              >
                <SvgIcon :name="cell.icon" />
              </div>

              <Countdown v-else-if="cell.counter" />

              <SmartLink
                :to="cell.href"
                class="main-first-screen-cell__title _visually-h4"
                >{{ cell.text }}</SmartLink
              >

              <ArrowLink
                class="main-first-screen-cell__link"
                :text="lang['base.more']"
                :to="cell.href"
              >
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<script>
import { mapState } from 'vuex'
import Section from '~/components/layout/Section'
import SmartLink from '~/components/utils/SmartLink'
import ArrowLink from '~/components/controls/ArrowLink'
import scrollAnimation from '~/assets/js/composables/animations/scroll-animation'
import Countdown from '~/components/CountdownSmall'
export default {
  name: 'MainFirstScreen',
  components: { Countdown, ArrowLink, SmartLink, Section },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    mainCell: {
      type: Object,
      required: true,
    },
    cells: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
  },
  mounted() {
    scrollAnimation(this.$refs.mainFirstScreenHead)
    scrollAnimation(this.$refs.mainFirstScreenMainCell)
    scrollAnimation(this.$refs.mainFirstScreenCells)

    this.$motion?.scenes.firstScreen.init(this.$refs.mainFirstScreenMainCell)
    this.$motion?.scenes.firstScreen.start()
  },
  beforeDestroy() {
    this.$motion?.scenes.firstScreen.destroy()
  },
}
</script>

<style lang="scss">
.main-first-screen {
  &__content {
    padding-top: 8rem;
    @include flexGap(3rem);

    @include --mobile {
      padding-top: 4rem;
    }

    > * {
      flex: 1 1 40%;

      @include --tablet {
        flex: 1 1 100%;
      }
    }
  }
}

.main-first-screen-head {
  @include flexGap(3rem);

  > * {
    flex: 1 1 40%;

    @include --tablet {
      flex: 1 1 100%;
    }
  }

  &__logo {
    img {
      width: 48rem;
      height: 9.2rem;

      @include --tablet {
        width: 36rem;
        height: 7rem;
      }

      @include --mobile {
        width: 26rem;
        height: 5rem;
      }
    }
  }

  &__content {
    @include h4;

    @include --mobile {
      @include h5;
    }

    > * {
      display: block;
    }

    span {
      margin-top: 2.4rem;
    }
  }
}

.main-first-screen-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: $color_white;

  &__title {
    @include hover-opacity;
    font-weight: 700;

    ._sub & {
      min-height: 5.8rem;
      margin-top: 5.2rem;
      margin-bottom: 1.4rem;

      @include --mobile {
        min-height: auto;
        margin-top: 3.2rem;
        margin-bottom: 2.4rem;
      }
    }

    ._main & {
      margin-bottom: 4rem;

      @include --mobile {
        margin-bottom: 3.2rem;
      }
    }
  }

  &._main {
    justify-content: flex-end;
    height: 58.6rem;
    padding: 3.2rem;
    background-color: transparent;

    @include --mobile {
      height: 40rem;
      padding: 2.4rem;
    }
  }

  &._sub {
    justify-content: space-between;
    height: 27.8rem;
    padding: 2.4rem;

    @include --mobile {
      height: auto;
    }
  }

  &__icon {
    width: 5.8rem;
    height: 7rem;

    svg {
      @include box(100%);
    }
  }
}

.main-first-screen-cells {
  @include flexGap(3rem);

  > * {
    flex: 1 1 40%;

    @include --mobile {
      flex: 1 1 100%;
    }
  }
}
</style>
