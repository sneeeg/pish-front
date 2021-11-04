<template>
  <div class="program-participation">
    <VuetifyTable :headers="headers" :items="items"></VuetifyTable>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VuetifyTable from '~/components/VuetifyTable'

export default {
  name: 'ProgramParticipation',

  components: { VuetifyTable },

  computed: {
    ...mapState('default', ['lang']),
    ...mapState('organization', {
      items: (state) => state.data.programsParticipation,
    }),
    headers() {
      return [
        {
          text: this.lang['analytics.programName'],
          value: 'text',
          sortable: false,
        },
        {
          text: this.lang['analytics.organizationParticipation'],
          value: 'value',
          sortable: false,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
