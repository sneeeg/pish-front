<template>
  <div class="program-view">
    <div ref="contents" class="program-view-contents">
      <div class="program-view-contents__content">
        <div class="program-view-contents-header">
          <div class="program-view-contents-header__content">
            <span>{{ lang['analytics.contents'] }}</span>
          </div>
        </div>

        <div class="program-view-contents__list">
          <div
            v-for="(title, index) in programTitles"
            :key="title.id"
            class="program-view-contents-item"
          >
            <a
              :href="`#${title.id}`"
              :class="[
                'program-view-contents-item-link',
                { _active: $route.hash === `#${title.id}` },
              ]"
            >
              <div class="program-view-contents-item-link__content">
                <span>{{ index + 1 }}.</span>
                <span v-html="title.text"></span>
              </div>
            </a>

            <div
              v-if="titleHasExpand(title)"
              class="program-view-contents-item__children"
            >
              <div
                v-for="(i, idx) in title.children"
                :key="i.id"
                class="program-view-contents-item"
              >
                <a
                  :href="`#${i.id}`"
                  :class="[
                    'program-view-contents-item-link',
                    '_child',
                    { _active: $route.hash === `#${i.id}` },
                  ]"
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

    <div ref="view" class="program-view-constructor">
      <ProgramConstructor
        :items="program"
        @change="changeTitle"
        @load="$emit('load')"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ProgramConstructor from '~/components/appConstructor/ProgramConstructor'

export default {
  name: 'ProgramView',
  components: { ProgramConstructor },
  computed: {
    ...mapState('organization', ['program']),
    ...mapState('default', ['lang']),
    ...mapState('scroll', ['y']),
    ...mapGetters('organization', ['programTitles']),
  },
  watch: {
    y() {
      this.stickyHandler()
    },
  },
  mounted() {
    console.log(1)

    window.addEventListener('resize', this.stickyHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.stickyHandler)
  },
  methods: {
    titleHasExpand(title) {
      if (!this.$route.hash) return
      const hash = this.$route.hash.slice(1, this.$route.hash.length)

      return (
        title.id === hash || title.children.find((item) => item.id === hash)
      )
    },
    changeTitle(title) {
      location.hash = `#${title}`
    },
    stickyHandler() {
      const el = this.$refs.contents

      if (!el) return

      const parentRect = el.parentElement.getBoundingClientRect()

      if (parentRect.top <= 40) {
        el.style.position = 'fixed'
        el.style.top = '40px'
        el.style.left = parentRect.left + 'px'
      } else {
        el.style.position = 'absolute'
        el.style.top = '0'
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
  transition: color 0.2s ease;

  &::before {
    content: '';
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $color_accent;
    transition: opacity 0.2s ease;
    opacity: 0;
  }

  &._active {
    color: #000;

    &::before {
      opacity: 1;
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
