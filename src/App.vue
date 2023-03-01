<script>
import { useLanguageStore } from './store/language';
export default {
  setup() {
    const langStore = useLanguageStore()
    return { langStore }
  },
  components: {
  },
  created() {
    this.getCurrentLang()
  },
  methods: {
    getCurrentLang() {
      this.$i18n.locale = this.langStore.getLocate 
    }
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
