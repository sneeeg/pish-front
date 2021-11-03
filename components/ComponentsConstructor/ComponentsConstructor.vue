<template>
  <div class="components-constructor">
    <div
      v-if="isLoading && !$slots.loader"
      class="components-constructor__loading"
    >
      Loading...
    </div>

    <slot v-else-if="isLoading" name="loader" />
    <slot v-else name="default" :model="localModel"></slot>
  </div>
</template>

<script>
/**
 * Utils
 */
const utils = {
  cloneObject: (object = {}) => JSON.parse(JSON.stringify(object)),
}

export default {
  name: 'AppConstructor',

  props: {
    /**
     * Model
     */
    model: {
      type: [Array, Object],
      required: true,
    },

    /**
     * Component key,
     * this key must be only for required component
     */
    componentKey: {
      type: String,
      default: 'component',
    },

    /**
     * If you need to process components names
     */
    componentNameProcessing: {
      type: Function,
      default: (componentName, obj) => componentName,
    },
  },

  data() {
    return {
      isLoading: true,
      hasReload: false,
      componentsToLoad: [],
      localModel: null,
    }
  },

  watch: {
    /**
     * Watching for input model
     */
    model: {
      handler(model) {
        this.localModel = utils.cloneObject(model)
        this.getComponentsToLoad()
      },
      deep: true,
    },

    /**
     * Watching for components to load
     */
    componentsToLoad() {
      this.loadComponents()
    },
  },

  /**
   * Starting setup
   */
  mounted() {
    this.localModel = utils.cloneObject(this.model)
    this.getComponentsToLoad()
  },

  methods: {
    /**
     * Get unique array of required components
     */
    getComponentsToLoad() {
      const result = []

      /**
       * Recursively getting components names
       * @param obj
       */
      const getComponentsNamesByKey = (obj) => {
        Object.keys(obj).forEach((key) => {
          const value = obj[key]

          if (key === this.componentKey) {
            obj[key] = this.componentNameProcessing(value, obj)
            result.push(obj[key])
          } else if (value && typeof value === 'object') {
            getComponentsNamesByKey(value)
          }
        })
      }

      getComponentsNamesByKey(this.localModel)
      this.componentsToLoad = [...new Set(result)]
    },

    async loadComponents() {
      // Emit reload
      if (this.hasReload) {
        this.$emit('reload')
      } else {
        this.hasReload = true
      }

      this.isLoading = true

      const imports = this.componentsToLoad.map((component) =>
        import(
          `~/components/ComponentsConstructor/components/${component}.vue`
        ).then((obj) => obj.default)
      )

      const components = await Promise.all(imports)

      /**
       * Recursively setting components
       * @param obj
       */
      const setComponents = (obj) => {
        Object.keys(obj).forEach((key) => {
          const value = obj[key]

          if (key === this.componentKey) {
            obj[key] = components.find(
              (component) => component.name === obj[key]
            )
          } else if (value && typeof value === 'object') {
            setComponents(value)
          }
        })
      }

      setComponents(this.localModel)

      this.isLoading = false
      this.$emit('load', this.localModel)
    },
  },
}
</script>
