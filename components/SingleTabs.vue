<template>
  <div v-if="window.isDesktopSize" class="simple-tabs">
    <button
      v-for="item in items"
      :key="item.id"
      :class="['simple-tabs-item', { _active: value === item.id }]"
      @click="
        $emit('input', item.id)
        $emit('change', item.id)
      "
    >
      <span class="_visually-h4">{{ item.text }}</span>
    </button>
  </div>

  <CustomSelect
    v-else
    :value="value"
    :items="items"
    @input="
      $emit('input', $event)
      $emit('change', $event)
    "
  >
  </CustomSelect>
</template>

<script>
import { mapState } from 'vuex'
import CustomSelect from '~/components/controls/CustomSelect'

export default {
  name: 'SingleTabs',
  components: { CustomSelect },
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    ...mapState('responsive', ['window']),
  },
}
</script>

<style lang="scss">
.simple-tabs {
  display: flex;
  border-bottom: 1px solid $color_grey_text;
}

.simple-tabs-item {
  @include btn-reset;
  position: relative;
  flex: 1 1 50%;
  padding-bottom: 2.4rem;
  color: $color_grey_text;

  &::after {
    position: absolute;
    bottom: -1.5px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: $color_accent;
    opacity: 0;
    transition: opacity 0.3s;
    content: '';
  }

  span {
    display: block;
    color: $color_grey_text;
    font-weight: 700;
    transition: color 0.3s;
  }

  &._active {
    &::after {
      opacity: 1;
    }

    span {
      color: $color_black;
    }
  }
}
</style>
