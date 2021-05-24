<template>
  <div class="accordion-block">
    <Accordion :tasks="tasks" @task-switch="switch3dModel" />
    <div v-scroll-element class="accordion-block__image-wrapper">
      <img :src="model3d" />
    </div>
  </div>
</template>

<script>
import Accordion from '~/components/Accordion'

export default {
  name: 'AccordionBlock',
  components: {
    Accordion,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      model3d: this.tasks[0].model3d,
    }
  },
  methods: {
    switch3dModel(modelSrc) {
      this.model3d = modelSrc
    },
  },
}
</script>

<style lang="scss">
.accordion-block {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  .accordion {
    flex: 0 0 57%;
    margin: -2.4rem 6.4rem 0 0;

    @include --tablet {
      margin: 0 4rem 0 0;
    }

    @include --mobile {
      flex: 0 0 100%;
      margin: 0;
    }
  }

  &__image-wrapper {
    position: relative;
    flex: 1 1 auto;

    @include --mobile {
      display: none;
    }

    &::before {
      display: block;
      padding-top: 75%;
      content: '';

      @include --tablet {
        padding-top: 100%;
      }
    }

    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      max-width: 100%;
      max-height: 125%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
