<template>
  <div class="architecture-block">
    <Architecture
      :left="architecture.left"
      :center="architecture.center"
      :right="architecture.right"
    />
    <Principles
      v-if="architecture.principles"
      :title="architecture.principles.title"
      :content="architecture.principles.content"
    />
  </div>
</template>

<script>
import Architecture from '~/components/Architecture'
import Principles from '~/components/Principles'

export default {
  name: 'ArchitectureBlock',
  components: { Architecture, Principles },
  props: {
    architecture: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.architecture-block {
  //@include --from-mobile {
  //  padding-bottom: 3.2rem;
  //}

  //> .architecture {
  //  margin-bottom: 9.8rem;
  //
  //  @include --mobile {
  //    margin-bottom: 5.2rem;
  //  }
  //}

  > .principles {
    @include --from-mobile {
      max-width: 70%;
    }
  }
}
</style>
