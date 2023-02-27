<template>
  <div class="flex justify-between mx-6 items-center my-3">
    <span class="text-lg">█║▌ Đăng ký / Quản lý Trackings</span>
    <input class="
          border-[1px] border-solid border-black/25
          focus:outline-none
          p-2
          w-[150px]
        " type="text" placeholder="Lọc nhanh ..." />
  </div>
  <hr />
  <div class="flex justify-around items-end mt-3">
    <div class="flex flex-col">
      <span>Mã Vận Đơn</span>
      <input class="
            border-[1px] border-solid border-black/25
            focus:outline-none
            p-2
            w-[200px]
          " type="text" placeholder="Nhập mã vận đơn để tìm kiếm ..." v-model="formSearch.bol_code"/>
    </div>
    <div class="flex flex-col">
      <span>Từ Ngày</span>
      <input class="
            border-[1px] border-solid border-black/25
            focus:outline-none
            p-2
            w-[150px]
          " type="date" v-model="formSearch.from_date" />
    </div>
    <div class="flex flex-col">
      <span>Đến Ngày</span>
      <input class="
            border-[1px] border-solid border-black/25
            focus:outline-none
            p-2
            w-[150px]
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
        ">
      Tìm
    </button>
    <div class="border-l-[2px] border-solid border-gray-300 h-10"></div>
    <router-link :to="{name: 'tracking-number-create'}">
      <button class="
          rounded-sm
          bg-[#3c8dbc]
          text-white
          px-7
          py-1
          hover:bg-blue-400
          h-10
          ml-6
        ">
        █║▌ Đăng ký
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
        swal2.error('Ngày sau phải lớn hơn ngày đầu!', 3000)
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