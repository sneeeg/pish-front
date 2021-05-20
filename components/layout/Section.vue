<template>
  <component
    :is="tag"
    :class="[
      'section',
      {
        _background: background,
        '_background-absolute': backgroundAbsolute,
      },
    ]"
    :style="{ overflow: hasOverflow ? '' : 'hidden' }"
  >
    <div v-if="isLayout" class="section__content">
      <slot name="default" />
    </div>
    <div v-else class="section__inner">
      <div v-if="title" :class="['section-head']">
        <h2 class="section-head__title">{{ title }}</h2>
      </div>
      <div class="section__content">
        <slot name="default" />
      </div>
    </div>
  </component>
</template>

<script>
export default {
  name: 'Section',
  props: {
    tag: {
      type: String,
      default: 'section',
    },
    title: {
      type: String,
      default: '',
    },
    background: {
      type: Boolean,
      default: false,
    },
    isLayout: {
      type: Boolean,
      default: false,
    },
    hasOverflow: {
      type: Boolean,
      default: true,
    },
    backgroundAbsolute: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
