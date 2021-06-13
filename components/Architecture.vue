<template>
  <div class="architecture">
    <div class="architecture-component _side">
      <h3 class="architecture-component__title _visually-h4">
        {{ left.title }}
      </h3>
      <div class="architecture-component__content">
        <div class="architecture-item _row">
          <svg
            class="architecture-item__icon"
            width="63"
            height="77"
            viewBox="0 0 63 77"
            fill="none"
          >
            <path
              d="M0.500252 16.95V19.383H18.9364V4.46808V3.96808H19.4364H44.4577H44.9577V4.46808V58.5319V59.0319H44.4577H4.46834H3.96834V58.5319V26.6383H0.500252V62.5H48.4258V0.5H15.4683V0.641479L15.3367 0.784899L0.500252 16.95ZM14.6002 6.81062L15.4683 5.86586V7.14894V15.4149V15.9149H14.9683H7.37259H6.23409L7.00443 15.0766L14.6002 6.81062Z"
              fill="#344887"
              stroke="#344887"
            />
            <path d="M54 6V68H6" stroke="#344887" stroke-width="4" />
            <path d="M61 13V75H13" stroke="#344887" stroke-width="4" />
          </svg>
          <p class="architecture-item__name">{{ left.iconText }}</p>
        </div>
      </div>
    </div>
    <div class="architecture-component _center">
      <h3 class="architecture-component__title _visually-h4">
        {{ center.title }}
      </h3>
      <div class="architecture-component__content">
        <div
          v-for="({ id, title, subtitle, content }, index) in center.items"
          :key="id"
          :class="[
            'architecture-item',
            '_center',
            { _fluid: index === 0 || index === 3 },
          ]"
        >
          <div v-if="title" class="architecture-item__head">
            <p class="architecture-item__name">
              {{ title }}
            </p>
            <p class="architecture-item__clarification">
              {{ subtitle }}
            </p>
          </div>
          <HTMLContent
            v-if="content"
            class="architecture-item__content"
            :html="content"
          />
        </div>
      </div>
    </div>
    <div class="architecture-component _side">
      <h3 class="architecture-component__title _visually-h4">
        {{ right.title }}
      </h3>
      <div class="architecture-component__content">
        <div class="architecture-item">
          <svg
            class="architecture-item__icon"
            width="114"
            height="56"
            viewBox="0 0 114 56"
            fill="none"
          >
            <path
              d="M57.2157 0C49.759 0 43.7363 6.02272 43.7363 13.336C43.7363 20.6493 49.759 26.672 57.2157 26.672C64.6724 26.672 70.6952 20.6493 70.6952 13.336C70.6952 6.02272 64.6724 0 57.2157 0ZM57.2157 23.0871C51.91 23.0871 47.4647 18.7851 47.4647 13.336C47.4647 7.88689 51.91 3.58495 57.2157 3.58495C62.6648 3.58495 66.9668 7.88689 66.9668 13.336C66.9668 18.7851 62.5214 23.0871 57.2157 23.0871Z"
              fill="#344887"
            />
            <path
              d="M80.5895 34.5592V47.7518H33.8418V34.5592L45.457 24.3779L48.1816 26.9591L37.5702 36.28V44.1668H76.8612V36.28L66.3931 26.8157L69.1177 24.3779L80.5895 34.5592Z"
              fill="#344887"
            />
            <path
              d="M90.6278 7.45801C83.1711 7.45801 77.1484 13.4807 77.1484 20.9374C77.1484 28.3941 83.1711 34.2734 90.6278 34.2734C98.0845 34.2734 104.107 28.2507 104.107 20.9374C104.107 13.4807 98.0845 7.45801 90.6278 7.45801ZM90.6278 30.6885C85.1787 30.6885 80.8767 26.3865 80.8767 20.9374C80.8767 15.4883 85.1787 11.1864 90.6278 11.1864C95.9335 11.1864 100.379 15.6317 100.379 20.9374C100.379 26.2431 96.0769 30.6885 90.6278 30.6885Z"
              fill="#344887"
            />
            <path
              d="M114.001 42.0162V55.3522H69.1172V51.6239H110.416V43.737L99.8043 34.2727L102.529 31.835L114.001 42.0162Z"
              fill="#344887"
            />
            <path
              d="M23.374 7.45801C15.9173 7.45801 9.89453 13.4807 9.89453 20.9374C9.89453 28.3941 15.9173 34.2734 23.374 34.2734C30.8307 34.2734 36.8534 28.2507 36.8534 20.9374C36.8534 13.4807 30.8307 7.45801 23.374 7.45801ZM23.374 30.6885C17.9248 30.6885 13.6229 26.3865 13.6229 20.9374C13.6229 15.4883 17.9248 11.1864 23.374 11.1864C28.6797 11.1864 33.125 15.6317 33.125 20.9374C33.125 26.2431 28.6797 30.6885 23.374 30.6885Z"
              fill="#344887"
            />
            <path
              d="M44.8836 51.6239V55.3522H0V42.0162L11.4718 31.835L14.3398 34.2727L3.72835 43.737V51.6239H44.8836Z"
              fill="#344887"
            />
          </svg>
          <p class="architecture-item__name">{{ right.iconText }}</p>
        </div>
        <div class="architecture-item _text">
          <p class="architecture-item__name">{{ right.ministry.title }}</p>
          <HTMLContent
            class="architecture-item__text"
            :html="right.ministry.content"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HTMLContent from '~/components/utils/HTMLContent'
