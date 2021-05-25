<template>
  <div class="custom-select">
    <select aria-label="select" :value="value" class="pointer" @change="emit">
      <option v-for="item in items" :key="item.id" :value="item.id">
        {{ item.text }}
      </option>
    </select>
    <SvgIcon name="arrow-bottom" />
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    emit(event) {
      const value = event.target.value
      this.$emit('input', !isNaN(parseInt(value)) ? parseInt(value) : value)
    },
  },
}
</script>

<style lang="scss">
.custom-select {
  position: relative;
  border-bottom: 1px solid $color_grey_text;
  color: $color_accent;

  select {
    width: 100%;
    padding: 0 2rem 0.6rem 0;
    border: 0;
    color: inherit;
    font-size: 1.4rem;
    line-height: 1.8rem;
    text-transform: uppercase;
    background: transparent;
    appearance: none;

    option {
      color: $color_black;
    }
  }

  svg {
    position: absolute;
    top: 4px;
    right: 0;
    pointer-events: none;
    @include box(1.2rem);
  }
}
</style>
