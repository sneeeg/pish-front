<template>
  <div></div>
  <!--  <v-expansion-panels-->
  <!--    v-if="hasExpansion"-->
  <!--    class="ma-1"-->
  <!--    :style="{ width: 'calc(100% - 8px)' }"-->
  <!--  >-->
  <!--    <v-expansion-panel>-->
  <!--      <v-expansion-panel-header-->
  <!--        ><p class="mb-0" v-html="title"></p-->
  <!--      ></v-expansion-panel-header>-->
  <!--      <v-expansion-panel-content>-->
  <!--        <AppConstructor :models="items"></AppConstructor>-->
  <!--      </v-expansion-panel-content>-->
  <!--    </v-expansion-panel>-->
  <!--  </v-expansion-panels>-->

  <!--  <v-card v-else class="pa-6 ma-1">-->
  <!--    <ProgramConstructor :items="items"></ProgramConstructor>-->
  <!--  </v-card>-->
</template>

<script>
// import ProgramConstructor from '~/components/appConstructor/ProgramConstructor'

export default {
  name: 'ArrayGroup',
  props: {
    items: {
      type: Array,
      required: true,
    },
    hasExpansion: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
