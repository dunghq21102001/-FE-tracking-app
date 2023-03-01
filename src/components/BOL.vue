<template>
  <div class="w-[90%] lg:w-[80%] mx-auto pt-3">
    <span class="text-2xl text-[#007199] uppercase font-bold">
      {{$t('Event Tracking')}}
    </span>
    <div class="
            bg-white
            border-t-[4px] border-solid border-blue-400
            mt-3
            w-full
            flex flex-col
            justify-center
            p-3
          ">
      <textarea :placeholder="`${$t('Input to Find', ['Tracking'])}`" class="
            min-h-[100px]
            w-full
            focus:outline-none
            border-[1px] border-solid border-black/20
            p-2
          " v-model="formSearch.search"></textarea>
      <button @click="search" class="bg-[#00c0ef] mt-2 text-white rounded-md px-3 py-1 w-[100px]">
        {{ $t('Search') }}
      </button>
    </div>
  </div>
</template>

<script>
import { useTrackingStore } from '../store/tracking'
export default {
  setup(){
    const trackingStore = useTrackingStore()
    return {trackingStore}
  },
  data() {
    return {
      formSearch: {
        search: ''
      }
    }
  },
  methods: {
     search() {
      this.trackingStore.setSearchData(this.formSearch.search)
      this.$router.push({name: 'tracking-number'})
    }
  }
};
</script>

<style></style>