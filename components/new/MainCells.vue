<template>
  <Section>
    <div class="main-cells">
      <div class="main-cells__wrapper">
        <SmartLink
          v-for="cell in cells"
          :key="cell.id"
          :to="cell.href"
          :class="['main-cell', '_sub', 'hover-opacity']"
        >
          <div>
            <div class="main-cell__icon">
              <SvgIcon :name="cell.icon" />
            </div>

            <div class="main-cell__title _visually-h4" v-html="cell.text"></div>

            <p class="main-cell__description">{{ cell.description }}</p>
          </div>

          <ArrowLink :text="lang['base.more']" is-div> </ArrowLink>
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
}

.main-cells__wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.main-cell {
  display: flex;
  flex-basis: 310px;
  flex-direction: column;
  flex-grow: 1;
  border: 1px solid $color_grey_border;
  background-color: $color_white;

  @include --desktop {
    flex-basis: 292px;
  }

  &__title {
    margin-top: 2rem;
    margin-bottom: 1.4rem;
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
  }

  &__description {
    color: $color_dark_grey;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    @include --mobile {
      margin-bottom: 1.2rem;
    }
  }

  &._sub {
    justify-content: space-between;
    height: 26.2rem;
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
