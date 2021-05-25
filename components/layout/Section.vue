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
      <div v-if="title" v-scroll-element :class="['section-head']">
        <h2 v-if="!to" class="section-head__title">{{ title }}</h2>
        <SmartLink
          v-else
          class="section-head__title hover-opacity _visually-h2"
          :to="to"
          >{{ title }}</SmartLink
        >
      </div>
      <div class="section__content">
        <slot name="default" />
      </div>
    </div>
  </component>
</template>

<script>
import SmartLink from '~/components/utils/SmartLink'
export default {
  name: 'Section',
  components: { SmartLink },
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
    to: {
      type: [String, Object],
      default: null,
    },
  },
}
</script>
