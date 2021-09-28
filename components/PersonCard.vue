<template>
  <div :class="['person-card', { _colored: colored }]">
    <div class="person-card__image">
      <img :src="person.image" :alt="person.name" />
    </div>

    <div class="person-card__content">
      <div class="person-card__name">
        {{ person.name }}
      </div>

      <div class="person-card__description">
        {{ person.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonCard',
  props: {
    colored: {
      type: Boolean,
      default: false,
    },
    person: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.person-card {
  display: flex;
  min-height: 16.9rem;
  background-color: $color_white;

  &._colored {
    background-color: $color_background;
  }

  &__picture {
    flex-shrink: 0;
    width: 10.3rem;
    height: 16.9rem;
  }

  &__content {
    padding: 2.4rem;
  }

  &__name {
    font-weight: bold;
    line-height: 2.7rem;
  }

  &__description {
    @include text-small;
    margin-top: 1rem;
  }
}
</style>
