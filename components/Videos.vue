<template>
  <div class="videos">
    <div class="videos__content">
      <div class="videos-list">
        <VideoCard
          v-for="post in videos"
          :key="post.id"
          class="videos-list__item"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VideoCard from '~/components/VideoCard'

export default {
  name: 'Videos',
  components: { VideoCard },

  data() {
    return {
      videos: [],
    }
  },
  async fetch() {
    this.videos = this.$utils.fillEmptyArray({}, 4)

    this.videos = await this.$api.instructions
      .get()
      .then(({ data }) => data?.posts.reverse() || [])
  },
}
</script>

<style lang="scss">
.videos {
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

.videos-list {
  @include flexGap(7rem);

  &__item {
    flex: 1 1 40%;
    max-width: calc(50% - 7rem);

    @include --tablet {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
}
</style>
