<template>
  <AppConstructor
    :class="['program-constructor', { _child: isChild }]"
    :models="_items"
    @load="$emit('load')"
  >
    <template #default="{ constructorModels }">
      <div
        v-for="(model, index) in constructorModels"
        :key="index"
        v-view="isChild ? false : viewHandler"
        :data-title="
          (model.title || model.props.title) && !isChild
            ? `title_${index + 1}`
            : false
        "
        class="program-constructor-model"
      >
        <div
          v-if="model.title || model.description"
          class="program-constructor-model__head"
        >
          <div
            v-if="model.title"
            :class="[
              'program-constructor-model__title',
              `_visually-h${isChild ? 6 : 4}`,
            ]"
            v-html="model.title"
          ></div>

          <div
            v-if="model.description"
            class="program-constructor-model__description"
            v-html="model.description"
          ></div>
        </div>

        <component
          :is="model.component"
          class="program-constructor-model__component"
          v-bind="model.props"
        />
      </div>
    </template>
  </AppConstructor>
</template>

<script>
import AppConstructor from '~/components/appConstructor'

export default {
  name: 'ProgramConstructor',
  components: { AppConstructor },
  props: {
    items: {
      type: Array,
      required: true,
    },
    isChild: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      titleIndex: 0,
    }
  },
  computed: {
    _items() {
      return this.$utils.cloneObject(this.items).reduce((acc, item) => {
        if (item.component === 'Title') {
          const title = item.title
          item.title = ''

          if (!item.props.title) {
            item.props.title = title
          }
        }

        acc.push(item)
        return acc
      }, [])
    },
  },
  methods: {
    viewHandler(e) {
      if (e.type !== 'enter') return

      const title = e.target.element.parentElement.dataset.title

      if (title) {
        this.$emit('change', title)
      }
    },
  },
}
</script>

<style lang="scss">
.program-constructor-model {
  &:not(:last-child) {
    margin-bottom: 2.4rem;
  }

  &__head {
    margin-bottom: 1.8rem;
  }

  &__title {
    font-weight: 500;
  }
}
</style>
