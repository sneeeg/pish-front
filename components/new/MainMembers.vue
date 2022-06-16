<template>
  <div v-if="mapData" class="members">
    <ul v-if="!window.isMobileSize" class="tabs__list">
      <li
        v-for="{ id, title } in sections"
        :key="id"
        :class="['tabs__item', { _selected: id === currentTabID }]"
        @click="toggleTab(id)"
      >
        {{ title }}
      </li>
    </ul>
    <CustomSelect
      v-else
      :value="currentTabID"
      :items="sections"
      class="tabs__select"
      @input="toggleTab"
    />
    <div ref="content" :key="currentTabID">
      <div v-if="currentTabID === 1" ref="contentItems" class="events__content">
        <MapRegions :items="mapData" />
      </div>
      <div v-else ref="contentItems" class="events__content">
        <MapFounders :items="mapData" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MapFounders from '~/components/new/MembersMap/MapFounders'
import MapRegions from '~/components/new/MembersMap/MapRegions'

export default {
  name: 'MainMembers',
  components: { MapRegions, MapFounders },
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    mapData: null,
    currentTabID: 1,
  }),
  async fetch() {
    const [{ data }] = await Promise.all([this.$api.analytics.get()])
    this.mapData = data.participants_new
  },
  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
  },
  methods: {
    toggleTab(id) {
      this.currentTabID = id
      setTimeout(() => this.createSlider())
    },
  },
}
</script>
