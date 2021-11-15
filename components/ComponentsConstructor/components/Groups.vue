<template>
  <div class="groups">
    <div v-for="(item, index) in items" :key="index" class="groups-item">
      <div class="groups-item-group">
        <div class="groups-item-group__value" :style="{ background: color }">
          {{ item.groupValue }}
        </div>
        <div class="groups-item-group__label">{{ item.groupLabel }}</div>
      </div>

      <div class="groups-item-count">
        <div class="groups-item-count__value">{{ item.value }}</div>
        <div class="groups-item-count__label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Groups',
  props: {
    items: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      default: '#F32735',
    },
  },
}
</script>

<style lang="scss">
.groups {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  > * {
    &:not(:last-child) {
      margin-bottom: 1.6rem;
    }
  }
}

.groups-item {
  display: flex;
  justify-content: space-between;
  padding: 2.6rem 5.6rem 2.6rem 1.6rem;
  border: 1px solid $color_grey_border;

  @include --mobile {
    padding: 1.2rem;
  }
}

.groups-item-group,
.groups-item-count {
  display: flex;
  align-items: center;

  &__label {
    @include text-small;

    @include --mobile {
      @include text-button-small;
      font-weight: normal;
    }
  }
}

.groups-item-group {
  margin-right: 4.6rem;

  @include --mobile {
    margin-right: 1.6rem;
  }

  &__value {
    @include box(5rem);
    @include text-subtitle;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: $color_white;

    @include --mobile {
      @include box(3.6rem);
    }
  }

  &__label {
    margin-left: 1.6rem;
  }
}

.groups-item-count {
  &__value {
    @include h2;
    font-weight: 700;
    text-align: right;
  }

  &__label {
    margin-left: 1.2rem;
    color: $color_grey_text;
  }
}
</style>
