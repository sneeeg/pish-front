<template>
  <div class="file-dropzone">
    <label
      v-if="label"
      :for="name"
      class="file-dropzone__label"
      @click="openDialog"
      >{{ label }}<sup v-if="required">*</sup></label
    >

    <div
      :class="['file-dropzone-area', { _active: active || value }]"
      @drop="onDrop"
    >
      <div
        v-if="!value"
        ref="emptyArea"
        class="file-dropzone-area__empty"
        @dragover.prevent="active = true"
        @dragleave.prevent="active = false"
        @click="openDialog"
      >
        <SvgIcon name="download" />
      </div>

      <div v-else class="file-dropzone-area__file">
        <div>{{ value.name }}</div>

        <button aria-label="delete file" @click="deleteFile">
          <SvgIcon name="cross" />
        </button>
      </div>

      <input ref="input" type="file" @change="update($event.target.files)" />
    </div>

    <div v-if="!value && !error" class="file-dropzone__placeholder">
      {{ placeholder }}
    </div>

    <div v-else-if="!value" class="file-dropzone__error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FileDropzone',

  props: {
    label: {
      type: String,
      default: 'Загрузите файл',
    },
    placeholder: {
      type: String,
      default: 'Выберите файл для загрузки',
    },
    value: {
      type: [File, String],
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    accept: {
      type: String,
      default: '',
    },
    maxFileSize: {
      type: Number,
      default: 10000000,
    },
    required: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      active: false,
      localError: '',
    }
  },

  computed: {
    ...mapState('default', ['lang']),

    error() {
      return this.errorText || this.localError
    },
  },

  methods: {
    openDialog() {
      if (this.value) return

      this.$refs.input.click()
    },

    onDrop(e) {
      e.preventDefault()

      if (this.value) return

      this.active = false

      const fileList = e.dataTransfer.files

      this.update(fileList)
    },

    deleteFile() {
      this.$emit('input', null)
    },

    update(fileList) {
      const file = fileList[0]

      this.localError = ''

      if (!file) return

      if (fileList.length > 1 || !this.$utils.getFileFormat(file.name)) {
        this.localError = this.lang['base.invalidFileFormat']

        return
      }

      if (file.size > this.maxFileSize) {
        this.localError = this.lang['base.invalidFileSize']

        return
      }

      this.$emit('input', file)
    },
  },
}
</script>

<style lang="scss">
.file-dropzone {
  position: relative;
  margin-bottom: 3.2rem;

  &__label {
    @include text-button-small;
    display: block;
    margin-bottom: 0.8rem;
    color: $color_grey_text;
    font-weight: 400;

    @include --mobile {
      margin-bottom: 0.6rem;
    }

    sup {
      position: relative;
      top: -3px;
      left: 2px;
      color: $color_accent;
      font-size: 1.3rem;
    }
  }

  &__error,
  &__placeholder {
    @include text-button-small;
    position: absolute;
    bottom: -2rem;
    color: $color_grey_text;
    font-weight: 400;
    text-transform: none;
  }

  &__error {
    color: red;
  }
}

.file-dropzone-area {
  position: relative;
  width: 100%;
  height: 5.6rem;
  border: 1px dashed currentColor;
  border-radius: 4px;
  color: $color_grey_border;
  transition: color 0.3s ease;

  &._active {
    color: $color_dark_grey;
  }

  [type='file'] {
    @include box(100%);
    position: absolute;
    visibility: hidden;
    cursor: pointer;
    opacity: 0;
  }

  &__file {
    @include box(100%);
    @include text-small;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.2rem;
    color: $color_black;

    > div {
      @include lineClamp(1);
    }

    button {
      @include btn-reset;
      @include box(1.4rem);
      color: $color_accent;

      svg {
        @include box(100%);
      }
    }
  }

  &__empty {
    @include box(100%);

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
      color: $color_grey_text;
      transition: color 0.2s ease;
      @include box(2rem);

      ._active & {
        color: $color_dark_grey;
      }
    }
  }
}
</style>
