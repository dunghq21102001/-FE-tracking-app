<template>
  <div class="w-[90%] lg:w-[80%] mx-auto pt-3">
    <span class="text-2xl text-[#007199] uppercase font-bold">
      Theo dõi vận đơn
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
      <textarea placeholder="Nhập tracking number cần tìm, 1 số trên mỗi dòng . . ." class="
            min-h-[100px]
            w-full
            focus:outline-none
            border-[1px] border-solid border-black/20
            p-2
          " v-model="searchData"></textarea>
      <button class="bg-[#00c0ef] mt-2 text-white rounded-md px-3 py-1 w-[100px]">
        Theo dõi
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: ''
    }
  },
  methods: {
    search(){
      console.log(this.searchData);
    }
  }
};
</script>

<style></style>