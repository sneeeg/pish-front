<template>
  <div class="events">
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
        <CouncilCard
          v-for="content in contents"
          :key="content.id"
          :title="content.title"
          :date-start="content.dateStart"
          :date-end="content.dateEnd"
          :logo="content.logo"
          :status="content.status"
          :city="content.city"
          :avatar="content.avatar"
          :council="content.council"
        />
      </div>
      <div v-else ref="contentItems" class="events__content">
        <MeetingCard
          v-for="content in contents"
          :key="content.id"
          :title="content.title"
          :date="content.date"
          :status="content.status"
          :time-start="content.timeStart"
          :time-end="content.timeEnd"
          :city="content.city"
          :tags="content.tags"
        />
      </div>
    </div>

    <SliderControls
      v-if="sliderInstance"
      :key="sliderInstance"
      :slider-instance="sliderInstance"
      class="tabs__slider-controls"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CustomSelect from '~/components/controls/CustomSelect'
import Slider from '~/assets/js/modules/slider'
import SliderControls from '~/components/SliderControls'
import MeetingCard from '~/components/new/EventsCards/MeetingCard'
import CouncilCard from '~/components/new/EventsCards/CouncilCard'

export default {
  name: 'MainEvents',
  components: { CouncilCard, CustomSelect, MeetingCard, SliderControls },
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    currentTabID: 2,
    sliderInstance: null,
  }),
  computed: {
    ...mapState('responsive', ['window', 'device']),
    contents() {
      return this.sections.find((item) => item.id === this.currentTabID)?.body
    },
  },
  mounted() {
    this.createSlider()
  },
  methods: {
    createSlider() {
      this.sliderInstance?.flickity?.destroy()
      this.sliderInstance = null
      this.sliderInstance = new Slider(this.$refs.contentItems, {
        groupCells: this.window.isDesktopSize
          ? 3
          : this.window.isMobileSize
          ? false
          : this.window.isTabletSize
          ? 2.3
          : 2,
        draggable: this.device.isAdaptive,
        adaptiveHeight: true,
        pageDots: false,
      })
      this.$forceUpdate()
    },
    toggleTab(id) {
      this.currentTabID = id
      setTimeout(() => this.createSlider())
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  &__list {
    display: flex;
    margin-bottom: 4.3rem;
    border-bottom: 1px solid $color_grey_border;

    @include --tablet {
      margin-bottom: 3.2rem;
    }

    @include --mobile {
      margin-bottom: 2.4rem;
    }
  }

  &__item {
    position: relative;
    padding: 16px 0;
    font-size: 12px;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    opacity: 0.3;
    transition: all 300ms ease;

    &:not(:first-child) {
      margin-left: 24px;
    }

    @include --tablet {
      padding: 3px 0;
      font-size: 1.6rem;
      line-height: 2.2rem;
    }

    &::after {
      position: absolute;
      bottom: -2px;
      left: 0;
      display: block;
      width: 100%;
      height: 3px;
      background-color: transparent;
      content: '';
    }

    &._selected {
      opacity: 1;

      &::after {
        background-color: $color_red;
      }
    }
  }

  &__select {
    margin-bottom: 2rem;
  }

  &__content-list {
    min-height: 17.8rem;
    //column-count: 3;

    li {
      //page-break-inside: avoid;
      //break-inside: avoid;
    }

    @include --tablet {
      min-height: 9.2rem;
      //column-count: 2;
    }

    @include --mobile {
      //column-count: auto;
    }
  }

  &__content-item {
    @include text-small;
    position: relative;
    padding: 0 2rem 0 2rem;
    break-inside: avoid-column;

    span {
      color: $color_accent;
    }

    &:not(:first-child) {
      margin-top: 2rem;
    }

    &::before {
      position: absolute;
      top: 0.6rem;
      left: 0;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: $color_red;
      content: '';

      @include --mobile {
        top: 5px;
      }
    }
  }

  &__slider {
    margin-bottom: 3rem;

    &::after {
      display: none;
      content: 'flickity';
    }
  }

  &__slider-controls {
    position: absolute;
    right: 0;
    margin-top: 25px;

    .slider-controls-component-dots {
      display: none;
    }
  }

  &__ceil {
    width: 100%;
    margin-right: 2rem;
    padding: 2.7rem 2.1rem 5.1rem;
    border: 1px solid $color_red;
    overflow: hidden;
  }

  &__title {
    max-width: 75%;
    margin-bottom: 2rem;
    font-weight: bold;
  }
}
</style>
