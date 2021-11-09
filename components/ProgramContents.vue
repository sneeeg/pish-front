<template>
  <div class="program-contents">
    <div class="program-contents__content">
      <div class="program-contents-header">
        <div class="program-contents-header__content">
          <span>{{ lang['analytics.contents'] }}</span>

          <Btn
            v-if="!window.isDesktopSize"
            :text="lang['base.close']"
            :arrow="false"
            small
            grey
            @click.native="close"
          />
        </div>
      </div>

      <div ref="list" class="program-contents__list">
        <div
          v-for="(title, index) in programTitles"
          :key="title.id"
          class="program-contents-item"
        >
          <a
            :id="`title-${title.id}`"
            :href="`#${title.id}`"
            :class="[
              'program-contents-item-link',
              { _active: !title.children.length ? hash === title.id : false },
            ]"
            @click.prevent="
              !title.children.length ? toTitle(title.id) : expand(title.id)
            "
          >
            <div class="program-contents-item-link__content">
              <span>{{ index + 1 }}.</span>
              <span v-html="title.text"></span>
            </div>
          </a>

          <div
            v-show="titleHasExpand(title)"
            class="program-contents-item__children"
          >
            <div
              v-for="(i, idx) in title.children"
              :key="i.id"
              class="program-contents-item"
            >
              <a
                :id="`title-${i.id}`"
                :href="`#${i.id}`"
                :class="[
                  'program-contents-item-link',
                  '_child',
                  { _active: hash === i.id || (!idx && hash === title.id) },
                ]"
                @click.prevent="toTitle(i.id)"
              >
                <div class="program-contents-item-link__content">
                  <span>{{ index + 1 }}.{{ idx + 1 }}</span>
                  <span v-html="i.text"></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Btn from '~/components/controls/Btn'

export default {
  name: 'ProgramContents',

  components: { Btn },

  data() {
    return {
      expanded: '',
    }
  },

  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
    ...mapGetters('organization', ['programTitles']),

    /**
     * Window hash
     * @returns {string}
     */
    hash() {
      const hash = this.$parent.$parent.$data.hash

      return hash.slice(1, hash.length)
    },
  },

  watch: {
    hash(val) {
      this.scrollList(val)
      this.expanded = ''
    },
  },

  beforeDestroy() {
    // document.documentElement.style.scrollBehavior = 'auto'
  },

  methods: {
    scrollList(id) {
      this.$nextTick(() => {
        const list = this.$refs.list
        if (!list) return

        const el = list.querySelector(`#title-${id}`)

        this.$vuetify.goTo(el, {
          container: list,
          duration: 250,
          offset: 150,
        })
      })
    },

    expand(id) {
      this.expanded = this.expanded === id ? '' : id
      this.scrollList(id)
    },

    titleHasExpand(title) {
      return (
        title.id === this.expanded ||
        (!this.expanded &&
          (title.id === this.hash ||
            title.children.find((item) => item.id === this.hash)))
      )
    },

    /**
     * Going to title
     * @param event
     */
    toTitle(id) {
      // if (this.window.isDesktopSize) {
      //   document.documentElement.style.scrollBehavior = 'smooth'
      // } else {
      //   document.documentElement.style.scrollBehavior = 'auto'
      // }

      this.close()
      window.location.href = `#${id}`
    },

    /**
     * Close mobile contents
     */
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
.program-contents {
  position: absolute;
  top: 0;
  left: 0;
  width: 38rem;

  @include --tablet {
    z-index: 1000;
    width: 100%;
    height: 100vh;
    background-color: $color_white;
  }

  &__content {
    @include --tablet {
      position: fixed;
      @include box(100%);
      z-index: 1001;
    }
  }

  &__list {
    @include scrollbarHidden;

    height: calc(100vh - 81px - 6rem);
    overflow-y: scroll;

    @include --tablet {
      height: calc(100% - 1px - 6rem);
    }
  }
}

.program-contents-header {
  height: 6rem;
  border-bottom: 1px solid rgba($color_grey_border, 0.4);
  color: #000;
  font-weight: 700;
  background-color: $color_white;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 1.2rem;
  }
}

.program-contents-item {
  @include text-small;
  background-color: $color_white;

  &__children {
    border-bottom: 1px solid rgba($color_grey_border, 0.5);
  }
}

.program-contents-item-link {
  position: relative;
  display: block;
  border-bottom: 1px solid rgba($color_grey_border, 0.5);
  color: $color_dark_grey;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: $color_accent;
    opacity: 0;
    content: '';
  }

  &._active {
    color: #000;
    transition: color 0.3s ease;

    &::before {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }

  &._child {
    border: 0;
  }

  &__content {
    display: flex;
    padding: 1.6rem 1.4rem;

    @include --mobile {
      padding: 1.4rem 1.2rem;
    }

    ._child & {
      padding-left: 3.6rem;

      > span:first-child {
        width: 3.6rem;

        @include --mobile {
          width: 3.2rem;
        }
      }
    }

    > span:first-child {
      flex-shrink: 0;
      width: 2.4rem;

      @include --mobile {
        width: 2rem;
      }
    }

    > span:last-child {
      @include lineClamp(4);
      font-style: normal;

      * {
        font-style: normal;
      }
    }
  }
}
</style>