export default {
  name: 'Architecture',
  components: { HTMLContent },
  props: {
    left: {
      type: Object,
      required: true,
    },
    center: {
      type: Object,
      required: true,
    },
    right: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.architecture {
  display: flex;
  flex-wrap: wrap;

  @include --from-tablet {
    text-align: center;
  }

  > .architecture-component {
    flex: 0 0 25%;
    max-width: 25%;

    @include --tablet {
      flex: 0 0 calc(50% - 3rem / 2);
      max-width: calc(50% - 3rem / 2);

      &:not(:last-child) {
        margin-bottom: 3rem;
      }
    }

    @include --mobile {
      flex: 0 0 100%;
      max-width: none;
    }

    &._side:last-of-type {
      @include --tablet-only {
        margin-left: 3rem;
      }
    }

    &._center {
      flex: 0 0 50%;
      max-width: 50%;

      @include --tablet {
        flex: 0 0 100%;
        max-width: none;
      }

      @include --tablet-only {
        order: 1;
      }
    }
  }
}

.architecture-component {
  display: flex;
  flex-direction: column;

  &__title {
    margin-bottom: 3.3rem;
    font-weight: bold;

    @include --tablet {
      margin-bottom: 2.7rem;
    }

    @include --mobile {
      margin-bottom: 2.1rem;
    }
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @include --from-tablet {
      padding: 0 3.6rem;
    }

    ._center & {
      align-items: flex-start;

      @include --from-tablet {
        border-right: 1px solid $color_red;
        border-left: 1px solid $color_red;
      }
    }

    > * {
      flex: 0 0 100%;
    }

    ._side & > * {
      margin-top: 17.5rem;

      @include --tablet {
        margin-top: 0;
      }

      &:not(:last-child) {
        @include --tablet {
          margin-bottom: 2.4rem;
        }
      }
    }

    ._center & > * {
      flex-basis: calc(50% - 3rem / 2);
      flex-grow: 0;
      flex-shrink: 0;
      margin-bottom: 3rem;

      @include --mobile {
        flex-basis: 100%;
        margin-bottom: 2.4rem;
      }
    }

    ._center & > *:nth-child(3n):not(:last-child) {
      margin-left: 3rem;

      @include --mobile {
        margin-left: 0;
      }
    }
  }
}

.architecture-item {
  display: flex;
  flex-direction: column;

  &._fluid {
    flex-basis: 100%;

    p {
      @include --from-mobile {
        text-align: center;
      }
    }
  }

  &._text {
    align-items: flex-start;
    margin-top: 5.2rem;

    @include --mobile {
      margin-top: 2.4rem;
    }
  }

  &__text {
    @include text-small;
    margin-top: 0.8rem;
    color: $color_grey_text;
  }

  &__content {
    ._center & {
      @include --from-mobile {
        display: flex;
        flex-direction: column;
        height: inherit;

        ul {
          flex-grow: 1;
          margin-bottom: 0 !important;
        }

        p {
          @include text-small;
          margin-top: 3.2rem;
          color: $color_dark_grey;
        }
      }
    }
  }

  &._row {
    @include --mobile {
      flex-direction: row;
      align-items: center;

      > .architecture-item__icon {
        margin: 0;
      }

      > *:not(:last-child) {
        margin-right: 2.8em;
      }
    }
  }

  @include --from-tablet {
    align-items: center;
  }

  &__name {
    @include text;
    max-width: 100%;
    margin: 0;
    line-height: 2.7rem;

    @include --mobile {
      line-height: 2.4rem;
    }
  }

  &__icon {
    max-width: 100%;
    max-height: 7.5rem;

    &:not(:last-child) {
      margin-bottom: 3rem;
    }
  }

  &__head {
    width: 100%;
    padding: 1.6rem;
    border: 1px solid $color_red;

    &:not(:last-child) {
      margin-bottom: 1.2rem;
    }

    > .architecture-item__name:not(:last-child) {
      margin-bottom: 3px;
    }
  }

  &__clarification {
    @include text-small;
    margin: 0;
    color: $color_dark_grey;
  }

  > .html-content {
    text-align: left;
  }
}
</style>
