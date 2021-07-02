<template>
  <Section background>
    <form class="registration-form" @submit.prevent="submit">
      <SearchSelect
        :value="university"
        :options="searchOptions"
        class="registration-form__field"
        :label="lang['registration.university.label']"
        :placeholder="lang['registration.university.placeholder']"
        :error-text="
          $v.university.$dirty && !$v.university.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        @selected="onSelect"
      />

      <CustomInput
        v-model.trim.lazy="$v.rector.$model"
        class="registration-form__field"
        :label="lang['registration.rector.label']"
        :placeholder="lang['registration.rector.placeholder']"
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
        class="registration-form__field"
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
        class="registration-form__field"
        :label="lang['registration.phone.label']"
        :error-text="
          $v.phone.$dirty && (!$v.phone.minLength || !$v.phone.required)
            ? 'Введите действительный номер телефона'
            : ''
        "
        placeholder="+7"
        name="phone"
      />

      <p class="registration-form__policy">
        {{ lang['registration.policy.text'] }}
        <SmartLink class="hover-opacity" :to="settings.policyLink">{{
          lang['registration.policy.link.text']
        }}</SmartLink>
      </p>

      <Btn
        class="registration-form__btn"
        type="submit"
        :text="lang['registration.action']"
        :loading="isLoading"
      />
    </form>
  </Section>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
// import { debounce } from 'throttle-debounce'

import Section from '~/components/layout/Section'
import CustomInput from '~/components/controls/CustomInput'
import SmartLink from '~/components/utils/SmartLink'
import Btn from '~/components/controls/Btn'
import SearchSelect from '~/components/Controls/SearchSelect'
export default {
  name: 'RegistrationForm',
  components: { SearchSelect, Btn, SmartLink, CustomInput, Section },
  mixins: [validationMixin],
  data() {
    return {
      searchRequest: '',
      searchOptions: [],
      rector: '',
      university: '',
      universityError: '',
      email: '',
      phone: '',
      isLoading: false,
    }
  },
  async fetch() {
    const options = await this.$api.registration
      .searchUniversity()
      .then(({ data }) => data)
      .catch(() => [])

    options.forEach((option, index) => {
      option.code = String(index)
    })

    this.searchOptions = options
  },
  validations: {
    rector: { required },
    university: { required },
    email: { required, email },
    phone: { required, minLength: minLength(12) },
  },
  computed: {
    ...mapState('default', ['lang', 'settings']),
  },
  methods: {
    ...mapMutations('default', ['changePopupState']),
    // search({ str, loading }) {
    //   if (!str.length) return
    //
    //   const handler = debounce(350, (str, loading, vm) => {
    //     if (!str.length) return
    //     loading(true)
    //
    //     vm.$api.registration
    //       .searchUniversity(str)
    //       .then(({ data }) => {
    //         vm.searchOptions = data
    //         loading(false)
    //       })
    //       .catch(() => {
    //         vm.searchOptions = []
    //         loading(false)
    //       })
    //   })
    //
    //   handler(str, loading, this)
    // },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.isLoading = true

      const data = {
        rector: this.rector,
        university: this.university,
        universityError: '',
        email: this.email,
        phone: this.phone,
      }
      const response = await this.$api.registration.sendForm(data)
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
        title: response.data.title,
        text: response.data.message,
        to: '',
      })

      this.$v.$reset()

      this.rector = ''
      this.university = ''
      this.email = ''
      this.phone = ''
    },
    onSelect(item) {
      this.university = item.label
      this.rector = item.rector || ''
    },
  },
}
</script>

<style lang="scss">
.registration-form {
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
