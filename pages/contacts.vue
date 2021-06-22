<template>
  <div v-view="$utils.scrollCenterDetection">
    <Section>
      <div class="contacts-first-screen">
        <div>
          <h1
            v-scroll-element
            class="contacts-first-screen__title _visually-h2"
          >
            {{ page.reference.title }}
          </h1>
          <div v-scroll-element class="contacts-reference">
            <HTMLContent :html="page.reference.content" />
          </div>
        </div>

        <div v-scroll-element="'right'" class="contacts-first-screen__image">
          <img src="/i/tasks/1.png" alt="" />
        </div>
      </div>
    </Section>
    <Section background :title="page.common.title">
      <div class="contacts-common">
        <a
          v-scroll-element
          :href="`tel:${page.common.tel.href}`"
          class="contact"
          ><SvgIcon name="tel" /> <span>{{ page.common.tel.text }}</span></a
        >
        <a
          v-scroll-element
          :href="`mailto:${page.common.email.href}`"
          class="contact"
          ><SvgIcon name="email" /> <span>{{ page.common.email.text }}</span></a
        >
      </div>
    </Section>
    <Section :title="page.press.title">
      <div class="contacts-press">
        <a v-scroll-element :href="`tel:${page.press.tel.href}`" class="contact"
          ><SvgIcon name="tel" /> <span>{{ page.press.tel.text }}</span></a
        >
        <a
          v-scroll-element
          :href="`mailto:${page.press.email.href}`"
          class="contact"
          ><SvgIcon name="email" /> <span>{{ page.press.email.text }}</span></a
        >
      </div>
    </Section>
    <Section background :title="page.center.title">
      <div class="contacts-center">
        <a
          v-scroll-element
          :href="`tel:${page.center.tel.href}`"
          class="contact"
          ><SvgIcon name="tel" /> <span>{{ page.center.tel.text }}</span></a
        >
      </div>
    </Section>
  </div>
</template>

<script>
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import HTMLContent from '~/components/utils/HTMLContent'

export default {
  name: 'Documents',
  components: { HTMLContent, Section },
  mixins: [pageDataFetch, pageHead, pageDefault],
}
</script>

<style lang="scss">
.contacts-first-screen {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    margin-bottom: 7.4rem;

    @include --mobile {
      margin-bottom: 3.8rem;
    }
  }

  &__image {
    flex-shrink: 0;
    width: 37.2rem;
    height: 28.3rem;
    margin-left: 10rem;

    @include --tablet {
      width: 26rem;
      height: 19.8rem;
    }

    @include --mobile {
      display: none;
    }

    img {
      @include box(100%);
    }
  }
}

.contacts-common,
.contacts-press {
  > * {
    &:not(:last-child) {
      margin-bottom: 1.6rem;
    }
  }
}

.contact {
  display: flex;
  align-items: center;
  font-weight: 700;

  @include --mobile {
    @include text-small;
  }

  svg {
    @include box(2.6rem);
    margin-right: 1.6rem;

    @include --mobile {
      @include box(2rem);
    }
  }

  > * {
    display: block;
  }

  span {
    @include hover-opacity();
  }
}
</style>
