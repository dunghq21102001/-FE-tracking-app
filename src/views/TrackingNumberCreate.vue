<template>
  <header-common></header-common>
  <div class="w-full min-h-[100vh] pt-4 bg-[#ecf0f5]">
    <div class="w-[80%] mx-auto flex justify-between mb-4">
      <span class="text-2xl text-[#007199] uppercase font-bold">
        Đăng Ký Tracking
      </span>
    </div>

    <!-- user -->
    <div class="mx-auto w-[90%] lg:w-[80%] bg-white border-t-[4px] border-blue-400 border-solid pt-4 px-4">
      <div class="flex flex-col">
        <span>{{ $t('Information') }} {{ $t('Sender') }}
          <router-link :to="{ name: 'profile' }">
            <button class="
              rounded-lg
              bg-[#00c0ef]
              text-white
              p-1
              text-sm
              border-[1px] border-solid border-[#00acd6]
              ml-4
            ">
              🖊️ {{ $t('Update') }}
            </button>
          </router-link>
        </span>
        <div class="w-full flex flex-wrap justify-between mt-3 items-end md:items-start">
          <div class="flex flex-col w-[25%]">
            <span>{{ $t('Sender') }}</span>
            <input type="text" disabled
              class="border-[1px] border-solid border-gray-400 hover:cursor-not-allowed bg-gray-300 w-full"
              :value="user.last_name">
          </div>
          <div class="flex flex-col w-[25%]">
            <span>{{ $t('Phone') }}</span>
            <input type="text" disabled
              class="border-[1px] border-solid border-gray-400 hover:cursor-not-allowed bg-gray-300 w-full"
              :value="user.phone1">
          </div>
          <div class="flex flex-col w-[40%]">
            <span>{{ $t('Address') }}</span>
            <input type="text" disabled
              class="border-[1px] border-solid border-gray-400 hover:cursor-not-allowed bg-gray-300 w-full"
              :value="user.address">
          </div>
        </div>
      </div>

      <!-- receiver -->
      <div class="flex flex-col mt-14">
        <span>{{ $t('Information') }} {{ $t('Receiver') }} <span class="text-red-500">(*)</span>
          <router-link :to="{ name: 'receiver' }">
            <button class="
              rounded-lg
              bg-[#00a65a]
              text-white
              p-1
              text-sm
              border-[1px] border-solid border-[#008d4c]
              ml-4
            ">
              🖊️ {{ $t('Create') }} / {{ $t('Update') }}
            </button>
          </router-link>
        </span>
        <select class="w-[200px] py-2 text-center border-black border-[2px] rounded-lg border-solid mt-4"
          v-model="selectedReceiver">
          <option disabled value="">{{ $t('Choose', [$t('Receiver')]) }}</option>
          <option v-for="(item, i) in receiverList" :key="item.id" v-bind:value="item.id">
            {{ item.last_name }}
          </option>
        </select>
        <div v-if="isOpen && currentReceiver" class="w-full flex flex-wrap justify-between mt-3 items-end md:items-start">
          <div class="flex flex-col w-[25%]">
            <span>{{ $t('Receiver') }}</span>
            <input type="text" disabled
              class="border-[1px] border-solid border-gray-400 hover:cursor-not-allowed bg-gray-300 w-full"
              :value="currentReceiver[0].last_name">
          </div>
          <div class="flex flex-col w-[25%]">
            <span>{{ $t('Phone') }}</span>
            <input type="text" disabled
              class="border-[1px] border-solid border-gray-400 hover:cursor-not-allowed bg-gray-300 w-full"
              :value="currentReceiver[0].phone1">
          </div>
          <div class="flex flex-col w-[40%]">
            <span>{{ $t('Address') }}</span>
            <input type="text" disabled
              class="border-[1px] border-solid border-gray-400 hover:cursor-not-allowed bg-gray-300 w-full"
              :value="currentReceiver[0].address">
          </div>
        </div>
      </div>

      <!-- thông tin vận đơn -->
      <div class="flex flex-col mt-14">
        <span>{{ $t('Information') }} {{ $t('BOL') }} <span class="text-red-500">(*)</span></span>
        <textarea :placeholder="`${$t('Input to Find', ['Tracking'])}`" class="
            min-h-[100px]
            w-full
            focus:outline-none
            border-[1px] border-solid border-black/20
            p-2
            mt-3
          " v-model="formCreate.bol_id"></textarea>
        <input type="text" class="w-full
          focus:outline-none
          border-[1px] border-solid border-black/20
          p-2 mt-3" placeholder="Note ..." v-model="formCreate.note">
      </div>
      <div class="flex w-full md:w-[400px] flex-wrap justify-around mt-7 mb-4">
        <button class="rounded-sm text-white px-7 py-1 max-h-10 bg-[#3c8dbc]
                    border-[1px] border-solid border-[#367fa9]" @click="createTracking">
          {{ $t('Register') }}
        </button>
        <router-link :to="{ name: 'tracking-number' }">
          <button class="rounded-sm px-7 py-1 max-h-10 bg-[#d4c9c9] border-[1px] border-solid border-[#ddd]">
            <span>{{ $t('Back') }}</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/user'
import receiverService from "../services/receiver";
import trackingService from '../services/trackingNumber'
export default {
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data() {
    return {
      user: this.authStore.getUser,
      receiverList: [],
      selectedReceiver: '',
      currentReceiver: null,
      isOpen: false,
      formCreate: {
        bol_id: '',
        note: ''
      }
    }
  }, created() {
    this.getReceiverList();
  },
  watch: {
    selectedReceiver() {
      this.getDetailReceiver()
    }
  },
  methods: {
    async getReceiverList() {
      await receiverService.getListReceiver().then((res) => {
        this.receiverList = res.data.data;
      });
    },
    getDetailReceiver() {
      this.isOpen = true
      const selectedReceiver = this.selectedReceiver
      this.currentReceiver = this.receiverList.filter(function (elem) {
        if (elem.id == selectedReceiver) return elem

      });
    },
    async createTracking() {
      if(this.formCreate.bol_id.trim() == '') return swal2.error(`${this.$t('Enter To', [this.$t('BOL'), this.$t('Create')])}`)
      if(this.currentReceiver == null) return swal2.error(`${this.$t('Enter To', [this.$t('Receiver'), this.$t('Create')])}`)
      const dataCreate = {
        receiver_id: this.currentReceiver[0].id,
        bol_id: this.formCreate.bol_id,
        note: this.formCreate.note,
        status: 'new',
        delivery_note: 'none'
      }
      await trackingService.createTracking(dataCreate)
        .then(res => {
          // this.isOpen = false
          // this.formCreate.bol_id = ''
          // this.formCreate.note = ''
          // this.currentReceiver = null
          this.$router.push({name: 'tracking-number'})
          swal2.success(`${this.$t('Create', ['Tracking'])} ${this.$t('Successfully')}`)
        })
        .catch(e => {
          if(err.response.data.message 
          && err.response.data.message == 'You are not allowed'){
            swal2.error(`${this.$t('You are not authorized to take action')}`)
            this.$router.push({ name: "error" });
          }
        })
    },
  }
};
</script>

<style></style>