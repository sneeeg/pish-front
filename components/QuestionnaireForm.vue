<template>
  <transition name="fade" mode="out-in">
    <div v-if="isDone">Форма успешно отправлена.</div>
    <form v-else class="questionnaire-form" @submit.prevent="submit">
      <div class="questionnaire-form__title _visually-h4">
        Личная информация
      </div>

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

      <CustomInput
        v-model.trim.lazy="$v.secondName.$model"
        class="questionnaire-form__field"
        label="Отчество на русском языке"
        placeholder="Отчество на русском языке"
        required
        :error-text="
          $v.secondName.$dirty && !$v.secondName.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        name="secondName"
      />

      <CustomInput
        v-model.trim.lazy="$v.phone.$model"
        mask-type="tel"
        type="tel"
        class="questionnaire-form__field"
        label="Номер телефона"
        placeholder="Номер телефона"
        required
        :error-text="
          $v.phone.$dirty && $v.phone.$invalid
            ? 'Введите действительный номер телефона'
            : ''
        "
        name="phone"
      />

      <CustomInput
        v-model.trim.lazy="$v.email.$model"
        class="questionnaire-form__field"
        type="email"
        label="Электронная почта"
        placeholder="Электронная почта"
        required
        :error-text="
          $v.email.$dirty && $v.email.$invalid
            ? 'Введите действительный адрес электронной почты'
            : ''
        "
        name="email"
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
        label="Готовы ли вы к частым командировкам? (до 2-3-х раз каждый месяц)"
        placeholder="Выберите вариант"
        :error-text="
          $v.trips.$dirty && !$v.trips.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        required
      />

      <div class="questionnaire-form__title _visually-h4">
        Высшее образование
      </div>

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
            calendar="year"
            class="questionnaire-form__field"
            label="Начало обучения (год)"
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
            calendar="year"
            class="questionnaire-form__field"
            label="Окончание обучения (год)"
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

      <div class="questionnaire-form__title _noMB _visually-h4">
        Дополнительное образование
      </div>

      <p class="questionnaire-form__text _visually-h4">
        Необходимо указать информацию за последние 5 лет
      </p>

      <CustomInput
        v-model.trim="additionalEducation.universityName"
        class="questionnaire-form__field"
        label="Название учебного заведения"
        placeholder="Название учебного заведения"
        :name="`additionalEducation-universityName`"
      />

      <CustomInput
        v-model.trim="additionalEducation.program"
        class="questionnaire-form__field"
        label="Название программы"
        placeholder="Название программы"
        :name="`additionalEducation-program`"
      />

      <SearchSelect
        v-model.trim="additionalEducation.format"
        :options="additionalEducationFormats"
        class="questionnaire-form__field"
        label="Формат"
        placeholder="Формат"
      />

      <CustomInput
        v-model.trim="additionalEducation.begin"
        calendar="year"
        class="questionnaire-form__field"
        label="Начало обучения (год)"
        placeholder="Начало обучения"
        :name="`additionalEducation-begin`"
      />

      <CustomInput
        v-model.trim="additionalEducation.end"
        calendar="month"
        class="questionnaire-form__field"
        label="Окончание обучения (месяц, год)"
        placeholder="Окончание обучения"
        :name="`additionalEducation-end`"
      />

      <SearchSelect
        v-model.trim="additionalEducation.country"
        searchable
        :options="countries"
        class="questionnaire-form__field"
        label="Страна обучения"
        placeholder="Начните вводить"
        @search="searchCountry"
        @focus="countries = []"
        @selected="additionalEducation.city = ''"
      />

      <SearchSelect
        v-model.trim="additionalEducation.city"
        searchable
        :options="cities"
        :disabled="!additionalEducation.country"
        class="questionnaire-form__field"
        label="Город обучения"
        placeholder="Начните вводить"
        @search="searchCity($event, additionalEducation.country)"
        @focus="cities = []"
      />

      <CustomInput
        v-model.trim="additionalEducation.reason"
        type="textarea"
        class="questionnaire-form__field"
        label="Почему они были полезны для вас"
        placeholder="Введите текст"
        name="additionalEducation-reason"
      />

      <div class="questionnaire-form__title _visually-h4">Языки</div>

      <div class="questionnaire-form__blocks">
        <div
          v-for="(item, index) in languages"
          :key="index"
          class="questionnaire-form-block"
        >
          <CustomInput
            v-model.trim.lazy="$v.languages[index].name.$model"
            class="questionnaire-form__field"
            label="Язык"
            placeholder="Язык"
            required
            :error-text="
              $v.languages[index].name.$dirty &&
              !$v.languages[index].name.required
                ? 'Это поле необходимо заполнить'
                : ''
            "
            :name="`languagesName-${index + 1}`"
          />

          <SearchSelect
            v-model.trim.lazy="$v.languages[index].level.$model"
            :options="languageLevels"
            class="questionnaire-form__field"
            label="Уровень владения"
            placeholder="Уровень владения"
            :error-text="
              $v.languages[index].level.$dirty &&
              !$v.languages[index].level.required
                ? 'Это поле необходимо заполнить'
                : ''
            "
            required
          />

          <a
            v-if="languages.length > 1"
            class="questionnaire-form-block__delete"
            href=""
            @click.prevent="languages.splice(index, 1)"
            >Удалить</a
          >
        </div>

        <Btn
          class="questionnaire-form__btn _small"
          arrow=""
          type="button"
          text="Добавить"
          @click.native="addLanguage"
        >
        </Btn>
      </div>

      <div class="questionnaire-form__title _visually-h4">
        Текущий опыт работы
      </div>

      <CustomInput
        v-model.trim.lazy="$v.currentWorkExp.experience.$model"
        mask-type="age"
        class="questionnaire-form__field"
        label="Общий стаж работы (лет)"
        placeholder="Общий стаж работы"
        required
        :error-text="
          $v.currentWorkExp.experience.$dirty &&
          !$v.currentWorkExp.experience.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        name="currentWorkExp-experience"
      />

      <CustomInput
        v-model.trim.lazy="$v.currentWorkExp.organization.$model"
        class="questionnaire-form__field"
        label="Название организации"
        placeholder="Название организации"
        required
        :error-text="
          $v.currentWorkExp.organization.$dirty &&
          !$v.currentWorkExp.organization.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        name="currentWorkExp-organization"
      />

      <CustomInput
        v-model.trim.lazy="$v.currentWorkExp.organizationSite.$model"
        class="questionnaire-form__field"
        label="Сайт организации"
        placeholder="Сайт организации"
        required
        :error-text="
          $v.currentWorkExp.organizationSite.$dirty &&
          !$v.currentWorkExp.organizationSite.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        name="currentWorkExp-organizationSite"
      />

      <CustomInput
        v-model.trim.lazy="$v.currentWorkExp.begin.$model"
        calendar="date"
        class="questionnaire-form__field"
        label="Дата начала работы в организации"
        placeholder="Дата начала работы"
        required
        :error-text="
          $v.currentWorkExp.begin.$dirty && !$v.currentWorkExp.begin.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        name="currentWorkExp-begin"
      />

      <CustomInput
        v-model.trim.lazy="$v.currentWorkExp.responsibilities.$model"
        class="questionnaire-form__field"
        label="Основные обязанности"
        placeholder="Основные обязанности"
        required
        :error-text="
          $v.currentWorkExp.responsibilities.$dirty &&
          !$v.currentWorkExp.responsibilities.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        name="currentWorkExp-responsibilities"
      />

      <CustomInput
        v-model.trim.lazy="$v.currentWorkExp.employees.$model"
        mask-type="count"
        class="questionnaire-form__field"
        label="Количество сотрудников в подчинении"
        placeholder="Количество сотрудников в подчинении"
        required
        :error-text="
          $v.currentWorkExp.employees.$dirty &&
          !$v.currentWorkExp.employees.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        name="currentWorkExp-employees"
      />

      <CustomInput
        v-model.trim.lazy="$v.currentWorkExp.managementExperience.$model"
        mask-type="age"
        class="questionnaire-form__field"
        label="Управленческий стаж (лет, за всю карьеру)"
        placeholder="Управленческий стаж"
        required
        :error-text="
          $v.currentWorkExp.managementExperience.$dirty &&
          !$v.currentWorkExp.managementExperience.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        name="currentWorkExp-managementExperience"
      />

      <div class="questionnaire-form__title _visually-h4">
        Предыдущий опыт работы
      </div>

      <Checkbox
        v-model="noPreviousWork"
        class="questionnaire-form__field"
        label="Нет предыдущего опыта работы"
      />

      <CustomInput
        v-model.trim.lazy="$v.previousWorkDescription.$model"
        type="textarea"
        class="questionnaire-form__field"
        label="Опишите ваш опыт работы за последние 10 лет"
        placeholder="Введите текст"
        :disabled="noPreviousWork"
        name="previousWorkDescription"
        :required="!noPreviousWork"
        :error-text="
          $v.previousWorkDescription.$dirty &&
          !$v.previousWorkDescription.required &&
          !noPreviousWork
            ? 'Это поле необходимо заполнить'
            : ''
        "
      />

      <div class="questionnaire-form__blocks">
        <div
          v-for="(item, index) in previousWorks"
          :key="index"
          class="questionnaire-form-block"
        >
          <CustomInput
            v-model.trim.lazy="$v.previousWorks[index].organization.$model"
            class="questionnaire-form__field"
            label="Название организации"
            placeholder="Название организации"
            :required="!noPreviousWork"
            :disabled="noPreviousWork"
            :error-text="
              $v.previousWorks[index].organization.$dirty &&
              !$v.previousWorks[index].organization.required &&
              !noPreviousWork
                ? 'Это поле необходимо заполнить'
                : ''
            "
            :name="`previousWorksOrganization-${index + 1}`"
          />

          <SearchSelect
            v-model.trim.lazy="$v.previousWorks[index].industry.$model"
            searchable
            :options="industries"
            class="questionnaire-form__field"
            label="Отрасль"
            placeholder="Начните вводить"
            :error-text="
              $v.previousWorks[index].industry.$dirty &&
              !$v.previousWorks[index].industry.required &&
              !noPreviousWork
                ? 'Это поле необходимо заполнить'
                : ''
            "
            :required="!noPreviousWork"
            :disabled="noPreviousWork"
            @search="searchIndustry"
            @focus="industries = []"
          />

          <CustomInput
            v-model.trim.lazy="$v.previousWorks[index].location.$model"
            class="questionnaire-form__field"
            label="Страна, Город (предыдущий опыт работы)"
            placeholder="Страна, Город"
            :required="!noPreviousWork"
            :disabled="noPreviousWork"
            :error-text="
              $v.previousWorks[index].location.$dirty &&
              !$v.previousWorks[index].location.required &&
              !noPreviousWork
                ? 'Это поле необходимо заполнить'
                : ''
            "
            :name="`previousWorksLocation-${index + 1}`"
          />

          <CustomInput
            v-model.trim.lazy="$v.previousWorks[index].lastPosition.$model"
            class="questionnaire-form__field"
            label="Последняя позиция в организации"
            placeholder="Последняя позиция в организации"
            :required="!noPreviousWork"
            :disabled="noPreviousWork"
            :error-text="
              $v.previousWorks[index].lastPosition.$dirty &&
              !$v.previousWorks[index].lastPosition.required &&
              !noPreviousWork
                ? 'Это поле необходимо заполнить'
                : ''
            "
            :name="`previousWorksLastPosition-${index + 1}`"
          />

          <CustomInput
            v-model.trim.lazy="$v.previousWorks[index].begin.$model"
            calendar="date"
            class="questionnaire-form__field"
            label="Дата начала работы в организации"
            placeholder="Дата начала работы"
            :required="!noPreviousWork"
            :disabled="noPreviousWork"
            :error-text="
              $v.previousWorks[index].begin.$dirty &&
              !$v.previousWorks[index].begin.required &&
              !noPreviousWork
                ? 'Это поле необходимо заполнить'
                : ''
            "
            :name="`previousWorksBegin-${index + 1}`"
          />

          <CustomInput
            v-model.trim.lazy="$v.previousWorks[index].end.$model"
            calendar="date"
            class="questionnaire-form__field"
            label="Дата окончания работы в организации"
            placeholder="Дата окончания работы"
            :required="!noPreviousWork"
            :disabled="noPreviousWork"
            :error-text="
              $v.previousWorks[index].end.$dirty &&
              !$v.previousWorks[index].end.required &&
              !noPreviousWork
                ? 'Это поле необходимо заполнить'
                : ''
            "
            :name="`previousWorksEnd-${index + 1}`"
          />

          <a
            v-if="previousWorks.length > 1"
            class="questionnaire-form-block__delete"
            href=""
            @click.prevent="previousWorks.splice(index, 1)"
            >Удалить</a
          >
        </div>

        <Btn
          v-if="!noPreviousWork"
          class="questionnaire-form__btn _small"
          arrow=""
          type="button"
          text="Добавить"
          @click.native="addPreviousWork"
        >
        </Btn>
      </div>

      <div class="questionnaire-form__title _visually-h4">
        Области опыта и знаний
      </div>

      <CustomInput
        v-model.trim.lazy="$v.experience.items.$model"
        class="questionnaire-form__field"
        label="В какой области вы считаете себя экспертом?"
        placeholder="В какой области вы считаете себя экспертом?"
        required
        :error-text="
          $v.experience.items.$dirty && !$v.experience.items.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        :name="`experienceItems`"
      />

      <CustomInput
        v-model.trim.lazy="$v.experience.stateInteraction.$model"
        type="textarea"
        class="questionnaire-form__field"
        label="Есть ли у вас опыт взаимодействия с органами государственного и муниципального управления? Опишите его."
        placeholder="Введите текст"
        name="experienceStateInteraction"
        required
        :error-text="
          $v.experience.stateInteraction.$dirty &&
          !$v.experience.stateInteraction.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
      />

      <div class="questionnaire-form__title _visually-h4">
        Профессиональные достижения
      </div>

      <CustomInput
        v-model.trim.lazy="$v.achievements.items.$model"
        class="questionnaire-form__field"
        type="textarea"
        label="Каковы, на ваш взгляд, наиболее значимые достижения вашей профессиональной деятельности? Перечислите 3 наиболее важных."
        placeholder="Введите текст"
        required
        :error-text="
          $v.achievements.items.$dirty && !$v.achievements.items.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
        :name="`achievementsItems`"
      />

      <CustomInput
        v-model.trim="experience.awards"
        type="textarea"
        class="questionnaire-form__field"
        label="Звания, награды, членство в ассоциациях."
        placeholder="Введите текст"
        name="achievementsAwards"
      />

      <div class="questionnaire-form__title _visually-h4">Эссе</div>

      <CustomInput
        v-model.trim.lazy="$v.esse.first.$model"
        class="questionnaire-form__field"
        type="textarea"
        label="Опишите ваше видение развития системы высшего образования в Российской Федерации перспективе 10-15 лет. Какие проблемы вы видите? Что мешает сейчас их решению?  Ваши предложения по решению проблем."
        placeholder="Введите текст"
        required
        :error-text="
          $v.esse.first.$dirty && $v.esse.first.$invalid
            ? 'Минимальный объем – 2500 символов, максимальный – 5000'
            : ''
        "
        :name="`esseFirst`"
      />

      <CustomInput
        v-model.trim.lazy="$v.esse.second.$model"
        class="questionnaire-form__field"
        type="textarea"
        label="Опыт развития системы высшего образования в каких странах и/или кейсы трансформации университетов вы считаете успешными? Аргументируйте и объясните свой выбор."
        placeholder="Введите текст"
        required
        :error-text="
          $v.esse.second.$dirty && $v.esse.second.$invalid
            ? 'Минимальный объем – 2500 символов, максимальный – 5000'
            : ''
        "
        :name="`esseSecond`"
      />

      <div class="questionnaire-form__title _noMB _visually-h4">
        Мотивационное письмо
      </div>

      <p class="questionnaire-form__text _mbSmall">
        Мы просим Вас предоставить мотивационное письмо в формате
        видеообращения. Максимальная продолжительность видео – не менее 1,5
        минут и не более 3 минут. В данном видеообращение необходимо отразить
        ответы на все вопросы.
      </p>

      <p class="questionnaire-form__text">
        Расскажите о своем решение принять участие в отборе на образовательную
        программу для формирования экспертного резерва программы стратегического
        академического лидерства «Приоритет-2030». Какую цель и какие задачи вы
        ставит перед собой в качестве будущего эксперта Программы
        стратегического академического лидерства «Приоритет-2030»? Какой вклад
        вы можете внести? Какие профессиональные цели вы ставите перед собой на
        период ближайших 5 лет?
      </p>

      <CustomInput
        v-model.trim.lazy="$v.motivationLetterLink.$model"
        class="questionnaire-form__field"
        label="Cсылка на видеохостинг с открытым доступом"
        placeholder="Cсылка"
        name="motivationLetterLink"
        required
        :error-text="
          $v.motivationLetterLink.$dirty && !$v.motivationLetterLink.required
            ? 'Это поле необходимо заполнить'
            : ''
        "
      />

      <div class="questionnaire-form__title _noMB _visually-h4">Документы</div>

      <p class="questionnaire-form__text">
        Допустимые форматы: png, jpeg, jpg. Размер файла не должен превышать
        10мб.
      </p>

      <CustomInput
        v-model="files.diploma.text"
        type="file"
        class="questionnaire-form__field"
        label="Скан диплома о высшем образовании"
        placeholder="Скан диплома о высшем образовании"
        name="dimploma"
        :error-text="files.diploma.error"
        @onFileChange="
          files.diploma.error = ''
          files.diploma.file = $event
        "
        @onFileError="files.diploma.error = $event"
      />

      <CustomInput
        v-model.lazy="$v.files.photo.text.$model"
        type="file"
        class="questionnaire-form__field"
        label="Портретное фото"
        placeholder="Выберите файл"
        name="photo"
        required
        :error-text="
          $v.files.photo.text.$dirty && !$v.files.photo.text.required
            ? 'Необходимо загрузить файл'
            : '' || files.photo.error
        "
        @onFileChange="
          files.photo.error = ''
          files.photo.file = $event
        "
        @onFileError="files.photo.error = $event"
      />

      <div class="questionnaire-form__title _noMB _visually-h4">
        Спасибо за Ваше время и ответы!
      </div>

      <p class="questionnaire-form__text">
        Если осталось что-либо, о чем Вы считаете важным упомянуть, пожалуйста,
        используйте это поле.
      </p>

      <CustomInput
        v-model.trim="comment"
        type="textarea"
        class="questionnaire-form__field"
        label="Комментарии"
        placeholder="Введите текст"
        name="comment"
      />

      <div class="questionnaire-form-submit">
        <p>
          <strong
            >К рассмотрению принимаются только полностью заполненные
            анкеты.</strong
          >
        </p>

        <p><sup>*</sup>Обязательные поля для заполнения</p>

        <p class="questionnaire-form__policy">
          {{ lang['registration.policy.text'] }}
          <SmartLink class="hover-opacity" :to="lang['base.policyLink']">{{
            lang['registration.policy.link.text']
          }}</SmartLink>
        </p>

        <Btn
          class="questionnaire-form__btn"
          type="submit"
          text="Отправить"
          :loading="isLoading"
        />
      </div>
    </form>
  </transition>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { debounce } from 'throttle-debounce'
