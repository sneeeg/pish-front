<template>
  <div ref="view" class="program-view">
    <transition name="slide-from-right">
      <div
        v-show="window.isDesktopSize || contentsIsActive"
        ref="contents"
        class="program-view-contents"
      >
        <div class="program-view-contents__content">
          <div class="program-view-contents-header">
            <div class="program-view-contents-header__content">
              <span>{{ lang['analytics.contents'] }}</span>

              <Btn
                v-if="!window.isDesktopSize"
                :text="lang['base.close']"
                :arrow="false"
                small
                grey
                @click.native="closeContents"
              />
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
                @click.prevent="toTitle(title.id), closeContents()"
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
                    @click.prevent="toTitle(i.id), closeContents()"
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
    </transition>

    <div ref="constructor" class="program-view-constructor">
      <ProgramConstructor
        :items="program"
        @change="changeTitle"
        @load="onLoad"
      />
    </div>

    <FloatBtn v-if="!window.isDesktopSize" icon="book" @click="openContents" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ProgramConstructor from '~/components/appConstructor/ProgramConstructor'
import Btn from '~/components/controls/Btn'
import FloatBtn from '~/components/FloatBtn'

const OFFSET = 150

export default {
  name: 'ProgramView',
  components: { FloatBtn, ProgramConstructor, Btn },
  data() {
    return {
      destiny: '',
      contentsIsActive: false,
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
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    onLoad() {
      this.$emit('load')

      setTimeout(() => {
        if (this.hash && this.hash !== 'title_1') {
          this.toTitle(this.hash, true)
        } else {
          location.hash = '#title_1'
        }

        this.inViewHandler()
        this.stickyHandler()

        window.addEventListener('resize', this.resizeHandler)
      })
    },
    toTitle(destiny, onLoad = false) {
      this.destiny = destiny
      this.changeTitle(destiny)

      this.$scrollTo(
        this.$refs.constructor.querySelector(`[data-title='${destiny}']`),
        this.window.isDesktopSize && !onLoad ? 500 : 0,
        {
          cancelable: false,
          offset: this.window.isDesktopSize ? -OFFSET / 2 : 0,
        }
      )

      setTimeout(() => {
        this.destiny = ''
      }, 600)
    },
    resizeHandler() {
      this.inViewHandler()
      this.stickyHandler()
    },
    titleHasExpand(title) {
      return (
        title.id === this.hash ||
        title.children.find((item) => item.id === this.hash)
      )
    },
    changeTitle(title, withMenuScroll = false) {
      if (this.hash !== title) {
        location.hash = `#${title}`

        if (withMenuScroll) {
          const list = this.$refs.contentsList
          if (!list) return

          const el = list.querySelector(`[data-title=${title}]`)

          this.$scrollTo(el, 0, {
            container: list,
            offset: -OFFSET,
          })
        }
      }
    },
    openContents() {
      this.contentsIsActive = true
    },
    closeContents() {
      this.contentsIsActive = false
    },
    inViewHandler() {
      if (this.destiny) return
      const elems = this.$refs.constructor.querySelectorAll('[data-title]')

      for (let i = 0; i < elems.length; i++) {
        const elem = elems[i]
        const rect = elem.getBoundingClientRect()
        const title = elem.dataset.title

        if (rect.top - OFFSET > 0 || rect.bottom - OFFSET > 0) {
          this.changeTitle(title, true)

          break
        }
      }
    },
    stickyHandler() {
      this.$nextTick(() => {
        const el = this.$refs.contents

        if (!el) return

        if (!this.window.isDesktopSize) {
          el.style.position = 'fixed'
          el.style.top = '0'
          el.style.left = '0'
          el.style.bottom = 'auto'

          return
        }

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
      })
    },
  },
}
</script>

<style lang="scss">
.program-view {
  position: relative;
  display: flex;
  justify-content: flex-end;

  @include --tablet {
    &::before {
      position: absolute;
      top: 0;
      left: -4rem;
      width: 100vw;
      height: 100%;
      background: $color_white;
      content: '';
    }
  }

  @include --mobile {
    &::before {
      left: -2rem;
    }
  }
}

.program-view-contents {
  position: absolute;
  top: 0;
  left: 0;
  width: 38rem;

  @include --tablet {
    @include box(100%);
    z-index: 1000;
  }

  &__content {
    background-color: $color_white;

    @include --tablet {
      @include box(100%);
    }
  }

  &__list {
    @include scrollbarHidden;

    max-height: calc(100vh - 81px - 6rem);
    overflow-y: scroll;

    @include --tablet {
      max-height: calc(100% - 1px - 6rem);
    }
  }
}

.program-view-contents-header {
  height: 6rem;
  border-bottom: 1px solid rgba($color_grey_border, 0.4);
  color: #000;
  font-weight: 700;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 1.2rem;
  }
}

.program-view-constructor {
  max-width: calc(100% - 41rem);
  padding: 3.2rem;
  background-color: $color_white;

  @include --tablet {
    position: relative;
    z-index: 1;
    max-width: 100%;
    padding: 3.2rem 0;
    background: transparent;
  }

  @include --mobile {
    padding: 2.4rem 0;
  }
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
