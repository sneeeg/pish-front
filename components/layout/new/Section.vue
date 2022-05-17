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
      <slot v-if="$slots.prehead" name="prehead" />

      <div
        v-if="title && !tagTitle"
        :class="['section-head', { _smallHead: smallHead }]"
      >
        <h2 class="section-head__title" v-html="title"></h2>

        <div v-if="$slots.head" class="section-head__slot">
          <slot name="head" />
        </div>
      </div>
      <div v-if="tagTitle" :class="['section-head']">
        <h2 class="section-head__title">
          <span>{{ lang['news.tagTitle'] }}</span
          ><span class="_colored"> #{{ tagTitle }} </span>
        </h2>
      </div>

      <div class="section__content">
        <slot name="default" />
      </div>

      <ArrowLink
        v-if="to && !$slots.head"
        :to="to"
        class="section-head__link"
        :text="
          arrowText ||
          (lang['news.all'] !== title ? lang['news.all'] : lang['base.go'])
        "
      />
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
    tagTitle: {
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
    arrowText: {
      type: String,
      default: '',
    },
    smallHead: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>
