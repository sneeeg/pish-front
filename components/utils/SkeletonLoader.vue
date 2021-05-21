<template>
  <div class="skeleton-loader"></div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
  props: {
    white: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.skeleton-loader {
  @include box(100%);
  position: absolute;
  border-radius: inherit;
  overflow: hidden;
  opacity: 0.35;

  &::before {
    position: absolute;
    top: 0;
    left: -15rem;
    display: block;
    width: 15rem;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      #f3f3f3 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    content: '';
  }

  @keyframes load {
    from {
      left: -150px;
    }

    to {
      left: 100%;
    }
  }
}
</style>
