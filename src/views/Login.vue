<template>
  <div class="bg-custom w-[100vw] h-[100vh] flex justify-center items-center flex-wrap">
    <div 
    v-if="!isRegister"
    class="
          flex flex-col
          items-center
          justify-around
          w-[90%]
          sm:w-[25%]
          bg-black/75
          py-3
          rounded-lg
          h-[40vh]
        ">
      <input class="
            bg-gray-500
            py-2
            px-1
            text-white
            rounded-lg
            focus:outline-none
            w-[80%]
          " type="text" v-model="formLogin.email" @keyup.enter="login" />
      <input class="
            bg-gray-500
            py-2
            px-1
            text-white
            rounded-lg
            focus:outline-none
            w-[80%]
          " type="password" v-model="formLogin.password" @keyup.enter="login" />
      <button class="rounded-lg bg-blue-500 text-white py-2 px-4" v-if="!isLoading" @click="login">
        {{ $t('Login') }}
      </button>
      <button v-if="isLoading" type="button" class="
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
        {{$t('Processing')}}
      </button>
      <h1 class="text-white">{{ $t('No account') }}?
        <span class="cursor-pointer text-red-500" 
        @click="isRegister = true && resetForm">{{ $t('Register') }}</span>
      </h1>
    </div>

    <!-- register -->
    <div v-if="isRegister" class="
          flex flex-col
          items-center
          justify-around
          w-[90%]
          sm:w-[25%]
          bg-black/75
          py-3
          rounded-lg
          h-[40vh]
        ">
      <input class="
            bg-gray-500
            py-2
            px-1
            text-white
            rounded-lg
            focus:outline-none
            w-[80%]
          " type="text" v-model="formLogin.email" @keyup.enter="register" />
      <input class="
            bg-gray-500
            py-2
            px-1
            text-white
            rounded-lg
            focus:outline-none
            w-[80%]
          " type="password" v-model="formLogin.password" @keyup.enter="register" />
      <button class="rounded-lg bg-blue-500 text-white py-2 px-4" v-if="!isLoading" @click="register">
        {{ $t('Register') }}
      </button>
      <button v-if="isLoading" type="button" class="
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
        {{$t('Processing')}}
      </button>
      <h1 class="text-white">{{ $t('Already have an account') }} 
        <span class="cursor-pointer text-red-500" 
        @click="isRegister = false && resetForm">{{ $t('Login') }}</span>
      </h1>
    </div>

  </div>
</template>

<script>
import { useAuthStore } from "../store/user";
import service from '../services/User'
export default {
  data() {
    return {
      formLogin: {
        email: "",
        password: "",
        roles: []
      },
      isLoading: false,
      isRegister: false
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async login() {
      this.isLoading = true;
      const dataSubmit = {
        email: this.formLogin.email,
        password: this.formLogin.password,
      };
      await this.authStore.login(dataSubmit);
      await this.authStore.getProfile();
      this.isLoading = false;

      if (this.authStore.token != null) {
        // swal2.success("Đăng nhập thành công", 2000);
        this.$router.push({ name: "home" });
      }
    },
    async register(){
      this.isLoading = true
      await service.register(this.formLogin)
        .then(res => {
          console.log(res);
          this.isRegister = false
          this.isLoading = false
          this.resetForm()
          swal2.success(this.$t('Successful registration, please login to experience'), 5000)
        })
        .catch(err => {
          // swal2.error(err)
          swal2.error(this.$t('Email already exist'))
          this.isLoading = false
        })
    },
    resetForm() {
      this.formLogin = {
        email: "",
        password: "",
      }
    }
  },
  created() { },
};
</script>

<style scoped>
.bg-custom {
  background: url("https://img.freepik.com/premium-photo/transportation-logistics-container-cargo-ship-cargo-plane-3d-rendering-illustration_37416-421.jpg?w=2000") no-repeat center;
}
</style>