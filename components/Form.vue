<template>
  <form class="form" @submit.prevent="submit">
    <div v-for="field in fields" :key="field.name" class="form__field">
      <component
        :is="getComponent(field)"
        v-model.trim.lazy="$v.model[field.name].$model"
        :label="field.label"
        :placeholder="field.placeholder"
        :required="field.required"
        :name="field.name"
        :type="getType(field)"
        :error-text="getError(field)"
        :mask-type="field.maskType || ''"
      ></component>
    </div>

    <p v-if="showPolicy" class="form__policy">
      Нажимая кнопку «Отправить» Я соглашаюсь
      <SmartLink class="hover-opacity" :to="lang['base.policyLink']">
        с политикой безопасности и конфиденциальности</SmartLink
      >
    </p>

    <Btn
      class="form__submit"
      type="submit"
      :text="submitText"
      :loading="isLoading"
    />
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'
import CustomInput from '~/components/controls/CustomInput'
import FileDropzone from '~/components/controls/FileDropzone'
import SmartLink from '~/components/utils/SmartLink'
import Btn from '~/components/controls/Btn'

export default {
  name: 'Form',

  components: { CustomInput, FileDropzone, SmartLink, Btn },

  mixins: [validationMixin],

  props: {
    fields: {
      type: Array,
      required: true,
    },

    showPolicy: {
      type: Boolean,
      default: true,
    },

    submitText: {
      type: String,
      default: 'Отправить',
    },

    submitHandler: {
      type: Function,
      required: true,
    },

    successTitle: {
      type: String,
      default: 'Спасибо!',
    },

    successMessage: {
      type: String,
      default: 'Форма успешно отправлена.',
    },
  },

  data() {
    return {
      model: this.fields.reduce((acc, field) => {
        acc[field.name] = null

        return acc
      }, {}),

      isLoading: false,
    }
  },

  computed: {
    ...mapState('default', ['lang']),
  },

  validations() {
    return {
      model: this.fields.reduce((acc, item) => {
        const result = {}

        if (item.required) {
          result.required = required
        }

        if (item.type === 'email') {
          result.email = email
        }

        acc[item.name] = result

        return acc
      }, {}),
    }
  },

  methods: {
    ...mapMutations('default', ['changePopupState']),

    async submit() {
      this.$v.$touch()

      if (this.$v.$invalid) return

      this.isLoading = true

      try {
        await this.submitHandler(this.model)

        this.changePopupState({
          isShow: true,
          title: this.successTitle,
          text: this.successMessage,
          to: '',
        })

        this.reset()
      } catch (e) {
        this.changePopupState({
          isShow: true,
          title: this.lang['base.error'],
          text: e.message,
          to: '',
        })
      } finally {
        this.isLoading = false
      }
    },

    reset() {
      Object.keys(this.model).forEach((key) => {
        Vue.set(this.model, key, '')
      })

      this.$v.$reset()
    },

    getType(field) {
      if (field.type === 'file-dropzone') {
        return false
      }

      return field.type
    },

    getComponent(field) {
      if (field.type === 'file-dropzone') {
        return 'FileDropzone'
      }

      return 'CustomInput'
    },

    getError(field) {
      if (!this.$v.model[field.name].$dirty || !field.errors) return

      const keys = Object.keys(field.errors)

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]

        switch (key) {
          case 'required':
            if (field.required && !this.$v.model[field.name].required) {
              return field.errors[key]
            }
            break

          case 'email':
            if (field.type === 'email' && !this.$v.model[field.name].email) {
              return field.errors[key]
            }
            break
        }
      }
    },
  },
}
</script>

<style lang="scss">
.form {
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

  &__submit {
    width: 26.7rem;
    margin-top: 3.2rem;

    @include --mobile {
      width: 100%;
    }
  }
}
</style>
