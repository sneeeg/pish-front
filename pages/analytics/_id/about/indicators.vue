<template>
  <div class="indicators-container">
    <div class="indicators-tabs-controls">
      <template v-if="window.isDesktopSize">
        <button
          v-if="!!sections['base']"
          type="button"
          class="indicators-tabs-btn"
          :class="{ _active: tab === 'base' }"
          @click="tab = 'base'"
        >
          БАЗОВАЯ ЧАСТЬ ГРАНТА
        </button>
        <button
          v-if="!!sections['special']"
          type="button"
          class="indicators-tabs-btn"
          :class="{ _active: tab === 'special' }"
          @click="tab = 'special'"
        >
          СПЕЦИАЛЬНАЯ ЧАСТЬ ГРАНТА
        </button>
        <button
          v-if="!!sections['grant']"
          type="button"
          class="indicators-tabs-btn"
          :class="{ _active: tab === 'grant' }"
          @click="tab = 'grant'"
        >
          показатели результата
        </button>
      </template>

      <CustomSelect
        v-else
        :value="tab"
        :items="[
          { id: 'base', text: 'БАЗОВАЯ ЧАСТЬ ГРАНТА' },
          { id: 'special', text: 'СПЕЦИАЛЬНАЯ ЧАСТЬ ГРАНТА' },
          { id: 'grant', text: 'показатели результата' },
        ]"
        @input="tab = $event"
      />
    </div>

    <div class="indicators">
      <Indicator
        v-for="(indicator, index) in sections[tab]"
        :key="`${tab}-${index}`"
        :indicator="indicator"
      ></Indicator>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Indicator from '~/components/indicators/Indicator'
import CustomSelect from '~/components/controls/CustomSelect'

export default {
  name: 'Indicators',
  components: {
    Indicator,
    CustomSelect,
  },
  async asyncData({ $api, route }) {
    const { data } = await $api.analytics.getIndicatorsById(route.params.id)

    return {
      sections: data,
    }
  },
  data() {
    return {
      tab: 'base',
    }
  },
  computed: {
    ...mapState('responsive', ['window']),
  },
}
</script>

<style lang="scss">
.indicators-container {
  @include container;
  margin: 0 auto;
  padding: 3.2rem 0;
}

.indicators {
}

.indicators-tabs-controls {
  display: flex;
  margin-bottom: 6.4rem;

  @include --mobile {
    margin-bottom: 3.2rem;
  }

  > :not(:last-child) {
    margin-right: 1rem;
  }
}

.indicators-tabs-btn {
  height: 4.7rem;
  padding: 0 1.6rem;
  border: 0;
  border-radius: 3rem;
  color: $color_grey_text;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 4.7rem;
  text-transform: uppercase;
  background: $color_grey_border;
  transition: 0.3s ease;

  &._active {
    color: #fff;
    background: $color_dark_grey;
  }
}
</style>
