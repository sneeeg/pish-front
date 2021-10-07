<template>
  <form class="questionnaire-form" @submit.prevent="submit">
    <div class="questionnaire-form__title _visually-h4">Личная информация</div>

    <CustomInput
      v-model.trim.lazy="$v.lastName.$model"
      class="questionnaire-form__field"
      label="Фамилия на русском языке"
      placeholder="Фамилия на русском языке"
      required
      :error-text="
        $v.lastName.$dirty && !$v.lastName.required
          ? 'Это поле необходимо заполнить'
          : ''
      "
      name="lastName"
    />

    <CustomInput
      v-model.trim.lazy="$v.name.$model"
      class="questionnaire-form__field"
      label="Имя на русском языке"
      placeholder="Имя на русском языке"
      required
      :error-text="
        $v.name.$dirty && !$v.name.required
          ? 'Это поле необходимо заполнить'
          : ''
      "
      name="name"
    />

    <SearchSelect
      v-model.trim.lazy="$v.country.$model"
      searchable
      :options="countries"
      class="questionnaire-form__field"
      label="Страна проживания"
      placeholder="Начните вводить"
      :error-text="
        $v.country.$dirty && !$v.country.required
          ? 'Это поле необходимо заполнить'
          : ''
      "
      required
      @search="searchCountry"
      @focus="countries = []"
      @selected="city = ''"
    />

    <SearchSelect
      v-model.trim.lazy="$v.city.$model"
      searchable
      :options="cities"
      :disabled="!country"
      class="questionnaire-form__field"
      label="Город проживания"
      placeholder="Начните вводить"
      :error-text="
        $v.city.$dirty && !$v.city.required
          ? 'Это поле необходимо заполнить'
          : ''
      "
      required
      @search="searchCity($event, country)"
      @focus="cities = []"
    />

    <SearchSelect
      v-model.trim.lazy="$v.relocation.$model"
      :options="boolList"
      class="questionnaire-form__field"
      label="Готовы ли вы к переезду в другой регион РФ? "
      placeholder="Выберите вариант"
      :error-text="
        $v.relocation.$dirty && !$v.relocation.required
          ? 'Это поле необходимо заполнить'
          : ''
      "
      required
    />

    <SearchSelect
      v-model.trim.lazy="$v.trips.$model"
      :options="boolList"
      class="questionnaire-form__field"
      label="Готовы ли вы к частым командировкам?"
      placeholder="Выберите вариант"
      :error-text="
        $v.trips.$dirty && !$v.trips.required
          ? 'Это поле необходимо заполнить'
          : ''
      "
      required
    />

    <div class="questionnaire-form__title _visually-h4">Высшее образование</div>

    <Checkbox
      v-model="noHigherEducation"
      class="questionnaire-form__field"
      label="Нет диплома о высшем образовании"
    />

    <div class="questionnaire-form__blocks">
      <div
        v-for="(item, index) in higherEducations"
        :key="index"
        class="questionnaire-form-block"
      >
        <CustomInput
          v-model.trim.lazy="$v.higherEducations[index].universityName.$model"
          class="questionnaire-form__field"
          label="Название учебного заведения"
          placeholder="Название учебного заведения"
          :required="!noHigherEducation"
          :disabled="noHigherEducation"
          :error-text="
            $v.higherEducations[index].universityName.$dirty &&
            !$v.higherEducations[index].universityName.required &&
            !noHigherEducation
              ? 'Это поле необходимо заполнить'
              : ''
          "
          :name="`universityName-${index + 1}`"
        />

        <CustomInput
          v-model.trim.lazy="$v.higherEducations[index].diploma.$model"
          class="questionnaire-form__field"
          label="Степень/диплом"
          placeholder="Степень/диплом"
          :required="!noHigherEducation"
          :disabled="noHigherEducation"
          :error-text="
            $v.higherEducations[index].diploma.$dirty &&
            !$v.higherEducations[index].diploma.required &&
            !noHigherEducation
              ? 'Это поле необходимо заполнить'
              : ''
          "
          :name="`educationBegin-${index + 1}`"
        />

        <CustomInput
          v-model.trim.lazy="$v.higherEducations[index].begin.$model"
          mask-type="year"
          class="questionnaire-form__field"
          label="Начало обучения"
          placeholder="Начало обучения"
          :required="!noHigherEducation"
          :disabled="noHigherEducation"
          :error-text="
            $v.higherEducations[index].begin.$dirty &&
            $v.higherEducations[index].begin.$invalid &&
            !noHigherEducation
              ? 'Необходимо указать год'
              : ''
          "
          :name="`educationBegin-${index + 1}`"
        />

        <CustomInput
          v-model.trim.lazy="$v.higherEducations[index].end.$model"
          mask-type="year"
          class="questionnaire-form__field"
          label="Окончание обучения"
          placeholder="Окончание обучения"
          :required="!noHigherEducation"
          :disabled="noHigherEducation"
          :error-text="
            $v.higherEducations[index].end.$dirty &&
            $v.higherEducations[index].end.$invalid &&
            !noHigherEducation
              ? 'Необходимо указать год'
              : ''
          "
          :name="`educationEnd-${index + 1}`"
        />

        <SearchSelect
          v-model.trim.lazy="$v.higherEducations[index].country.$model"
          searchable
          :options="countries"
          class="questionnaire-form__field"
          label="Страна обучения"
          :disabled="noHigherEducation"
          placeholder="Начните вводить"
          :error-text="
            $v.higherEducations[index].country.$dirty &&
            !$v.higherEducations[index].country.required &&
            !noHigherEducation
              ? 'Это поле необходимо заполнить'
              : ''
          "
          :required="!noHigherEducation"
          @search="searchCountry"
          @focus="countries = []"
          @selected="higherEducations[index].city = ''"
        />

        <SearchSelect
          v-model.trim.lazy="$v.higherEducations[index].city.$model"
          searchable
          :options="cities"
          :disabled="!higherEducations[index].country || noHigherEducation"
          class="questionnaire-form__field"
          label="Город обучения"
          placeholder="Начните вводить"
          :error-text="
            $v.higherEducations[index].city.$dirty &&
            !$v.higherEducations[index].city.required &&
            !noHigherEducation
              ? 'Это поле необходимо заполнить'
              : ''
          "
          :required="!noHigherEducation"
          @search="searchCity($event, higherEducations[index].country)"
          @focus="cities = []"
        />

        <CustomInput
          v-model.trim.lazy="$v.higherEducations[index].speciality.$model"
          class="questionnaire-form__field"
          label="Специальность/направление"
          placeholder="Специальность/направление"
          :required="!noHigherEducation"
          :disabled="noHigherEducation"
          :error-text="
            $v.higherEducations[index].speciality.$dirty &&
            !$v.higherEducations[index].speciality.required &&
            !noHigherEducation
              ? 'Это поле необходимо заполнить'
              : ''
          "
          :name="`educationBegin-${index + 1}`"
        />

        <a
          v-if="higherEducations.length > 1"
          class="questionnaire-form-block__delete"
          href=""
          @click.prevent="higherEducations.splice(index, 1)"
          >Удалить</a
        >
      </div>

      <Btn
        v-if="!noHigherEducation"
        class="questionnaire-form__btn _small"
        arrow=""
        type="button"
        text="Добавить"
        @click.native="addHigherEducation"
      >
      </Btn>
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, between } from 'vuelidate/lib/validators'
import { debounce } from 'throttle-debounce'
import CustomInput from '~/components/controls/CustomInput'
import SearchSelect from '~/components/controls/SearchSelect'
import Checkbox from '~/components/controls/Checkbox'
import Btn from '~/components/controls/Btn'

