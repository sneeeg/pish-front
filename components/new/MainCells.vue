<template>
  <Section>
    <div class="main-cells">
      <div class="main-cells__wrapper">
        <SmartLink
          v-for="cell in cells"
          :key="cell.id"
          :to="cell.href"
          :class="[
            'main-cell',
            '_sub',
            'hover-opacity',
            { '_main-cell': cell.isMain },
          ]"
        >
          <div class="main-cell__icon">
            <SvgIcon :name="cell.icon" />
          </div>

          <div class="main-cell__title _visually-h4" v-html="cell.text"></div>

          <p>{{ cell.description }}</p>

          <ArrowLink class="main-cell__link" :text="lang['base.more']" is-div>
          </ArrowLink>
        </SmartLink>
      </div>
    </div>
  </Section>
</template>

<script>
import { mapState } from 'vuex'
import Section from '~/components/layout/Section'
import SmartLink from '~/components/utils/SmartLink'
import ArrowLink from '~/components/controls/ArrowLink'
export default {
  name: 'MainCells',
  components: { ArrowLink, SmartLink, Section },
  props: {
    cells: {
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
.main-cells {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 32.3rem);

  &._IE {
    height: auto;
  }

  @include --tablet {
    justify-content: flex-end;
    min-height: calc(100vh - 31.1rem);
  }

  @include --mobile {
    min-height: calc(100vh - 24.7rem);
  }

  &__content {
    @include flexGap(4rem);

    > * {
      flex: 1 1 40%;

      @include --tablet {
        flex: 1 1 100%;
      }
    }
  }
}

.main-cells__wrapper {
  display: flex;
  gap: 24px;
}

.main-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid $color_grey_border;
  background-color: $color_white;

  &__title,
  &__link {
    position: relative;
    z-index: 1;
  }

  &__title {
    font-size: 18px;
    line-height: 23px;
    font-weight: 500;

    ._sub & {
      margin-top: 3rem;
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
    width: 4.7rem;
    height: 4.7rem;

    svg {
      @include box(100%);
    }
  }
}
</style>
