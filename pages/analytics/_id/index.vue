<template>
  <div></div>
</template>

<script>
export default {
  name: 'Index',
  middleware({ app, route, redirect }) {
    redirect(app.localePath(`/analytics/${route.params.id}/about/program`))
  },
}
</script>

<style scoped></style>
