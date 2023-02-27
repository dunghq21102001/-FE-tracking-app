<template>
  <header-common></header-common>
  <div class="w-full min-h-[100vh] pt-4 bg-[#ecf0f5]">
    <div class="w-[80%] mx-auto">
      <span class="text-2xl text-[#007199] uppercase font-bold"
        >Thông Tin Cá Nhân
      </span>
    </div>
    <Form
      @submit="updateProfile"
      class="
        mx-auto
        w-[90%]
        lg:w-[80%]
        bg-white
        border-t-[4px] border-blue-400 border-solid
        flex flex-wrap
        items-end
        justify-around
        py-4
      "
    >
      <div class="flex flex-col mb-4">
        <label :title="formSubmit.first_name" :for="formSubmit.first_name">
          Họ <span class="text-red-500">*</span></label
        >
        <Field
          name="first_name"
          type="text"
          class="
            w-[240px]
            sm:w-[320px]
            mx-3
            border-[1px] border-solid border-gray-300
            focus:outline-none
            p-3
          "
          :id="formSubmit.first_name"
          v-model="formSubmit.first_name"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label :title="formSubmit.last_name" :for="formSubmit.last_name">
          Tên <span class="text-red-500">*</span></label
        >
        <Field
          name="last_name"
          type="text"
          class="
            w-[240px]
            sm:w-[320px]
            mx-3
            border-[1px] border-solid border-gray-300
            focus:outline-none
            p-3
          "
          :id="formSubmit.last_name"
          v-model="formSubmit.last_name"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label :title="formSubmit.email" :for="formSubmit.email"> Email </label>
        <Field
          name="email"
          disabled
          type="text"
          class="
            w-[240px]
            sm:w-[320px]
            mx-3
            border-[1px] border-solid border-gray-300
            focus:outline-none
            p-3
            bg-gray-400
            hover:cursor-not-allowed
          "
          :id="formSubmit.email"
          v-model="formSubmit.email"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label :title="formSubmit.phone1" :for="formSubmit.phone1">
          Số ĐT 1 <span class="text-red-500">*</span>
          <ErrorMessage name="phone1" class="text-red-500" />
        </label>
        <Field
          name="phone1"
          type="text"
          class="
            w-[240px]
            sm:w-[320px]
            mx-3
            border-[1px] border-solid border-gray-300
            focus:outline-none
            p-3
          "
          :id="formSubmit.phone1"
          v-model="formSubmit.phone1"
          :rules="validatePhone"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label :title="formSubmit.phone2" :for="formSubmit.phone2">
          Số ĐT 2 <span class="text-red-500">*</span>
          <ErrorMessage name="phone2" class="text-red-500"
        /></label>
        <Field
          name="phone2"
          type="text"
          class="
            w-[240px]
            sm:w-[320px]
            mx-3
            border-[1px] border-solid border-gray-300
            focus:outline-none
            p-3
          "
          :id="formSubmit.phone2"
          v-model="formSubmit.phone2"
          :rules="validatePhone"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label :title="formSubmit.address" :for="formSubmit.address">
          Địa Chỉ <span class="text-red-500">*</span></label
        >
        <Field
          name="address"
          type="text"
          class="
            w-[240px]
            sm:w-[320px]
            mx-3
            border-[1px] border-solid border-gray-300
            focus:outline-none
            p-3
          "
          :id="formSubmit.address"
          v-model="formSubmit.address"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label :title="formSubmit.city" :for="formSubmit.city">
          Thành Phố <span class="text-red-500">*</span></label
        >
        <Field
          name="city"
          type="text"
          class="
            w-[240px]
            sm:w-[320px]
            mx-3
            border-[1px] border-solid border-gray-300
            focus:outline-none
            p-3
          "
          :id="formSubmit.city"
          v-model="formSubmit.city"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label :title="formSubmit.country" :for="formSubmit.country">
          Quốc Gia <span class="text-red-500">*</span></label
        >
        <Field
          name="country"
          type="text"
          class="
            w-[240px]
            sm:w-[320px]
            mx-3
            border-[1px] border-solid border-gray-300
            focus:outline-none
            p-3
          "
          :id="formSubmit.country"
          v-model="formSubmit.country"
        />
      </div>
      <button
        class="rounded-sm text-white px-7 py-1 max-h-10"
        type="submit"
        :class="
          isLoading
            ? 'bg-gray-400 hover:cursor-not-allowed'
            : 'bg-[#3c8dbc] hover:bg-blue-400'
        "
      >
        <span v-if="!isLoading">Lưu</span>
        <span v-if="isLoading">Updating</span>
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useAuthStore } from "../store/user";
import Service from "../services/User";
export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      user: this.authStore.getUser,
      error: [],
      isLoading: false,
      formSubmit: {
        first_name: "",
        last_name: "",
        phone1: "",
        phone2: "",
        address: "",
        city: "",
        country: "",
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.formSubmit = _.cloneDeep(this.user);
    },
    updateProfile(values) {
      // console.log(JSON.stringify(values, null, 2));
      this.isLoading = true;
      const dataSubmit = {
        first_name: this.formSubmit.first_name,
        last_name: this.formSubmit.last_name,
        phone1: this.formSubmit.phone1,
        phone2: this.formSubmit.phone2,
        address: this.formSubmit.address,
        city: this.formSubmit.city,
        country: this.formSubmit.country,
      };
      Service.setProfile(dataSubmit);
      this.isLoading = false;
      swal2.success("Update profile successfully");
    },
    validatePhone(value) {
      if (!value) {
        return true;
      }
      // if the field is not a valid
      const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!regex.test(value)) {
        return "(Số ĐT đã nhập không đúng định dạng)";
      }
      // All is good
      return true;
    },
  },
};
</script>

<style>
</style>