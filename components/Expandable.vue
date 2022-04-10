<template>
  <div class="expandable">
    <button
      type="button"
      class="expandable__label"
      :class="{ _active: isLocalExpanded }"
      @click="isLocalExpanded = !isLocalExpanded"
    >
      <slot name="title" :is-active="isLocalExpanded"></slot>
    </button>

    <div class="expandable__content-wrap">
      <TransitionExpand>
        <div v-if="isLocalExpanded" class="expandable__content">
          <slot></slot>
        </div>
      </TransitionExpand>
    </div>
  </div>
</template>
<script>
import TransitionExpand from '~/assets/js/utils/TransitionExpand'

export default {
  name: 'Expandable',
  components: {
    TransitionExpand,
  },
  props: {
    isInitialExpanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLocalExpanded: this.isInitialExpanded,
    }
  },
}
</script>
<style scoped></style>