import { mapMutations, mapState } from 'vuex'
import CustomInput from '~/components/controls/CustomInput'
import SearchSelect from '~/components/controls/SearchSelect'
import Checkbox from '~/components/controls/Checkbox'
import Btn from '~/components/controls/Btn'
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'QuestionnaireForm',
  components: { SearchSelect, CustomInput, Checkbox, Btn, SmartLink },
  mixins: [validationMixin],
  data() {
    return {
      isDone: false,
      boolList: ['Да', 'Нет'],
      isLoading: false,
      additionalEducationFormats: [
        'Курсы/тренинги',
        'Программа повышения квалификации',
        'Программа профессиональной переподготовки',
        'МВА',
        'DBA',
        'Executive MBA',
      ],
      languageLevels: [
        'Элементарный',
        'Средний',
        'Продвинутый',
        'Свободно владею',
        'Родной язык',
      ],
      industries: [],
      lastName: '',
      name: '',
      secondName: '',
      phone: '',
      email: '',
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
      additionalEducation: [
        {
          universityName: '',
          program: '',
          format: '',
          begin: '',
          end: '',
          country: '',
          city: '',
          reason: '',
        },
      ],
      languages: [
        {
          name: '',
          level: '',
        },
      ],
      currentWorkExp: {
        experience: '',
        organization: '',
        organizationSite: '',
        begin: '',
        responsibilities: '',
        employees: '',
        managementExperience: '',
      },
      previousWorkDescription: '',
      noPreviousWork: false,
      previousWorks: [
        {
          organization: '',
          industry: '',
          location: '',
          lastPosition: '',
          begin: '',
          end: '',
        },
      ],
      experience: {
        items: '',
        stateInteraction: '',
      },
      achievements: {
        items: '',
        awards: '',
      },
      esse: {
        first: '',
        second: '',
      },
      motivationLetterLink: '',
      files: {
        diploma: {
          text: '',
          file: null,
          error: '',
        },
        photo: {
          text: '',
          file: null,
          error: '',
        },
      },
      comment: '',
    }
  },
  computed: {
    ...mapState('default', ['lang']),
  },
  validations() {
    const result = {
      lastName: { required },
      name: { required },
      secondName: { required },
      country: { required },
      city: { required },
      relocation: { required },
      trips: { required },
      previousWorkDescription: this.noPreviousWork ? {} : { required },
      email: { required, email },
      phone: { required, minLength: minLength(16) },
      achievements: {
        items: { required },
      },
      esse: {
        first: {
          required,
          maxLength: maxLength(5000),
          minLength: minLength(2500),
        },
        second: {
          required,
          maxLength: maxLength(5000),
          minLength: minLength(2500),
        },
      },
      files: {
        photo: { text: { required } },
      },
      motivationLetterLink: { required },
    }

    const fields = [
      'higherEducations',
      'languages',
      'currentWorkExp',
      'previousWorks',
      'experience',
    ]
    fields.forEach((field) => {
      if (Array.isArray(this[field])) {
        result[field] = this[field].reduce((acc, item, index) => {
          const result = {}

          Object.keys(item).forEach((key) => {
            result[key] =
              field === 'higherEducations' && this.noHigherEducation
                ? {}
                : field === 'previousWorks' && this.noPreviousWork
                ? {}
                : { required }
          })

          acc[index] = result
          return acc
        }, {})
      } else {
        result[field] = Object.keys(this[field]).reduce((acc, key) => {
          acc[key] = { required }

          return acc
        }, {})
      }
    })

    return result
  },
  methods: {
    ...mapMutations('default', ['changePopupState']),
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
    searchIndustry: debounce(500, async function (query) {
      const response = await this.$api.dadata.getIndustries(query.str)
      const suggestions = response?.suggestions || []

      this.industries = suggestions.reduce((acc, item) => {
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

    addLanguage() {
      this.languages.push({
        name: '',
        level: '',
      })
    },

    addPreviousWork() {
      this.previousWorks.push({
        organization: '',
        industry: '',
        location: '',
        lastPosition: '',
        begin: '',
        end: '',
      })
    },

    submit() {
      this.$v.$touch()

      if (
        this.$v.$invalid ||
        this.files.photo.error ||
        this.files.diploma.error
      ) {
        this.changePopupState({
          isShow: true,
          title: 'Ошибка',
          text: 'Необходимо заполнить обязательные поля формы.',
          to: '',
        })

        return
      }

      this.isLoading = true

      const formData = new FormData()

      const personal = {
        lastName: this.lastName,
        name: this.name,
        secondName: this.secondName,
        phone: this.phone,
        email: this.email,
        country: this.country,
        city: this.city,
        relocation: this.relocation,
        trips: this.trips,
      }

      formData.append('personal', JSON.stringify(personal))

      if (!this.noHigherEducation) {
        formData.append(
          'higherEducations',
          JSON.stringify(this.higherEducations)
        )
      }

      formData.append(
        'additionalEducation',
        JSON.stringify(this.additionalEducation[0])
      )

      formData.append('languages', JSON.stringify(this.languages))

      formData.append('currentWorkExp', JSON.stringify(this.currentWorkExp))

      if (!this.noPreviousWork) {
        const previousWork = {
          description: this.previousWorkDescription,
          items: this.previousWorks,
        }

        formData.append('previousWork', JSON.stringify(previousWork))
      }

      formData.append('experience', JSON.stringify(this.experience))

      formData.append('achievements', JSON.stringify(this.achievements))

      formData.append('esse', JSON.stringify(this.esse))

      formData.append('motivationLetterLink', this.motivationLetterLink)

      if (this.files.diploma.file) {
        formData.append('diplomaFile', this.files.diploma.file)
      }

      formData.append('photoFile', this.files.photo.file)

      formData.append('comment', this.comment)

      this.$axios
        .$post('/api/questionnaire', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({ errors }) => {
          if (errors.length > 0) {
            this.changePopupState({
              isShow: true,
              title: 'Ошибка',
              text: errors[0].message,
              to: '',
            })
          } else {
            this.isDone = true
          }
        })
        .catch((e) => {
          this.changePopupState({
            isShow: true,
            title: 'Ошибка',
            text: e.message,
            to: '',
          })
        })
        .finally(() => {
          this.isLoading = false
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
    margin-bottom: 3.2rem;
    font-weight: bold;

    &._noMB {
      margin-bottom: 0;

      @include --mobile {
        margin-bottom: 0;
      }
    }

    &:not(:first-child) {
      margin-top: 5.6rem;

      @include --mobile {
        margin-top: 4.2rem;
      }
    }

    @include --mobile {
      margin-bottom: 2.4rem;
    }
  }

  &__text {
    @include text-small;
    margin: 1.2rem 0 4.2rem;
    color: $color_grey_text;

    @include --mobile {
      margin: 0.8rem 0 3.2rem;
    }

    &._mbSmall {
      margin-bottom: 1.6rem;

      @include --mobile {
        margin-bottom: 1.2rem;
      }
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

.questionnaire-form-submit {
  margin: 6.4rem 0 0;

  @include --mobile {
    margin-top: 4.8rem;
  }

  p {
    margin: 2.4rem 0 0;

    &:nth-child(2) {
      @include text-small;
      margin-top: 1.6rem;

      sup {
        color: $color_accent;
      }
    }
  }
}

.questionnaire-form-block {
  display: flex;
  flex-direction: column;
  margin-bottom: 3.2rem;
  padding: 1.6rem;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &__delete {
    @include hover-opacity;
    @include text-button-small;
    align-self: flex-end;
    color: $color_accent;
  }
}
</style>
