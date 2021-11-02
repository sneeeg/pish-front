<template>
  <div></div>
  <!--  <v-checkbox-->
  <!--    :input-value="value"-->
  <!--    readonly-->
  <!--    :style="{ pointerEvents: 'none' }"-->
  <!--    :label="text"-->
  <!--  ></v-checkbox>-->
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped></style>
