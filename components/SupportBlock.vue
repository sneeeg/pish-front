<template>
  <div class="support">
    <div class="support__head">
      <h2 class="support__title">{{ title }}</h2>
      <p class="support__subtitle">{{ subtitle }}</p>
    </div>
    <Tabs :sections="sections" />
  </div>
</template>

<script>
import Tabs from '~/components/Tabs'
export default {
  name: 'SupportBlock',
  components: { Tabs },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    sections: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.support {
  &__head {
    margin-bottom: 6.2rem;

    @include --tablet {
      margin-bottom: 4.8rem;
    }

    @include --mobile {
      margin-bottom: 3rem;
    }
  }

  &__title {
    margin: 0;
    font-size: 4rem;
    line-height: 5.2rem;

    @include --tablet {
      font-size: 3rem;
      line-height: 3.2rem;
    }

    @include --mobile {
      font-size: 2rem;
      line-height: 2.6rem;

      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }

    &:not(:last-child) {
      margin-bottom: 1.6rem;
    }
  }

  &__subtitle {
    @include text;
    margin: 0;
    line-height: 2.7rem;

    @include --mobile {
      line-height: 2.4rem;
    }
  }
}
</style>
