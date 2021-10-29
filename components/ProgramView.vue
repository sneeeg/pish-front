<template>
  <div class="program-view">
    <div class="program-view-constructor">
      <ProgramConstructor :items="program" @load="$emit('load')" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProgramConstructor from '~/components/appConstructor/ProgramConstructor'

export default {
  name: 'ProgramView',
  components: { ProgramConstructor },
  computed: {
    ...mapState('organization', ['program']),
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss">
.program-view {
  position: relative;
}
</style>
