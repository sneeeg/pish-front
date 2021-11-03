<template>
  <div class="list">
    <ul>
      <li v-for="({ label, text, to }, index) in _items" :key="index">
        <component
          :is="to ? 'SmartLink' : 'div'"
          class="list-item"
          :to="to || false"
        >
          <div class="list-item__icon">
            <SvgIcon name="arrow-right-lg" />
          </div>

          <div class="list-item__content">
            <div class="list-item__label">
              {{ label }}
            </div>

            <div v-if="text" class="list-item__text">
              {{ text }}
            </div>
          </div>
        </component>
      </li>
    </ul>

    <Btn
      v-if="pagination.current < pagination.total"
      class="list__btn"
      type="button"
      :text="lang['base.seeMore']"
      arrow="arrow-bottom"
      @click.native="pagination.current += 1"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SmartLink from '~/components/utils/SmartLink'
import Btn from '~/components/controls/Btn'

export default {
  name: 'List',
  components: { Btn, SmartLink },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      pagination: {
        total: 1,
        current: 1,
      },
    }
  },
  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', {
      isTabletSize: (state) => state.window.isTabletSize,
    }),

    countPerPage() {
      return this.isTabletSize ? 6 : 12
    },

    _items() {
      const availableQuantity = this.pagination.current * this.countPerPage

      return this.items.reduce((acc, item, index) => {
        if (index < availableQuantity) {
          acc.push(item)
        }

        return acc
      }, [])
    },
  },
  watch: {
    items() {
      this.setPagination()
    },
    isTabletSize() {
      this.setPagination()
    },
  },
  created() {
    this.setPagination()
  },
  methods: {
    setPagination() {
      this.pagination.current = 1
      this.pagination.total = Math.ceil(this.items.length / this.countPerPage)
    },
  },
}
</script>

<style lang="scss">
.list {
  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    @include flexGap(4rem, 2.4rem);

    li {
      flex: 1 1 40%;
      max-width: calc(100% / 2 - 4rem);

      @include --tablet {
        flex: 1 1 100%;
        max-width: 100%;
      }
    }

    @include --mobile {
      @include flexGap(2.2rem);
    }
  }

  &__btn {
    width: 23.2rem;
    margin-top: 4rem;

    @include --tablet {
      width: 20rem;
    }
  }
}

.list-item {
  display: flex;

  &[href] {
    @include hover {
      svg {
        transform: translateX(4px);
      }

      .list-item__label {
        color: $color_accent;
      }
    }
  }

  &__icon {
    flex-shrink: 0;

    svg {
      @include box(1.8rem);

      transition: transform 0.3s ease-in-out;

      @include --mobile {
        @include box(1.5rem);
      }
    }
  }

  &__content {
    margin-left: 1.2rem;

    @include --mobile {
      margin-left: 1rem;
    }
  }

  &__label {
    @include text-small;

    transition: color 0.3s ease;
  }

  &__text {
    @include text-button-small;
    margin-top: 0.8rem;
    color: $color_grey_text;
    font-weight: normal;
    text-transform: none;
  }
}
</style>
