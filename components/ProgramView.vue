<template>
  <div class="program-view"></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProgramView',
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
