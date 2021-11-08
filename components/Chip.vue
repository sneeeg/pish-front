<template>
  <div :style="{ background }" class="chip">
    <div :style="{ color }" class="chip__slot">
      <slot />
    </div>
  </div>
</template>

<script>
import * as chroma from 'chroma-js'

export default {
  name: 'Chip',

  props: {
    color: {
      type: String,
      default: '#6B6B74',
    },
  },

  computed: {
    background() {
      const c = chroma(this.color).rgba()

      return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3] - 0.9})`
    },
  },
}
</script>

<style lang="scss">
.chip {
  @include text-button-small;

  display: flex;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border-radius: 3rem;
  font-weight: 500;

  &__slot {
    width: fit-content;
  }
}
</style>
