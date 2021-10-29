<template>
  <AppConstructor
    class="program-constructor"
    :models="items"
    @load="$emit('load')"
  >
    <template #default="{ constructorModels }">
      <div
        v-for="(model, index) in constructorModels"
        :key="index"
        :data-title="model.id"
        class="program-constructor-model"
      >
        <div
          v-if="!model.props.hasExpansion"
          class="program-constructor-model__head"
        >
          <div
            v-if="model.title"
            class="program-constructor-model__title _visually-h3"
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
          v-bind="
            model.props.hasExpansion
              ? { ...model.props, ...{ title: model.title } }
              : model.props
          "
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
  },
}
</script>
