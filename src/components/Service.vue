<template>
  <div class="container mx-auto mt-4 w-[90%] lg:w-[80%]">
    <span class="text-2xl text-[#007199] uppercase font-bold"
      >Các dịch vụ phổ biến
    </span>
    <ul
      class="
        mt-3
        bg-white
        pb-2
        px-3
        border-t-[4px] border-solid border-blue-400
      "
    >
      <li
        v-for="item in data"
        :key="item.id"
        :class="`text-[#007199] ${
          item.id % 2 == 0 ? 'mb-6' : 'mb-0'
        } font-bold text-lg`"
      >
        {{ getRandomIcon() }} {{ item.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import service from "../services/service";
export default {
  data() {
    return {
      data: [],
      icons: ["✈️", "🏠", "📦", "⛵"],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      await service.getListService().then((res) => {
        this.data = res.data.data;
      });
    },
    getRandomIcon() {
      return this.icons[Math.floor(Math.random() * 4)];
    },
  },
};
</script>

<style>
</style>