<template>
  <div v-view="$utils.scrollCenterDetection" class="support">
    <div class="support__head">
      <h2 v-scroll-element class="support__title">{{ title }}</h2>
      <p v-if="subtitle" v-scroll-element class="support__subtitle">
        {{ subtitle }}
      </p>
    </div>
    <div class="support__content">
      <Tabs
        v-scroll-element
        class="support__tabs"
        :sections="sections"
        @change="changeImage"
      />
      <div
        v-show="window.isDesktopSize"
        ref="images"
        v-scroll-element="'right'"
        class="support__images"
      >
        <img src="/i/tasks/1.png" :style="{ height: '27.3rem' }" alt="" />
        <img src="/i/tasks/2.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState } from 'vuex'
import Tabs from '~/components/Tabs'

export default {
  name: 'SupportBlock',
  components: { Tabs },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    sections: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState('responsive', ['window']),
  },
  mounted() {
    const images = this.$refs.images.querySelectorAll('img')

    gsap.set(images[1], { opacity: 0, visibility: 'hidden' })
  },
  methods: {
    changeImage(val) {
      const images = this.$refs.images.querySelectorAll('img')
      const now = images[val]
      const then = images[!val ? 1 : 0]

      gsap.to(now, { opacity: 0, visibility: 'hidden', duration: 1 })
      gsap.to(then, { opacity: 1, visibility: 'visible', duration: 1 })
    },
  },
}
</script>

<style lang="scss">
.support {
  position: relative;

  &__head {
    margin-bottom: 6.2rem;

    @include --tablet {
      margin-bottom: 4.8rem;
    }

    @include --mobile {
      margin-bottom: 3rem;
    }
  }

  &__tabs {
    margin-right: 45rem;

    @include --tablet {
      margin-right: 0;
    }
  }

  &__images {
    position: absolute;
    top: 15rem;
    right: 0;
    width: 36rem;
    height: 31.6rem;
    margin-left: 10rem;

    img {
      @include box(100%);
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &__title {
    margin: 0;
    font-size: 4rem;
    line-height: 5.2rem;

    @include --tablet {
      font-size: 3rem;
      line-height: 3.2rem;
    }

    @include --mobile {
      font-size: 2rem;
      line-height: 2.6rem;

      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }

    &:not(:last-child) {
      margin-bottom: 1.6rem;
    }
  }

  &__subtitle {
    @include text;
    margin: 0;
    line-height: 2.7rem;

    @include --mobile {
      line-height: 2.4rem;
    }
  }
}
</style>
