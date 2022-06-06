<template>
  <div v-if="mapData" class="members">
    <Tabs :sections="sections">
      <template #tabs__content>
        <MapRegions :items="mapData" />
        <MapFounders :items="mapData" />
      </template>
    </Tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MapFounders from '~/components/new/MembersMap/MapFounders'
import Tabs from '~/components/new/Tabs'
import MapRegions from '~/components/new/MembersMap/MapRegions'

export default {
  name: 'MainMembers',
  components: { MapRegions, Tabs, MapFounders },
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    mapData: null,
  }),
  async fetch() {
    const [{ data }] = await Promise.all([this.$api.analytics.get()])
    this.mapData = data.participants_new
  },
  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
  },
}
</script>
