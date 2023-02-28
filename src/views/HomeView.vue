<template>
  <div class="bg-[#ecf0f5] pb-6">
    <header-common></header-common>
    <!-- <p>{{ $t("message.hello") }}</p> -->
    <slider></slider>
    <service></service>
    <BOL></BOL>
  </div>
</template>

<script>
import Slider from "../components/Slider.vue";
import Service from "../components/Service.vue";
import BOL from '../components/BOL.vue';
import { useAuthStore } from "../store/user";
export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  components: {
    Slider,
    Service,
    BOL
  },
  data() {
    return {};
  },
  created() {
    this.getPermissionList();
  },
  methods: {
    getPermissionList(){
      this.authStore.getPermissionList();
    }
  },
};
</script>

<style>
</style>