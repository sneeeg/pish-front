<template>
  <Section
    ref="participation"
    v-view="scrollHandler"
    class="_participation"
    :title="title"
  >
    <div class="participation">
      <h3 v-scroll-element class="participation__title">{{ subtitle }}</h3>
      <p v-scroll-element class="participation__text">{{ text }}</p>
      <ArrowLink v-scroll-element :to="href" text="подробнее" />
    </div>
  </Section>
</template>

<script>
import ArrowLink from '~/components/controls/ArrowLink'
import Section from '~/components/layout/Section'

export default {
  name: 'Participation',
  components: { Section, ArrowLink },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      motionIsActive: false,
    }
  },
  mounted() {
    this.$motion?.scenes.dna.init(this.$refs.participation.$el)
  },
  methods: {
    scrollHandler(event) {
      this.$utils.scrollCenterDetection(event)

      if (event.type === 'enter' && !this.motionIsActive) {
        this.motionIsActive = true

        this.$motion?.scenes.dna.start()
      } else if (event.type === 'exit' && this.motionIsActive) {
        this.motionIsActive = false

        this.$motion?.scenes.dna.freeze()
      }
    },
  },
}
</script>

<style lang="scss">
.participation {
  position: relative;
  min-height: 30rem;

  @include --tablet {
    min-height: auto;
  }

  &__title {
    margin: 0 0 1.9rem;
    color: $color_accent;
    font-weight: bold;
    font-size: 1.6rem;
    line-height: 1.8rem;
    text-transform: uppercase;

    @include --tablet {
      margin: 0 0 1.6rem;
    }

    @include --mobile {
      margin: 0 0 2.6rem;
      font-size: 1.4rem;
    }
  }

  &__text {
    @include text-big;
    margin: 0 0 4rem;
    padding-right: 3.2rem;

    @include --mobile {
      margin: 0 0 2.7rem;
    }
  }

  > .arrow-link {
    display: inline-flex;
    color: $color_accent;
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
}
</style>
