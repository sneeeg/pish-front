<template>
  <div></div>
</template>

<script>
export default {
  name: 'Index',
  middleware({ app, route, redirect }) {
    redirect(app.localePath(`/dvo/${route.params.id}/about`))
  },
}
</script>
