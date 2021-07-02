<template>
  <div class="accordion">
    <div
      v-for="{ title, model3d, content } in tasks"
      :key="title"
      class="accordion__item"
    >
      <button
        type="button"
        class="accordion__label _visually-h4"
        :class="{ _active: expanded.includes(title) }"
        @click="taskChange(title, model3d)"
      >
        {{ title }}
      </button>

      <TransitionExpand>
        <div v-if="expanded.includes(title)" class="accordion__content">
          <div class="accordion__image-wrapper">
            <img :src="model3d" />
          </div>
          <HTMLContent :html="content" />
        </div>
      </TransitionExpand>
    </div>
  </div>
</template>
<script>
import TransitionExpand from '~/assets/js/utils/TransitionExpand'
import HTMLContent from '~/components/utils/HTMLContent'

export default {
  name: 'Accordion',
  components: {
    TransitionExpand,
    HTMLContent,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    expanded: [],
  }),
  computed: {},
  methods: {
    expandToggle(id) {
      if (this.expanded.includes(id)) {
        const index = this.expanded.indexOf(id)
        this.expanded.splice(index, 1)
      } else {
        this.expanded.splice(0, this.expanded.length)
        this.expanded.push(id)
      }
    },
    taskChange(title, model3d) {
      this.expandToggle(title)
      this.$emit('task-switch', model3d)
    },
  },
}
</script>
<style lang="scss">
.accordion {
  &__item {
    border-bottom: 1px solid $color_grey_border;
  }

  &__label {
    @include arrow-down(1.3rem, 3px, $color_accent);
    @include btn-reset;

    position: relative;
    display: block;
    width: 100%;
    padding: 2.6rem 0;
    font-weight: bold;
    text-align: left;
  }

  &__content {
    &::after {
      display: block;
      height: 3.2rem;
      content: '';
    }
  }

  &__image-wrapper {
    width: 100%;
    height: 18rem;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    @include --from-mobile {
      display: none;
    }

    > img {
      @include adaptiveImg(50%, 50%, contain);
    }
  }
}
</style>
