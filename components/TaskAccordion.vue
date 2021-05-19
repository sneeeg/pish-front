<template>
  <div class="task-accordion">
    <div
      v-for="{ id, label, content } in tasks"
      :key="id"
      class="task-accordion__item"
    >
      <button
        type="button"
        class="task-accordion__label _visually-h5"
        :class="{ _active: expanded.includes(id) }"
        @click="expandToggle(id)"
      >
        {{ label }}
      </button>

      <TransitionExpand>
        <div v-if="expanded.includes(id)" class="task-accordion__content">
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
  name: 'TaskAccordion',
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
        this.expanded.push(id)
      }
    },
    closeAll() {
      this.expanded.splice(0, this.expanded.length)
    },
  },
}
</script>
<style lang="scss">
.task-accordion {
  &__item {
    border-bottom: 1px solid $color_grey_border;
  }

  &__label {
    @include arrow-down(1.3rem, 3px, $color_red);
    @include btn-reset;

    position: relative;
    display: block;
    width: 100%;
    padding: 2.4rem 0;
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
}
</style>
