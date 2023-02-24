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
          " type="text" placeholder="Nhập mã vận đơn để tìm kiếm ..." />
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
export default {
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
      console.log(this.formSearch);
    },

    getFormSearch() {
      // const today = new Date();
      // const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      // const formatFirstDay =
      //   firstDay.getFullYear() +
      //   "-" +
      //   ((firstDay.getMonth() + 1).length != 2
      //     ? "0" + (firstDay.getMonth() + 1)
      //     : firstDay.getMonth() + 1) +
      //   "-" +
      //   (firstDay.getDate().length != 2
      //     ? "0" + firstDay.getDate()
      //     : firstDay.getDate());
      // const formatToday =
      //   today.getFullYear() +
      //   "-" +
      //   ((today.getMonth() + 1).length != 2
      //     ? "0" + (today.getMonth() + 1)
      //     : today.getMonth() + 1) +
      //   "-" +
      //   (today.getDate().length != 2 ? "0" + today.getDate() : today.getDate());

      // this.formSearch.from_date = formatFirstDay;
      // this.formSearch.to_date = formatToday;
    },
  },
};
</script>

<style></style>