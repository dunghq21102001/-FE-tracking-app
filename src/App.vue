<script>
export default {
  components: {
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  }
};
</script>

<template>
  <main>
    <RouterView />
    <footer-common v-if="currentRouteName != 'login'
      && currentRouteName != 'users-management'
      && currentRouteName != 'roles-management'
      && currentRouteName != 'permissions-management'
      && currentRouteName != 'assign-roles'
      && currentRouteName != 'service-management'
      && currentRouteName != 'question-management'
      && currentRouteName != 'request-management'" />
  </main>
</template>

<style scoped></style>
