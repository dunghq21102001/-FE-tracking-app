<template>
  <div class="w-full bg-[#3c8dbc] flex justify-between h-14 items-center px-5">
    <div class="flex">
      <img src="../assets/headerLogo.png" alt="logo" class="h-14 mr-8 py-1 cursor-pointer" />
      <ul class="flex items-center flex-wrap">
        <li class="
              cursor-pointer
              hover:bg-[#2c6d93]
              h-14
              px-3
              text-white text-center
              leading-[56px]
                  " v-for="(field, i) in fields" :key="i" :title="field.title" :class="currentTab(field.url)">
          <router-link :to="{ name: field.url }">{{ field.name }}</router-link>
        </li>
      </ul>
    </div>
    <!-- <div v-if="!user" class="flex text-white">
      <router-link :to="{ name: 'login' }">
        <button class="cursor-pointer hover:bg-[#2c6d93] h-14 px-3">
          Đăng nhập
        </button>
      </router-link>
      <router-link :to="{ name: 'register' }">
        <button class="cursor-pointer hover:bg-[#2c6d93] h-14 px-3">
          Đăng ký
        </button>
      </router-link>
    </div> -->
    <div v-if="user" class="flex items-center">
      <div class="flex items-center relative">
        <v-avatar class="cursor-pointer" v-click-outside-element="close" @click="openMenu = !openMenu"
          image="https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg"
          size="40"></v-avatar>
        <h1 class="text-white ml-2">
          {{ user.email ? user.email : "Guest" }}
        </h1>
        <div v-if="openMenu" class="
            absolute
            right-0
            top-[110%]
            z-10
            bg-[#2e698b]
            rounded-md
            w-[200px]
          ">
          <ul class="flex flex-col justify-around items-center w-full text-center text-white">
            <li v-if="haveAdminRole" class="hover:bg-gray-400 cursor-pointer my-2 px-1 py-2 w-full">
              <router-link :to="{ name: 'users-management' }">
                Dashboard
              </router-link>
            </li>
            <li class="hover:bg-gray-400 cursor-pointer my-2 px-1 py-2 w-full">
              <router-link :to="{ name: 'profile' }">
                Thông tin cá nhân
              </router-link>
            </li>
            <li class="hover:bg-gray-400 cursor-pointer my-2 px-1 py-2 w-full">
              <router-link :to="{ name: 'receiver' }">
                Danh sách người nhận
              </router-link>
            </li>
            <li class="hover:bg-gray-400 cursor-pointer my-2 px-1 py-2 w-full">
              <router-link :to="{ name: 'tracking-number' }">
                Quản lý tracking
              </router-link>
            </li>
            <li class="hover:bg-gray-400 cursor-pointer my-2 px-1 py-2 w-full text-white" @click="logout">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from "../services/menu";
import { useAuthStore } from "../store/user";
import user from "../services/User";
export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      user: this.authStore.getUser,
      fields: Service.getListMenu(),
      isLoading: false,
      openMenu: false,
      haveAdminRole: false
    };
  },
  created() {
    this.checkAdminRole()
  },
  methods: {
    logout() {
      if (!localStorage.getItem("token")) {
        this.$router.push({ name: "login" });
        return;
      }
      window.axios.defaults.headers.common = {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      };

      user
        .logout()
        .then((res) => {
          localStorage.removeItem("token");
          this.$router.push({ name: "login" });
          swal2.success("Logout successfully");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    currentTab(url) {
      if (this.$route.name == url) return "bg-[#2c6d93]";
    },
    close(el) {
      this.openMenu = false
    },
    checkAdminRole() {
      const listRoles = this.user.roles
      if (listRoles == null || listRoles == undefined) {
        this.authStore.getProfile()
      } else {
        listRoles.map(role => {
          if (role.name == 'admin') {
            this.haveAdminRole = true
          }
        })
      }
    }
  },
};
</script>

<style scoped>
li>a:hover {
  color: white;
}
</style>