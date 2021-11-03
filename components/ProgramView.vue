<template>
  <div ref="view" class="program-view">
    <div ref="contents" class="program-view-contents">
      <div class="program-view-contents__content">
        <div class="program-view-contents-header">
          <div class="program-view-contents-header__content">
            <span>{{ lang['analytics.contents'] }}</span>
          </div>
        </div>

        <div ref="contentsList" class="program-view-contents__list">
          <div
            v-for="(title, index) in programTitles"
            :key="title.id"
            class="program-view-contents-item"
          >
            <a
              :href="`#${title.id}`"
              :class="[
                'program-view-contents-item-link',
                { _active: hash === title.id },
              ]"
              :data-title="title.id"
              @click.prevent="changeTitle(title.id), toTitle()"
            >
              <div class="program-view-contents-item-link__content">
                <span>{{ index + 1 }}.</span>
                <span v-html="title.text"></span>
              </div>
            </a>

            <div
              v-show="titleHasExpand(title)"
              class="program-view-contents-item__children"
            >
              <div
                v-for="(i, idx) in title.children"
                :key="i.id"
                class="program-view-contents-item"
              >
                <a
                  :href="`#${i.id}`"
                  :data-title="i.id"
                  :class="[
                    'program-view-contents-item-link',
                    '_child',
                    { _active: hash === i.id },
                  ]"
                  @click.prevent="changeTitle(i.id), toTitle()"
                >
                  <div class="program-view-contents-item-link__content">
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

    <div ref="constructor" class="program-view-constructor">
      <ProgramConstructor
        :items="program"
        @change="changeTitle"
        @load="onLoad"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ProgramConstructor from '~/components/appConstructor/ProgramConstructor'

const OFFSET = 150

export default {
  name: 'ProgramView',
  components: { ProgramConstructor },
  data() {
    return {
      onScroll: false,
    }
  },
  computed: {
    ...mapState('organization', ['program']),
    ...mapState('responsive', ['window']),
    ...mapState('default', ['lang']),
    ...mapState('scroll', ['y', '']),
    ...mapGetters('organization', ['programTitles']),
    hash() {
      return this.$route.hash.slice(1, this.$route.hash.length)
    },
  },
  watch: {
    y() {
      this.stickyHandler()
      this.inViewHandler()
    },
    hash(val) {
      const list = this.$refs.contentsList
      if (!list) return

      this.$nextTick(() => {
        const el = list.querySelector(`[data-title=${val}]`)

        this.$scrollTo(el, 0, {
          container: list,
          offset: -OFFSET,
          cancelable: true,
        })
      })
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    onLoad() {
      this.$emit('load')

      this.toTitle()
      this.inViewHandler()

      window.addEventListener('resize', this.resizeHandler)

      this.$nextTick(() => {
        this.stickyHandler()
      })
    },
    toTitle() {
      setTimeout(() => {
        if (!this.hash) return

        const el = this.$refs.constructor.querySelector(
          `[data-title=${this.hash}]`
        )

        this.$scrollTo(
          el || this.$refs.constructor.querySelector('[data-title]'),
          0,
          {
            offset: -OFFSET / 2,
            onStart: () => {
              this.onScroll = true
            },
            onDone: () => {
              this.onScroll = false
            },
            onCancel: () => {
              this.onScroll = false
            },
          }
        )
      })
    },
    titleHasExpand(title) {
      if (!this.hash || this.hash === title) return

      return (
        title.id === this.hash ||
        title.children.find((item) => item.id === this.hash)
      )
    },
    changeTitle(title) {
      location.hash = `#${title}`
    },
    resizeHandler() {
      this.stickyHandler()
      this.inViewHandler()
    },
    inViewHandler() {
      if (this.onScroll) return
      const elems = this.$refs.constructor.querySelectorAll('[data-title]')

      for (let i = 0; i < elems.length; i++) {
        const elem = elems[i]
        const rect = elem.getBoundingClientRect()
        const title = elem.dataset.title

        if (rect.top - OFFSET > 0 || rect.bottom - OFFSET > 0) {
          this.changeTitle(title)

          break
        }
      }
    },
    stickyHandler() {
      const el = this.$refs.contents

      if (!el) return

      const parentRect = el.parentElement.getBoundingClientRect()
      const bottom = parentRect.bottom - this.window.height

      if (parentRect.top <= 40 && bottom > 0) {
        el.style.position = 'fixed'
        el.style.top = '40px'
        el.style.left = parentRect.left + 'px'
      } else {
        el.style.position = 'absolute'

        if (bottom <= 0) {
          el.style.top = 'auto'
          el.style.bottom = '0'
        } else {
          el.style.top = '0'
          el.style.bottom = 'auto'
        }

        el.style.left = '0'
      }
    },
  },
}
</script>

<style lang="scss">
.program-view {
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.program-view-contents {
  position: absolute;
  top: 0;
  left: 0;
  width: 38rem;

  &__content {
    background-color: $color_white;
  }

  &__list {
    @include scrollbarHidden;

    max-height: calc(100vh - 81px - 6rem);
    overflow-y: scroll;
  }
}

.program-view-contents-header {
  height: 6rem;
  color: #000;
  font-weight: 700;
  border-bottom: 1px solid rgba($color_grey_border, 0.4);

  &__content {
    align-items: center;
    display: flex;
    height: 100%;
    padding: 1.2rem;
  }
}

.program-view-constructor {
  max-width: calc(100% - 41rem);
  padding: 3.2rem;
  background-color: $color_white;
}

.program-view-contents-item {
  @include text-small;

  &__children {
    border-bottom: 1px solid rgba($color_grey_border, 0.5);
  }
}

.program-view-contents-item-link {
  position: relative;
  display: block;
  border-bottom: 1px solid rgba($color_grey_border, 0.5);
  color: $color_dark_grey;

  &::before {
    content: '';
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $color_accent;
    opacity: 0;
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

    ._child & {
      padding-left: 3.6rem;

      > span:first-child {
        width: 3.6rem;
      }
    }

    > span:first-child {
      width: 2.4rem;
      flex-shrink: 0;
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
