<template>
  <div class="participants-list">
    <h3 class="participants-list__title _visually-h4">
      {{ lang['analytics.selected'] }} ({{ items.length }})
    </h3>

    <List class="participants-list__list" :items="listItems" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import List from '~/components/List'

export default {
  name: 'ParticipantsList',
  components: { List },
  props: {
    items: {
      type: Array,
      required: true,
    },

    dv: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
    listItems() {
      return this.items.reduce((acc, item) => {
        acc.push({
          label: item.name,
          text: this.dv
            ? ''
            : `${item.region} ${this.lang['analytics.region']} , ${item.location}`,
          to: this.dv ? `/dvo/${item.id}/about` : `/analytics/${item.id}/about`,
        })

        return acc
      }, [])
    },
  },
}
</script>

<style lang="scss">
.participants-list {
  &__title {
    font-weight: 700;
  }

  &__list {
    margin-top: 3.2rem;
  }
}
</style>
