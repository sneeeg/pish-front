<template>
  <div ref="player" class="media-player">
    <div :class="['media-player__preview', { _play: isPlay }]">
      <img :src="preview.src" :alt="preview.alt" />
    </div>
    <button
      :class="['media-player__play-btn', { _play: isPlay }]"
      @click="onClick"
    >
      <svg-icon name="play"></svg-icon>
    </button>
    <video v-if="videoLink && isPlay" :src="videoLink" controls autoplay />
  </div>
</template>

<script>
export default {
  name: 'MediaPlayer',
  components: {},
  props: {
    videoId: {
      type: String,
      default: '',
    },
    videoLink: {
      type: String,
      default: '',
    },
    preview: {
      type: Object,
      required: true,
    },
    rutube: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isPlay: false,
    }
  },
  methods: {
    onClick() {
      this.isPlay = true
      if (this.videoLink) return

      const iframeEl = document.createElement('iframe')
      iframeEl.width = '100%'
      iframeEl.height = '100%'
      iframeEl.allow =
        'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      iframeEl.allowFullscreen = true
      iframeEl.src = this.rutube
        ? `https://rutube.ru/play/embed/${this.videoId}`
        : `https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=1`
      this.$refs.player.append(iframeEl)
    },
  },
}
</script>

<style lang="scss">
.media-player {
  @include box(100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: $color_black;

  &__play-btn {
    @include box(6.4rem);
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    padding: 0;
    border: 1px solid $color_white;
    border-radius: 50%;
    background-color: transparent;
    transform: translate(-50%, -50%);
    transition: opacity 600ms ease, visibility 600ms ease,
      background-color 300ms ease;

    @include --mobile {
      @include box(3.2rem);
    }

    @include hover {
      background-color: rgba($color_white, 0.15);
    }

    > svg {
      position: absolute;
      top: 50%;
      left: 40%;
      width: 30%;
      height: 40%;
      transform: translateY(-50%);
    }
  }

  &__preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 600ms ease, visibility 600ms ease;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: $color_black;
      opacity: 0.33;
      content: '';
    }

    > img {
      @include adaptiveImg;
    }
  }

  ._play {
    visibility: hidden;
    opacity: 0;
  }

  iframe {
    border: none;
  }

  video {
    @include box(100%);
  }
}
</style>
