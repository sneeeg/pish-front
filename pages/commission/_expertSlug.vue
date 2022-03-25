<template>
  <div class="expert-detail">
    <Section tag="div" class="_mb-0">
      <Breadcrumbs :items="breadcrumbs" />
    </Section>
    <Section>
      <div class="expert-detail-hero">
        <div v-if="page.picture" class="expert-detail-hero__img">
          <img :src="page.picture" :alt="page.name" />
        </div>
        <div class="expert-detail-hero__content">
          <h1
            class="expert-detail-hero__title _visually-h2"
            v-html="page.name"
          ></h1>
          <p
            v-if="page.position"
            class="expert-detail-hero__subtitle"
            v-html="page.position"
          ></p>

          <p
            v-if="page.description"
            class="expert-detail-hero__description"
            v-html="page.description"
          ></p>

          <div
            v-if="page.indexes && page.indexes.length"
            class="expert-detail-hero__indexes"
          >
            <component
              :is="href ? 'SmartLink' : 'div'"
              v-for="({ text, href, icon }, index) in page.indexes"
              :key="index"
              :to="href || false"
              class="expert-detail-index"
            >
              <div v-if="icon" class="expert-detail-index__icon">
                <img :src="icon" :alt="text" />
              </div>

              <div class="expert-detail-index__text">{{ text }}</div>
            </component>
          </div>
        </div>
      </div>
    </Section>

    <Section
      v-if="page.universities && page.universities.length"
      background
      :title="lang['commission.universities']"
    >
      <UniversitiesTable :items="page.universities" />
    </Section>

    <Section v-if="page.opinion" is-layout>
      <Quote
        :content="page.opinion"
        :name="page.name"
        :cite="lang['commission.cite']"
      />
    </Section>

    <Section
      v-if="page.biographyItems && page.biographyItems.length"
      :background="page.opinion"
      :title="lang['commission.biography']"
    >
      <div class="expert-detail__biography">
        <Expandable
          v-for="(item, index) in page.biographyItems"
          :key="index"
          :class="['expert-detail-expand', { _first: !index }]"
        >
          <template #title="{ isActive }">
            <div class="expert-detail-expand__head">
              <SvgIcon
                class="expert-detail-expand__icon"
                name="caret"
                :style="{ transform: isActive ? 'none' : 'rotate(180deg)' }"
              />
              <div
                class="expert-detail-expand__title"
                v-html="item.title"
              ></div>
            </div>
          </template>
          <template>
            <div class="expert-detail-expand__content">
              <HTMLContent :html="item.content" />
            </div>
          </template>
        </Expandable>
      </div>
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import Breadcrumbs from '~/components/Breadcrumbs'
import Section from '~/components/layout/Section'
import UniversitiesTable from '~/components/UniversitiesTable'
import Expandable from '~/components/Expandable'
import HTMLContent from '~/components/utils/HTMLContent'
import SmartLink from '~/components/utils/SmartLink'
import Quote from '~/components/Quote'

export default {
  name: 'ExpertSlug',

  components: {
    Quote,
    HTMLContent,
    Expandable,
    UniversitiesTable,
    Breadcrumbs,
    Section,
    SmartLink,
  },

  mixins: [pageHead, pageDefault],

  async asyncData({ $api, route, error }) {
    try {
      const { data: page, errors } = await $api.commission.getExpertBySlug(
        route.params.expertSlug || ''
      )

      if (!page || errors?.length) {
        throw new Error('Page not found')
      }

      page.title = page.metaTitle = page.name

      return {
        page,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found.' })
    }
  },

  data() {
    return {
      breadcrumbs: [],
    }
  },

  computed: {
    ...mapState('default', ['lang']),
  },

  created() {
    this.breadcrumbs = [
      {
        to: '/about',
        text: 'О программе',
      },
      {
        to: '/commission',
        text: 'Комиссия Минобрнауки РФ по отбору в программу',
      },
      {
        to: '',
        text: this.page.name,
      },
    ]
  },
}
</script>

<style lang="scss">
.expert-detail-hero {
  @include --from-tablet {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__img {
    @include box(60.7rem);
    flex-shrink: 0;

    margin-right: 3.2rem;

    @include --tablet {
      @include box(40.2rem);

      margin: 0 0 3.2rem;
    }

    @include --mobile {
      @include box(28rem);

      margin-bottom: 2.4rem;
    }

    img {
      @include box(100%);

      display: block;
      object-fit: cover;
    }
  }

  &__content {
    max-width: 50.3rem;
  }

  &__subtitle {
    @include h4;

    margin-top: 0.8rem;
    font-weight: 700;
  }

  &__description {
    margin-top: 2.4rem;
    line-height: 2.6rem;

    @include --mobile {
      @include p;

      margin-top: 1.8rem;
    }
  }

  &__indexes {
    @include flexGap(2.4rem);

    padding-top: 4rem;

    @include --mobile {
      @include flexGap(1.6rem);

      padding-top: 3.2rem;
    }

    > * {
      flex: 1 1 30%;
      max-width: calc(100% / 3 - 2.4rem);

      @include --mobile {
        flex: 1 1 100%;
        max-width: 100%;
      }
    }
  }
}

.expert-detail-index {
  @include text-button-small;

  display: flex;
  align-items: center;
  font-weight: 400;
  text-transform: none;

  &__icon {
    @include box(2.4rem);
    margin-right: 1.2rem;
    filter: grayscale(1);
    transition: filter 0.3s ease;

    img {
      @include box(100%);

      object-fit: contain;
      object-position: center;
    }
  }

  &__text {
    color: $color_dark_grey;
    transition: color 0.3s ease;
  }

  @include hover {
    .expert-detail-index__icon {
      filter: grayscale(0);
    }

    .expert-detail-index__text {
      color: $color_accent;
    }
  }
}

.expert-detail-expand {
  padding: 3.2rem 0;
  border-top: 1px solid #bababc;

  @include --mobile {
    padding: 2.4rem 0;
  }

  &._first {
    padding-top: 0 !important;
    border: 0;
  }

  &__title,
  &__content {
    padding-left: 4.4rem;

    @include --mobile {
      padding-left: 3.6rem;
    }
  }

  &__head {
    position: relative;
  }

  &__icon {
    position: absolute;
    top: 1.7rem - 1.4rem / 2;
    left: 0;
    width: 2.8rem;
    height: 1.4rem;

    @include --mobile {
      top: 1.4rem - 1rem / 2;
      width: 2rem;
      height: 1rem;
    }
  }

  &__title {
    @include text-subtitle;
  }

  &__content {
    padding-top: 2.4rem;
  }
}
</style>
