<template>
  <ComponentsConstructor
    :component-name-processing="changeComponentName"
    :model="program"
    @load="onLoad"
  >
    <template #loader>
      <div class="_program-component__loader">
        <Loader />
      </div>
    </template>

    <template #default="{ model }">
      <div class="program-component">
        <transition name="slide-from-right">
          <ProgramContents
            v-show="window.isDesktopSize || contentsIsActive"
            ref="contents"
            @close="closeContents"
          />
        </transition>

        <ProgramWrapper
          ref="view"
          :items="model"
          class="program-component__view"
        />
      </div>

      <FloatBtn
        v-if="!window.isDesktopSize"
        icon="book"
        @click="openContents"
      />
    </template>
  </ComponentsConstructor>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ComponentsConstructor from '~/components/ComponentsConstructor/ComponentsConstructor'
import ProgramWrapper from '~/components/ProgramWrapper'
import ProgramContents from '~/components/ProgramContents'
import FloatBtn from '~/components/FloatBtn'
import Loader from '~/components/Loader'

const OFFSET = -150

export default {
  name: 'ProgramComponent',

  components: {
    ComponentsConstructor,
    ProgramWrapper,
    ProgramContents,
    FloatBtn,
    Loader,
  },

  data() {
    return {
      hash: '',
      contentsIsActive: false,
    }
  },

  computed: {
    ...mapGetters('organization', ['program', 'programTitles']),
    ...mapState('responsive', ['window']),
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.eventsHandler)
    window.removeEventListener('scroll', this.eventsHandler)
  },

  methods: {
    closeContents() {
      this.contentsIsActive = false
    },

    openContents() {
      this.contentsIsActive = true
    },

    eventsHandler() {
      this.contentsStickyHandler()
      this.inViewHandler()
    },

    inViewHandler() {
      const elems = this.$refs.view.$el.querySelectorAll('[data-title]')

      for (let i = 0; i < elems.length; i++) {
        const elem = elems[i]
        const rect = elem.getBoundingClientRect()
        const title = elem.dataset.title

        if (rect.top + OFFSET > 0 || rect.bottom + OFFSET > 0) {
          this.hash = `#${title}`

          break
        }
      }
    },

    contentsStickyHandler() {
      const el = this.$refs.contents.$el

      if (!el) return

      if (!this.window.isDesktopSize) {
        el.style.position = 'fixed'
        el.style.top = '0'
        el.style.left = '0'
        el.style.bottom = 'auto'

        return
      }

      const parentRect = el.parentElement.getBoundingClientRect()
      const elMaxSize = this.window.height - 81
      const elDiff = elMaxSize - el.offsetHeight

      const bottom = parentRect.bottom - this.window.height + 40 + elDiff

      if (parentRect.top <= 40 && bottom > 0) {
        el.style.position = 'fixed'
        el.style.top = '40px'
        el.style.left = parentRect.left + 'px'
        el.style.bottom = 'auto'
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

    changeComponentName(componentName, item) {
      switch (componentName) {
        case 'Array':
          componentName = 'ArrayGroup'
          break

        case 'Text':
          componentName = 'TextContent'
          break

        case 'Table':
          if (item.props.fixed) {
            componentName = 'FixedTable'
          }
          break

        case 'Checkbox':
          componentName = 'ConstructorCheckbox'
          break
      }

      return componentName
    },

    onLoad() {
      this.$nextTick(() => {
        const hash = this.$route.hash.slice(1, this.$route.hash.length) || ''

        if (hash && hash !== this.programTitles[0].id) {
          window.location.href = `#${hash}`
        }

        this.eventsHandler()

        window.addEventListener('resize', this.eventsHandler)
        window.addEventListener('scroll', this.eventsHandler)
      })
    },
  },
}
</script>

<style lang="scss">
._program-component {
  &__loader {
    height: 20rem;
  }
}

.program-component {
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

  &__view {
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
}
</style>
