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

    <Section
      v-if="page.biographyItems && page.biographyItems.length"
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

export default {
  name: 'ExpertSlug',

  components: {
    HTMLContent,
    Expandable,
    UniversitiesTable,
    Breadcrumbs,
    Section,
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

    margin-right: 3.2rem;
    flex-shrink: 0;

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
    width: 2.8rem;
    height: 1.4rem;
    left: 0;
    top: 1.7rem - 1.4rem / 2;

    @include --mobile {
      width: 2rem;
      height: 1rem;
      top: 1.4rem - 1rem / 2;
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
