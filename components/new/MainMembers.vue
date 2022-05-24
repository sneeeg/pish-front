<template>
  <div class="members">
    <Tabs :sections="sections">
      <template #tabs__content>
        <div class="members__content">
          <div class="content__list">
            <ul>
              <li v-for="index in 20" :key="index" class="list-item">
                <p>НИУ ВШЭ {{ index }}</p>
                <span>Центральный федеральный округ, г.Москва</span>
              </li>
            </ul>
          </div>
          <div class="content__map">
            <MapFounders v-if="data" :items="data.participants" />
          </div>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MapFounders from '~/components/new/MembersMap/MapFounders'
import Tabs from '~/components/new/Tabs'

const GROUPS = [
  'Группа 1 - участники программы (основной трек)',
  'Группа 2 - университеты творческой направленности',
  'Группа 3 - кандидаты на участие в программе',
  'Группа 4 - участники программы (реорганизация)',
]

export default {
  name: 'MainMembers',
  components: { Tabs, MapFounders },
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    data: null,
  }),
  async fetch() {
    this.isLoading = true

    const [{ data }] = await Promise.all([this.$api.analytics.get()])

    data.participants.forEach((participant) => {
      participant.group = GROUPS[+participant.group - 1]
      participant.direction = []

      if (participant.isBase) {
        participant.direction.push('Базовая часть')
      }

      if (participant.special) {
        participant.direction.push(participant.special)
      }
    })

    this.data = data
  },
  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
  },
}
</script>

<style lang="scss" scoped>
.members {
  &__content {
    display: flex;

    .content {
      &__list {
        @include scrollbar;
        overflow: auto;
        max-height: 511px;

        .list-item {
          &:not(:first-child) {
            margin-top: 24px;
          }
        }
      }
    }
  }
}
</style>
