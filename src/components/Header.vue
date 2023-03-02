<template>
  <div class="w-full bg-[#3c8dbc] flex justify-between h-14 items-center px-5">
    <div class="flex">
      <!-- <img src="../assets/headerLogo.png" alt="logo" class="h-14 mr-8 py-1 cursor-pointer" /> -->

      <!-- responsive menu -->
      <div class="block md:hidden">
        <v-menu  transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">
              ☰
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(field, i) in fields" 
            :key="i" >
            <router-link :to="{ name: field.url }">
              <v-list-item-title>
                  {{ field.name }}
                </v-list-item-title>
              </router-link>  
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- desktop menu -->
      <ul class="hidden md:flex items-center flex-wrap">
        <li class="
          cursor-pointer
          hover:bg-[#2c6d93]
          h-14
          px-3
          text-white text-center
          leading-[56px]
              " v-for="(field, i) in fields" :key="i" 
              :title="$t(`${field.title}`)" :class="currentTab(field.url)">
          <router-link :to="{ name: field.url }">{{ $t(`${field.name}`) }}</router-link>
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
    <div class="flex items-center">
      <div class="w-[120px] mr-3">
      <v-switch
      v-model="lang"
      hide-details
      :label="`${lang.toString() == 'false' ?'Tiếng Việt': 'English'}`"
      class="text-white mx-2 w-full"
      ></v-switch>
    </div>

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
                {{ $t('Dashboard') }}
              </router-link>
            </li>
            <li class="hover:bg-gray-400 cursor-pointer my-2 px-1 py-2 w-full">
              <router-link :to="{ name: 'profile' }">
                {{ $t('Profile') }}
              </router-link>
            </li>
            <li class="hover:bg-gray-400 cursor-pointer my-2 px-1 py-2 w-full">
              <router-link :to="{ name: 'receiver' }">
                {{ $t('Recipient List') }}
              </router-link>
            </li>
            <li class="hover:bg-gray-400 cursor-pointer my-2 px-1 py-2 w-full">
              <router-link :to="{ name: 'tracking-number' }">
                {{ $t('Tracking List') }}
              </router-link>
            </li>
            <li class="hover:bg-gray-400 cursor-pointer my-2 px-1 py-2 w-full text-white" @click="logout">
              {{ $t('Logout') }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  </div>
  <div  v-if="isLoading" class="
            fixed
            top-0
            left-0
            right-0
            bottom-0
            bg-black/60
            flex
            justify-center
            items-center
            z-10
          ">
    <button type="button" class="
            inline-flex
            items-center
            px-4
            py-2
            font-semibold
            leading-6
            text-sm
            shadow
            rounded-md
            text-white
            bg-blue-500
            hover:bg-blue-400
            transition
            ease-in-out
            duration-150
            cursor-not-allowed
          " disabled>
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        {{$t('Processing')}}...
      </button>
  </div>
</template>

<script>
import Service from "../services/menu";
import { useAuthStore } from "../store/user";
import { useLanguageStore } from '../store/language'
import user from "../services/User";
export default {
  setup() {
    const authStore = useAuthStore();
    const langStore = useLanguageStore()
    return { authStore, langStore};
  },
  data() {
    return {
      user: this.authStore.getUser,
      fields: Service.getListMenu(),
      isLoading: false,
      openMenu: false,
      haveAdminRole: false,
      lang: this.langStore.getLocate == 'vi' ? false : true,
    };
  },
  created() {
    this.checkAdminRole()
  },
  watch: {
    'lang'(value) {
      this.changeLanguage(value)
    }
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
          swal2.success(`${this.$t('Logout')} ${this.$t('Successfully')}`);
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
      if (this.user.roles == null || this.user.roles == undefined) {
        localStorage.removeItem('token');
        swal2.error('Token không hợp lệ!', 3000)
        window.location.href = "/login";
      }
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
    },
    changeLanguage(value) { 
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1700)
      this.langStore.setLocate(value)
      this.$i18n.locale = value == true ? 'en' : 'vi'
    }
  },
};
</script>

<style scoped>
li>a:hover {
  color: white;
}
</style>