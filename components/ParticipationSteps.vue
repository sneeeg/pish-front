<template>
  <div class="participation-steps">
    <div
      v-for="(step, index) in steps"
      :key="step.id"
      class="participation-steps-item"
    >
      <div class="participation-steps-item__index">
        {{ index + 1 }}
      </div>

      <div class="participation-steps-item__title">
        {{ step.title }}
      </div>

      <HTMLContent
        :html="step.content"
        class="participation-steps-item__content"
      />
    </div>
  </div>
</template>

<script>
import HTMLContent from '~/components/utils/HTMLContent'
export default {
  name: 'ParticipationSteps',
  components: { HTMLContent },
  props: {
    steps: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.participation-steps {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid $color_accent;

  @include --tablet {
    flex-direction: column;
    border-top: none;
  }

  > * {
    &:not(:last-child) {
      @include --tablet {
        margin-bottom: 3.2rem;
      }
    }
  }
}

.participation-steps-item {
  position: relative;
  max-width: 38rem;

  &__index {
    position: absolute;
    top: -2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: $color_white;
    font-weight: 700;
    background-color: $color_accent;
    @include box(4rem);
  }

  &__title {
    margin-top: 4.4rem;
    font-weight: 700;
  }

  &__content {
    margin-top: 1.6rem;
  }
}
</style>
