<template>
  <div class="commission">
    <div class="page__back">
      <ArrowLink :text="lang['base.back']" to="/about" arrow-left />
    </div>
    <Section>
      <h1 class="commission__title _visually-h2">{{ page.pageTitle }}</h1>

      <div v-if="mainMember" class="commission-main-member">
        <div class="commission-main-member__avatar">
          <img :src="mainMember.image" :alt="mainMember.name" />
        </div>

        <div class="commission-main-member__text">
          <h2>{{ mainMember.name }}</h2>

          <p v-html="mainMember.description"></p>
        </div>
      </div>

      <div
        v-if="page.commissionMembers && page.commissionMembers.length"
        class="commission-members"
      >
        <PersonCard
          v-for="(member, index) in page.commissionMembers"
          :key="index"
          class="commission-members__item"
          :avatar="{ src: member.image, alt: member.name }"
          :name="member.name"
          :description="member.description"
          vertical
        />
      </div>
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import PersonCard from '~/components/PersonCard'
import ArrowLink from '~/components/Controls/ArrowLink'

export default {
  name: 'Index',
  components: { Section, PersonCard, ArrowLink },
  mixins: [pageDataFetch, pageHead, pageDefault],
  data() {
    return {
      mainMember: null,
    }
  },
  computed: {
    ...mapState('default', ['lang']),
  },
  created() {
    if (process.env.NODE_ENV !== 'production') {
      this.page.commissionMembers = this.$utils.fillEmptyArray(
        {
          image: '/i/commission/example.jpg',
          name: 'Фальков Валерий Николаевич',
          description:
            'Министр науки и высшего образования Российской Федерации,председеталь комиссии программы Приоритет 2030',
        },
        20
      )
    }

    if (this.page.commissionMembers.length) {
      this.mainMember = this.page.commissionMembers.splice(0, 1)[0]
    }
  },
}
</script>

<style lang="scss">
.commission-main-member {
  display: flex;
  align-items: center;
  margin-top: 6.4rem;

  @include --tablet {
    flex-direction: column;
    align-items: start;
  }

  @include --mobile {
    margin-top: 4.2rem;
  }

  &__avatar {
    @include box(58.6rem);
    flex-shrink: 0;

    @include --tablet {
      @include box(42rem);
    }

    @include --mobile {
      width: 100%;
      height: auto;
    }

    img {
      @include box(100%);
      object-fit: cover;

      @include --mobile {
        height: auto;
      }
    }
  }

  &__text {
    margin-left: 3rem;

    @include --tablet {
      margin: 4.2rem 0 0;
    }

    @include --mobile {
      margin-top: 2.4rem;
    }

    h2 {
      font-size: 4.4rem;
      line-height: 4.8rem;

      @include --mobile {
        font-size: 2.8rem;
        line-height: 3rem;
      }
    }

    p {
      line-height: 2.7rem;

      @include --mobile {
        line-height: 2.4rem;
      }
    }
  }
}

.commission-members {
  @include flexGap(3rem);
  padding-top: 6.4rem;

  > * {
    flex: 1 1 22.5%;
    max-width: calc(100% / 4 - 3rem);

    @include --tablet {
      flex: 1 1 40%;
      max-width: calc(100% / 2 - 3rem);
    }

    @include --mobile {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
}
</style>
