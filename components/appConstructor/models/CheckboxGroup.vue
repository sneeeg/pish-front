<template>
  <div>
    <!--    <v-checkbox-->
    <!--      v-for="item in items"-->
    <!--      :key="item.id"-->
    <!--      :style="{ pointerEvents: 'none' }"-->
    <!--      readonly-->
    <!--      :input-value="item.value"-->
    <!--      :label="item.text"-->
    <!--      hide-details-->
    <!--    ></v-checkbox>-->
  </div>
</template>

<script>
export default {
  name: 'CheckboxGroup',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
