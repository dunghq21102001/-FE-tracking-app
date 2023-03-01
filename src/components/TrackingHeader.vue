<template>
  <div class="flex justify-between mx-6 items-center my-3 flex-col md:flex-row">
    <span class="text-[14px] md:text-lg">█║▌ {{$t('Create', ['Tracking'])}} / {{$t('Manage')}} Trackings</span>
    <input class="
          border-[1px] border-solid border-black/25
          focus:outline-none
          p-2
          w-[150px]
          mt-3 md:mt-0
        " type="text" placeholder="Lọc nhanh ..." />
  </div>
  <hr />
  <div class="flex justify-around items-center md:items-end mt-3 flex-wrap flex-col md:flex-row">
    <div class="flex flex-col">
      <span>{{$t('BOL')}}</span>
      <input class="
            border-[1px] border-solid border-black/25
            focus:outline-none
            p-2
            w-[200px]
          " type="text" :placeholder="`${$t('Input to Find', [$t('BOL')])}`"
           v-model="formSearch.bol_code"/>
    </div>
    <div class="flex flex-col">
      <span>{{$t('From Date')}}</span>
      <input class="
            mt-3 md:mt-0
            border-[1px] border-solid border-black/25
            focus:outline-none
            p-2
            w-[200px] md:w-[150px]
          " type="date" v-model="formSearch.from_date" />
    </div>
    <div class="flex flex-col">
      <span>{{$t('To Date')}}</span>
      <input class="
            mt-3 md:mt-0
            border-[1px] border-solid border-black/25
            focus:outline-none
            p-2
            w-[200px] md:w-[150px]
          " type="date" v-model="formSearch.to_date" />
    </div>
    <button @click="search" class="
          rounded-sm
          bg-[#3c8dbc]
          text-white
          px-7
          py-1
          hover:bg-blue-400
          h-10
          mt-3 md:mt-0
          w-[200px]
        ">
      {{$t('Search')}}
    </button>
    <div class=" hidden md:block border-l-[2px] border-solid border-gray-300 h-10"></div>
    <router-link :to="{name: 'tracking-number-create'}">
      <button class="
          rounded-sm
          bg-[#3c8dbc]
          text-white
          px-7
          py-1
          hover:bg-blue-400
          h-10
          ml-0 md:ml-6
          w-[200px] md:w-[155px]
          mt-3 md:mt0
        ">
        █║▌ {{$t('Create')}}
      </button>
    </router-link>
  </div>
</template>

<script>
import { useTrackingStore } from '../store/tracking';
export default {
  emits: ["searchBOL"],
  setup(){
    const trackingStore = useTrackingStore()
    return {trackingStore}
  },
  data() {
    return {
      formSearch: {
        search_data: "",
        bol_code: "",
        from_date: "",
        to_date: "",
      },
    };
  },
  created() {
    // this.getFormSearch()
  },
  methods: {
    search() {
      if(this.formSearch.from_date > this.formSearch.to_date){
        swal2.error(`${$t('The next day must be bigger than the first day!')}`, 3000)
        return
      }
      this.$emit('searchBOL', this.formSearch)

      this.formSearch = {
        search_data: "",
        bol_code: "",
        from_date: "",
        to_date: "",
      }
    },
  },
};
</script>

<style></style>