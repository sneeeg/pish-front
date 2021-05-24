<template>
  <Section ref="participation" v-view="scrollHandler" :title="title">
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
  min-height: 39rem;
  padding: 0 0 0 calc((100% + 3rem) / 2);

  @include --tablet {
    min-height: 29rem;
  }

  @include --mobile {
    min-height: auto;
    padding: 0 0 16.4rem;
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
    margin: 0 0 9.6rem;
    padding-right: 3.2rem;

    @include --tablet {
      margin: 0 0 6.4rem;
    }

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