export default {
  name: 'QuestionnaireForm',
  components: { SearchSelect, CustomInput, Checkbox, Btn },
  mixins: [validationMixin],
  data() {
    return {
      boolList: ['Да', 'Нет'],
      lastName: '',
      name: '',
      country: '',
      countries: [],
      city: '',
      cities: [],
      relocation: '',
      trips: '',
      noHigherEducation: false,
      higherEducations: [
        {
          universityName: '',
          diploma: '',
          begin: '',
          end: '',
          country: '',
          city: '',
          speciality: '',
        },
      ],
    }
  },
  validations() {
    const result = {
      lastName: { required },
      name: { required },
      country: { required },
      city: { required },
      relocation: { required },
      trips: { required },
    }

    result.higherEducations = this.higherEducations.reduce(
      (acc, item, index) => {
        const result = {}

        Object.keys(item).forEach((key) => {
          if (key === 'end' || key === 'begin') {
            result[key] = this.noHigherEducation ? {} : { required }
          }
          result[key] = this.noHigherEducation
            ? {}
            : { required, between: between(1990, 2022) }
        })

        acc[index] = result
        return acc
      },
      {}
    )

    return result
  },
  methods: {
    searchCountry: debounce(500, async function (query) {
      const response = await this.$api.dadata.getCountries(query.str)
      const suggestions = response?.suggestions || []

      this.countries = suggestions.reduce((acc, item) => {
        acc.push(item.value)

        return acc
      }, [])
    }),
    searchCity: debounce(500, async function (query, country) {
      const response = await this.$api.dadata.getCities(query.str, country)
      const suggestions = response?.suggestions || []

      this.cities = suggestions.reduce((acc, item) => {
        acc.push(item.value)

        return acc
      }, [])
    }),
    addHigherEducation() {
      this.higherEducations.push({
        universityName: '',
        diploma: '',
        begin: '',
        end: '',
        country: '',
        city: '',
        speciality: '',
      })
    },
  },
}
</script>

<style lang="scss">
.questionnaire-form {
  max-width: 68.8rem;

  &__field {
    margin-bottom: 3.2rem;
  }

  &__title {
    margin-bottom: 5.6rem;
    font-weight: bold;

    &:not(:first-child) {
      margin-top: 5.6rem;

      @include --mobile {
        margin-top: 4.2rem;
      }
    }

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
    margin-top: 3.2rem;

    &._small {
      width: 16rem;
    }

    @include --mobile {
      width: 100%;
    }
  }
}

.questionnaire-form-block {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1.6rem;
  border-radius: 5px;
  margin-bottom: 3.2rem;

  &__delete {
    @include hover-opacity;
    @include text-button-small;
    color: $color_accent;
    align-self: flex-end;
  }
}
</style>
