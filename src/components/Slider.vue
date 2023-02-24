<template>
    <swiper
      :slides-per-view="1"
      :loop="true"
      @swiper="onSwiper"
      :navigation="true"
      :modules="modules"
      :pagination="{ type: 'progressbar' }"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
    >
      <swiper-slide v-for="(image, i) in listImage" :key="i">
        <img :src="image" alt="slider" class="w-[80%] mx-auto"/>
      </swiper-slide>
    </swiper>
  </template>
  <script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Autoplay, Pagination, Navigation } from "swiper";
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        // console.log(swiper);
      };
      return {
        onSwiper,
        modules: [Pagination, Autoplay, Navigation],
      };
    },
    data() {
      return {
        listImage: [
          "https://i.ex-cdn.com/taichinhdoanhnghiep.net.vn/files/news/2022/10/28/trien-vong-nganh-logistics-viet-nam-nam-2022-111503.jpg",
          "https://hoanggiatuan.com/wp-content/uploads/2022/02/logistics.jpeg",
          "https://bocxeptaynguyen.com/wp-content/uploads/2021/11/logistic.png",
        ],
      };
    },
  };
  </script>