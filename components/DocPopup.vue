<template>
  <div ref="popup" class="popup-wrapper">
    <div class="doc-popup">
      <button
        type="button"
        class="doc-popup__close"
        aria-label="Закрыть"
        @click="closePopup"
      ></button>
      <div class="doc-popup__title _visually-h5">{{ title }}</div>
      <p class="doc-popup__text">{{ text }}</p>
      <a :href="to" class="doc-popup__download" download>
        скачать весь документ
      </a>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'DocPopup',
  components: {},
  props: {},
  computed: {
    ...mapState('default', {
      title: (state) => state.popup.title,
      text: (state) => state.popup.text,
      to: (state) => state.popup.href,
    }),
  },
  mounted() {
    this.closePopup = this.closePopup.bind(this)
    this.onWrapperClick = this.onWrapperClick.bind(this)
    document.addEventListener('keydown', this.closePopup)
    this.$refs.popup.addEventListener('click', this.onWrapperClick)
  },
  methods: {
    ...mapMutations('default', ['changePopupState']),
    closePopup() {
      this.changePopupState({})
    },
    onWrapperClick(e) {
      if (e.target.classList.contains('popup-wrapper')) {
        this.changePopupState({})
      }
    },
  },
}
</script>

<style lang="scss">
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color_black, 0.8);
}

.doc-popup {
  position: relative;
  max-width: 56rem;
  margin: 0 2rem;
  padding: 7.2rem 3.2rem;
  background-color: $color_white;

  &__close {
    @include btn-reset;
    @include box(3.6rem);
    position: absolute;
    top: 1.8rem;
    right: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $color_black;
    border-radius: 50%;
    transition-duration: 300ms;

    &::before {
      @include box(1.6rem);
      position: absolute;
      display: block;
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.181 1.07a.614.614 0 11.868.868L1.453 15.534a.614.614 0 11-.868-.868L14.182 1.07z' fill='%23000'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M.586 1.938a.614.614 0 11.868-.868L15.05 14.666a.614.614 0 01-.868.868L.586 1.938z' fill='%23000'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: contain;
      content: '';
    }

    @include hover {
      opacity: 0.7;
    }
  }

  &__title {
    margin-bottom: 2.6rem;
    font-weight: bold;
  }

  &__text {
    @include text;
    margin: 0 0 4.4rem;
  }

  &__download {
    @include btn-reset;
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 4.7rem;
    padding: 1rem 1.5rem;
    color: $color_white;
    background-color: $color_red;

    &::before {
      min-width: 2rem;
      max-width: 2rem;
      height: 2.6rem;
      margin-top: 0.3px;
      margin-right: 1.5rem;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 8.13V6.85L13.88.18V0H0v25.75h20V10.68h-1.83v13.25H1.83V1.83h10.22v6.3H20zm-6.12-5.2l3.1 3.37h-3.1V2.92z' fill='%23FFFFFF'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: contain;
      content: '';
    }

    &::after {
      @include box(100%);
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba($color_white, 0.15);
      transform: scaleX(0);
      transform-origin: left;
      transition: 0.3s ease;
      content: '';
      pointer-events: none;
    }

    @include hover {
      &::after {
        transform: scaleX(1);
      }
    }
  }
}
</style>
