<template>
  <div class="stages">
    <div
      v-for="(stage, i) in stages"
      :key="i"
      :class="['stage', { _last: i === stages.length - 1 }]"
    >
      <span class="stage__index"> {{ stage.date }} </span>
      <!-- eslint-disable vue/no-v-html -->
      <h3 v-if="stage.title" class="stage__title">
        <HTMLContent v-html="stage.title" />
      </h3>
      <!--eslint-enable-->

      <div
        v-for="(substage, j) in stage.items"
        :key="j"
        :class="['substage', { _noContent: !substage.content }]"
      >
        <template v-if="substage.content !== 'kek'">
          <h4
            class="substage__title"
            :class="{ _active: isActive(i, j) }"
            @click="toggle(i, j)"
          >
            <span v-html="substage.title"></span>
          </h4>
          <div class="substage__content">
            <TransitionExpand>
              <!-- eslint-disable vue/no-v-html -->
              <HTMLContent
                v-if="isActive(i, j)"
                v-html="substage.content"
              ></HTMLContent>
              <!--eslint-enable-->
            </TransitionExpand>
          </div>
        </template>

        <HTMLContent v-else-if="substage.title" :html="substage.title" />
      </div>
    </div>
  </div>
</template>
<script>
import TransitionExpand from '~/assets/js/utils/TransitionExpand'
import HTMLContent from '~/components/utils/HTMLContent'

export default {
  name: 'TheStages',
  components: {
    TransitionExpand,
    HTMLContent,
  },
  props: {
    stages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: [],
    }
  },
  methods: {
    toggle(i, j) {
      const item = `${i}${j}`
      if (!this.active.includes(item)) {
        this.active.push(item)
      } else {
        const index = this.active.indexOf(item)
        this.active.splice(index, 1)
      }
    },
    isActive(i, j) {
      const item = `${i}${j}`
      return this.active.includes(item)
    },
  },
}
</script>
<style lang="scss">
.stages {
  padding-left: 3.2rem;

  @include --tablet {
    padding-left: 3.8rem;
  }

  @include --mobile {
    padding-left: 0;
  }

  strong {
    color: $color_accent;
  }
}

.stage {
  position: relative;
  padding: 3.7rem 0 0 7rem;

  &:first-child {
    padding-top: 0;
  }

  &._last {
    display: none;
    padding: 5.6rem 0 4rem 7rem;

    @include --mobile {
      padding-left: 0;
    }
  }

  @include --mobile {
    padding-top: 2.4rem;
    padding-left: 0;
  }

  @include --from-mobile {
    &:not(:last-child) {
      &::before {
        position: absolute;
        bottom: 0;
        left: -1px;
        z-index: 2;
        display: block;
        width: 1px;
        height: 100%;
        background: #000000;
        content: '';
      }
    }

    // ??????????
    &:first-child .stage__index::after {
      @include box(1.6rem);
      position: absolute;
      top: 100%;
      left: 50%;
      border-radius: 50%;
      background: #000000;
      transform: translatex(-53%);
      content: '';
    }
  }

  &:first-child {
    &::before {
      height: calc(100% - 3.7rem);
    }
  }

  &:nth-last-child(2) {
    &::before {
      top: 0;
      bottom: auto;
      height: 8rem;
    }

    &::after {
      top: 12.5rem;
      left: 0;
    }
  }

  &:last-child {
    &::after {
      position: absolute;
      top: 0;
      left: calc(50% - 70vw);
      z-index: -2;
      width: 120vw;
      height: 100%;
      //background: #e1e4e8;
      content: '';
    }

    .stage__index {
      //background: #e1e4e8;
    }

    .substage__content::before {
      //background: #f0f3f8;
    }

    a.lk-link::before {
      border-color: $color_mid_grey;
    }
  }

  &__index {
    display: inline-block;
    color: $color_accent;
    font-weight: 500;
    background-color: $color_light_grey;

    @include --from-mobile {
      @include text-small;
      position: absolute;
      left: 0;
      z-index: 3;
      padding: 2rem 1.5rem;
      transform: translate(-50%, -3px);
    }
  }

  &__title {
    position: relative;
    padding: 1rem 0;
    font-size: 2rem;
    line-height: 2.3rem;
  }
}

.substage {
  color: $color_light_grey;

  &__title {
    display: flex;
    align-items: flex-start;
    padding: 1.2rem 0 2.4rem 0;
    color: #000;
    font-weight: 400;
    font-size: 2rem;
    line-height: 2.3rem;
    cursor: pointer;

    ._noContent & {
      pointer-events: none;

      &::before {
        visibility: hidden;
      }
    }

    @include --mobile {
      @include text;
    }

    &::before {
      position: relative;
      top: 0.6rem;
      display: inline-block;
      width: 2rem;
      min-width: 2rem;
      height: 1.1rem;
      margin-right: 1.6rem;
      vertical-align: middle;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l9 9 9-9' stroke='%23F32735' stroke-width='2'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: 50%;
      transition: transform 0.25s ease;
      content: '';
    }

    &._active {
      &::before {
        transform: rotate(-180deg);
      }
    }
  }

  &__content {
    position: relative;
    z-index: 1;
    padding-left: 3.5rem;

    &::before {
      position: absolute;
      left: calc(50% - 3.5rem - 50vw);
      z-index: -1;
      width: 100vw;
      height: 100%;
      background: #fff;
      content: '';

      @include --mobile {
        left: calc(50% - 50vw);
      }
    }

    .html-content {
      &::before,
      &::after {
        display: block;
        height: 2.4rem;
        content: '';
      }

      &::after {
        height: 3.5rem;
      }
    }
  }
}
</style>
