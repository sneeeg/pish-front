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
        :data-title="model.id"
        class="program-constructor-model"
      >
        <div class="program-constructor-model__head">
          <div
            v-if="model.title"
            :class="[
              'program-constructor-model__title',
              `_visually-h${isChild ? 6 : 4}`,
            ]"
          >
            {{ model.title }}
          </div>

          <div
            v-if="model.description"
            class="program-constructor-model__description"
          >
            {{ model.description }}
          </div>
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
