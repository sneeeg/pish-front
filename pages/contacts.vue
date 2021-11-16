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

          <ArrowLink
            v-if="false"
            v-scroll-element
            is-link
            class="contacts-first-screen__btn"
            to="/upload/medialibrary/086/uh21vyy8qkyu8rkrt3tt070ljc7ssych/Logo-so-sloganom.rar"
            text="Скачать логотип"
          />
        </div>

        <div v-scroll-element="'right'" class="contacts-first-screen__image">
          <img
            src="/i/tasks/1.png"
            :alt="$store.state.default.settings.siteName"
          />
        </div>
      </div>
    </Section>
    <Section background :title="page.common.title">
      <div class="contacts-common">
        <a v-if="false" :href="`tel:${page.common.tel.href}`" class="contact"
          ><SvgIcon name="tel" /> <span>{{ page.common.tel.text }}</span></a
        >
        <a :href="`mailto:${page.common.email.href}`" class="contact"
          ><SvgIcon name="email" /> <span>{{ page.common.email.text }}</span></a
        >
      </div>
    </Section>
    <Section :title="page.press.title">
      <div class="contacts-press">
        <a v-if="false" :href="`tel:${page.press.tel.href}`" class="contact"
          ><SvgIcon name="tel" /> <span>{{ page.press.tel.text }}</span></a
        >
        <a :href="`mailto:${page.press.email.href}`" class="contact"
          ><SvgIcon name="email" /> <span>{{ page.press.email.text }}</span></a
        >
      </div>
    </Section>

    <Section v-if="page.feedback" background :title="page.feedback.title">
      <div class="contacts-form">
        <Form :submit-handler="feedbackFormHandler" :fields="formFields" />
      </div>
    </Section>

    <Section :title="page.center.title">
      <div class="contacts-center">
        <a :href="`tel:${page.center.tel.href}`" class="contact"
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
import ArrowLink from '~/components/controls/ArrowLink'
import Form from '~/components/Form'

export default {
  name: 'Documents',
  components: { Form, ArrowLink, HTMLContent, Section },
  mixins: [pageDataFetch, pageHead, pageDefault],

  data() {
    return {
      formFields: [
        {
          type: 'text',
          required: true,
          label: 'ФИО',
          placeholder: 'ФИО',
          name: 'fio',
          errors: {
            required: 'Это поле необходимо заполнить',
          },
        },
        {
          type: 'text',
          required: true,
          label: 'Организация',
          placeholder: 'Организация',
          name: 'organization',
          errors: {
            required: 'Это поле необходимо заполнить',
          },
        },
        {
          type: 'email',
          required: true,
          label: 'Электронная почта',
          placeholder: 'Электронная почта',
          name: 'email',
          errors: {
            required: 'Это поле необходимо заполнить',
            email: 'Введите действительный адрес электронной почты',
          },
        },
        {
          type: 'text',
          maskType: 'tel',
          label: 'Телефон',
          placeholder: 'Телефон',
          name: 'tel',
        },
        {
          type: 'textarea',
          label: 'Комментарий',
          placeholder: 'Комментарий',
          name: 'comment',
        },
        {
          type: 'file-dropzone',
          name: 'file',
        },
      ],
    }
  },

  methods: {
    async feedbackFormHandler(model) {
      const formData = new FormData()

      Object.keys(model).forEach((key) => {
        formData.append(key, model[key])
      })

      try {
        const { errors } = await this.$api.feedback.send(formData)

        if (errors.length) {
          throw new Error(errors[0])
        }
      } catch (e) {
        throw new Error(e)
      }
    },
  },
}
</script>

<style lang="scss">
.contacts-first-screen {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__btn {
    display: inline-flex;
    margin-top: 3.2rem;
  }

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

.contacts-form {
  max-width: 68.8rem;
}
</style>
