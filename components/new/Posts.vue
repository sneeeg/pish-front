<template>
  <div class="posts">
    <div class="posts__content">
      <div class="posts-list">
        <PostPreview
          v-for="post in posts"
          :key="post.id"
          :hide-head="hideHead"
          class="posts-list__item"
          :post="post"
          :colored="colored"
          :type="type"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PostPreview from '~/components/new/PostPreview'

export default {
  name: 'Posts',
  components: { PostPreview },
  props: {
    all: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'all',
    },
    colored: {
      type: Boolean,
      default: false,
    },
    hideHead: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
  },
}
</script>

<style lang="scss">
.posts {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2.6rem;
  }

  &__select {
    width: 100%;
  }
}

.posts-categories {
  display: flex;

  &__item {
    &:not(:last-child) {
      margin-right: 4.2rem;
    }

    a {
      @include text-button;
      font-weight: normal;
      text-transform: uppercase;

      &._active {
        color: $color_accent;
      }
    }
  }
}

.posts-list {
  @include flexGap(2.4rem);

  &__item {
    flex: 1 1 30%;
    max-width: calc(50% - 3rem);

    @include --mobile {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
}

.posts-foot {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 4rem;

  &__btn {
    width: 23.2rem;

    @include --mobile {
      width: 18rem;
    }
  }

  &__link {
    width: fit-content;
  }
}
</style>
