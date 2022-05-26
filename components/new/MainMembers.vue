<template>
  <div class="members">
    <Tabs :sections="sections">
      <template #tabs__content>
        <div class="members__content">
          <div class="content__list">
            <SearchSelect />
            <ul class="list">
              <li v-for="index in 20" :key="index" class="list-item">
                <div class="list-item__logo">
                  <img src="i/new/members/logo-1.png" alt="logo" />
                </div>
                <div class="list-item__title">
                  <p>НИУ ВШЭ {{ index }}</p>
                  <span class="description"
                    >Центральный федеральный округ, г.Москва</span
                  >
                </div>
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
import SearchSelect from '~/components/Controls/SearchSelect'

const GROUPS = [
  'Группа 1 - участники программы (основной трек)',
  'Группа 2 - университеты творческой направленности',
  'Группа 3 - кандидаты на участие в программе',
  'Группа 4 - участники программы (реорганизация)',
]

export default {
  name: 'MainMembers',
  components: { SearchSelect, Tabs, MapFounders },
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
        padding-right: 10px;

        .list {
          @include scrollbar;
          max-height: 511px;
          overflow: auto;
        }

        .list-item {
          &:not(:first-child) {
            margin-top: 24px;
          }

          &__title {
            @include p;
            margin-left: 24px;

            .description {
              margin-top: 4px;
              color: $color_grey_text;
              font-size: 1.2rem;
              line-height: 1.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
