<template>
  <form class="faq-form" @submit.prevent="submit">
    <div class="faq-form__title _visually-h4" v-html="title"></div>

    <CustomInput
      v-model.trim.lazy="$v.rector.$model"
      class="faq-form__field"
      :label="lang['faq.rector.label']"
      :placeholder="lang['faq.rector.label']"
      :error-text="
        $v.rector.$dirty && !$v.rector.required
          ? 'Это поле необходимо заполнить'
          : ''
      "
      name="rector"
    />

    <CustomInput
      v-model.trim.lazy="$v.email.$model"
      type="email"
      class="faq-form__field"
      :label="lang['registration.email.label']"
      :placeholder="lang['registration.email.placeholder']"
      :error-text="
        $v.email.$dirty && (!$v.email.email || !$v.email.required)
          ? 'Введите действительный адрес электронной почты'
          : ''
      "
      name="email"
    />

    <CustomInput
      v-model.trim.lazy="$v.phone.$model"
      type="tel"
      class="faq-form__field"
      :label="lang['registration.phone.label']"
      :error-text="
        $v.phone.$dirty && (!$v.phone.minLength || !$v.phone.required)
          ? 'Введите действительный номер телефона'
          : ''
      "
      placeholder="+7"
      name="phone"
    />

    <CustomInput
      v-model.trim.lazy="$v.question.$model"
      type="textarea"
      class="faq-form__field"
      :label="lang['faq.question']"
      :error-text="
        $v.question.$dirty && !$v.question.required
          ? 'Это поле необходимо заполнить'
          : ''
      "
      :placeholder="lang['faq.question']"
      name="question"
    />

    <p class="faq-form__policy">
      {{ lang['registration.policy.text'] }}
      <SmartLink class="hover-opacity" :to="settings.policyLink">{{
        lang['registration.policy.link.text']
      }}</SmartLink>
    </p>

    <Btn
      class="faq-form__btn"
      type="submit"
      :text="lang['registration.action']"
      :loading="isLoading"
    />
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapMutations, mapState } from 'vuex'
import CustomInput from '~/components/controls/CustomInput'
import SmartLink from '~/components/utils/SmartLink'
import Btn from '~/components/controls/Btn'

export default {
  name: 'FaqForm',
  components: {
    CustomInput,
    SmartLink,
    Btn,
  },
  mixins: [validationMixin],
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rector: '',
      email: '',
      phone: '',
      question: '',
      isLoading: false,
    }
  },
  validations: {
    rector: { required },
    email: { required, email },
    phone: { required, minLength: minLength(12) },
    question: { required },
  },
  computed: {
    ...mapState('default', ['lang', 'settings']),
  },
  methods: {
    ...mapMutations('default', ['changePopupState']),
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      const data = {
        rector: this.rector,
        email: this.email,
        phone: this.phone,
        question: this.question,
      }

      const response = await this.$api.faq.sendForm(data)
      this.isLoading = false

      if (response.errors.length) {
        this.changePopupState({
          isShow: true,
          title: this.lang['base.error'],
          text: response.errors[0].message,
          to: '',
        })

        return
      }

      this.changePopupState({
        isShow: true,
        title: this.lang['faq.done.title'],
        text: this.lang['faq.done.text'],
        to: '',
      })

      this.$v.$reset()

      this.rector = ''
      this.email = ''
      this.phone = ''
      this.question = ''
    },
  },
}
</script>

<style lang="scss">
.faq-form {
  max-width: 68.8rem;

  &__title {
    margin-bottom: 5.6rem;
    font-weight: bold;

    @include --mobile {
      margin-bottom: 4.2rem;
    }
  }

  &__policy {
    @include text-button;
    margin: 6.4rem 0 0;
    color: $color_grey_text;
    font-weight: normal;
    text-transform: none;

    @include --mobile {
      margin-top: 4.8rem;
    }

    a {
      display: block;
      color: $color_accent;
      text-decoration: underline;
    }
  }

  &__btn {
    width: 26.7rem;
    margin-top: 2.8rem;

    @include --mobile {
      width: 100%;
    }
  }
}
</style>
