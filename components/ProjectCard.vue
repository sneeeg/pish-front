<template>
  <div :style="{ background }" class="project-card">
    <SmartLink :to="to" class="project-card__name hover-opacity" v-html="name">
    </SmartLink>

    <div v-if="head" class="project-card-head">
      <div v-if="head.photoUrl" class="project-card-head__photo">
        <img :src="head.photoUrl" :alt="head.name" />
      </div>

      <div class="project-card-head__content">
        <div class="project-card-head__name">
          {{ head.name }}
        </div>

        <div v-if="head.text" class="project-card-head__text">
          {{ head.text }}
        </div>
      </div>
    </div>

    <ArrowLink class="project-card__link" :to="to" :text="_linkText" />
  </div>
</template>

<script>
import SmartLink from '~/components/utils/SmartLink'
import ArrowLink from '~/components/controls/ArrowLink'

export default {
  name: 'ProjectCard',
  components: { SmartLink, ArrowLink },
  props: {
    name: {
      type: String,
      required: true,
    },
    head: {
      type: Object,
      default: null,
    },
    background: {
      type: String,
      default: '#F4F4F6',
    },
    to: {
      type: [String, Object],
      required: true,
    },
    linkText: {
      type: String,
      default: '',
    },
  },
  computed: {
    _linkText() {
      return this.linkText || this.$store.state.default.lang['base.more']
    },
  },
}
</script>

<style lang="scss">
.project-card-head,
.project-card__link {
  margin-top: 3.2rem;

  @include --mobile {
    margin-top: 2.4rem;
  }
}

.project-card {
  display: flex;
  flex-direction: column;
  padding: 4rem;

  @include --mobile {
    padding: 2.4rem;
  }

  &__name {
    @include text;
    flex: 1;
    font-weight: 700;
  }

  &__link {
    font-weight: 400;
  }
}

.project-card-head {
  @include text-small();
  display: flex;
  align-items: center;

  &__photo {
    width: 4.4rem;
    height: 5.7rem;
    margin-right: 1.6rem;

    img {
      @include box(100%);

      object-fit: cover;
    }
  }

  &__name {
    font-weight: 700;
  }

  &__text {
    margin-top: 0.5rem;
  }
}
</style>
