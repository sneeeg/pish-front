<template>
  <div>
    <Loader v-if="isLoading && showLoading" />

    <slot v-else-if="!isLoading" :constructorModels="constructorModels"></slot>
  </div>
</template>

<script>
import Loader from '~/components/Loader'
export default {
  name: 'AppConstructor',
  components: { Loader },
  props: {
    models: {
      type: Array,
      required: true,
    },
    modelsToLoad: {
      type: [Array, undefined],
      default: undefined,
    },
    showLoading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLoading: false,
      constructorModels: [],
    }
  },
  async fetch() {
    this.isLoading = true

    const imports = this.componentsToLoad.map((component) =>
      import(`~/components/appConstructor/models/${component}.vue`).then(
        (obj) => obj.default
      )
    )

    const components = await Promise.all(imports)

    this.constructorModels = this._models.reduce((acc, item) => {
      const name = item.component
      item.component = components.find((component) => component.name === name)

      acc.push(item)
      return acc
    }, [])

    this.isLoading = false
    this.$emit('load')
  },
  computed: {
    _models() {
      return this.$utils.cloneObject(this.models).reduce((acc, item) => {
        if (item.component === 'Array') item.component = 'ArrayGroup'
        else if (item.component === 'Text') item.component = 'TextContent'
        else if (item.component === 'Table' && item.props.fixed)
          item.component = 'FixedTable'

        acc.push(item)
        return acc
      }, [])
    },
    componentsToLoad() {
      if (this.modelsToLoad) {
        return this.$utils.cloneObject(this.modelsToLoad)
      } else {
        const items = this._models

        return [...new Set(items.map((model) => model.component))]
      }
    },
  },
}
</script>

<style scoped></style>
