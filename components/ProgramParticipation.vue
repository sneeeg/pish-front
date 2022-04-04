<template>
  <div :class="['program-participation', { _padding: padding }]">
    <VuetifyTable :headers="headers" :items="items">
      <template #value="{ value }">
        <div class="program-participation__chip">
          <Chip :color="value ? '#F32735' : '#6B6B74'">
            {{
              value
                ? lang['analytics.hasParticipation']
                : lang['analytics.hasNoParticipation']
            }}
          </Chip>
        </div>
      </template>
    </VuetifyTable>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VuetifyTable from '~/components/VuetifyTable'
import Chip from '~/components/Chip'

export default {
  name: 'ProgramParticipation',

  components: { VuetifyTable, Chip },

  props: {
    padding: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState('default', ['lang']),
    ...mapState('organization', {
      items: (state) => state.data.programsList,
    }),
    headers() {
      return [
        {
          text: this.lang['analytics.programName'],
          value: 'name',
          sortable: false,
        },
        {
          text: this.lang['analytics.organizationParticipation'],
          value: 'isParticipated',
          sortable: false,
          align: 'end',
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.program-participation {
  background-color: #ffffff;

  &._padding {
    padding: 2.4rem;

    @include --mobile {
      padding: 1.6rem;
    }
  }

  &__chip {
    display: flex;
    justify-content: flex-end;

    > * {
      width: 17rem;
    }
  }
}
</style>
