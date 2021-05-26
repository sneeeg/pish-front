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
        <h2 class="section-head__title">{{ title }}</h2>
        <ArrowLink
          v-if="to"
          :to="to"
          class="section-head__link"
          :text="
            lang['news.all'] !== title ? lang['news.all'] : lang['base.go']
          "
        />
      </div>
      <div class="section__content">
        <slot name="default" />
      </div>
    </div>
  </component>
</template>

<script>
import { mapState } from 'vuex'
import ArrowLink from '~/components/controls/ArrowLink'
export default {
  name: 'Section',
  components: { ArrowLink },
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
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>
