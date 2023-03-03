<template>
  <header-common></header-common>
  <div class="w-full min-h-[100vh] pt-4 bg-[#ecf0f5]">
    <div class="w-[80%] mx-auto flex justify-between mb-4">
      <span class="text-2xl text-[#007199] uppercase font-bold">{{$t('Recipient List')}}
      </span>
      <button @click="isShow = true" class="
            rounded-lg
            bg-[#00a65a]
            text-white
            p-2
            border-[1px] border-solid border-[#008d4c]
            ml-4
            hover:bg-[#06814a]
          ">
        ➕ {{ $t('Add') }} {{ $t('Receiver') }}
      </button>
    </div>
    <div class="
          mx-auto
          w-[90%]
          lg:w-[80%]
          bg-white
          border-t-[4px] border-blue-400 border-solid
          overflow-x-scroll
        ">
      <table class="w-full my-12">
        <thead>
          <tr class="text-center">
            <th class="font-bold" v-for="(field, index) in fields" :key="index" :title="field.title">
              {{ $t(`${field.name}`) }}
            </th>
            <th>{{ $t('Action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="receiverList.length == 0">
            <td class="text-center" colspan="8">{{ $t('No Data Available') }}</td>
          </tr>
          <tr v-for="(receiver, index) in receiverList" :key="receiver.id" :class="index % 2 == 0 ? 'bg-gray-200' : ''">
            <td>
              <div class="w-[150px]">{{ receiver.last_name }}</div>
            </td>
            <td>
              <div class="w-[500px]">{{ receiver.address }}</div>
            </td>
            <td>
              <div class="w-[150px]">{{ receiver.city }}</div>
            </td>
            <td>
              <div class="w-[150px]">{{ receiver.country }}</div>
            </td>
            <td>
              <div class="w-[150px]">{{ receiver.phone1 }}</div>
            </td>
            <td>
              <div class="w-[150px]">{{ receiver.phone2 }}</div>
            </td>
            <td>
              <div class="w-[300px] flex justify-around">
                <button @click="updateReceiver(receiver.id)" class="rounded-sm text-white px-7 py-1 max-h-10 bg-green-600">
                  {{ $t('Update') }}
                </button>
                <button @click="deleteReceiver(receiver.id, receiver.last_name)"
                  class="rounded-sm text-white px-7 py-1 max-h-10 bg-red-600">
                  {{ $t('Delete') }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isShow" class="
            fixed
            top-0
            left-0
            right-0
            bottom-0
            bg-black/30
            flex
            justify-center
            items-center
          ">
        <div class="w-[90%] md:w-[60%] bg-white rounded-lg p-6 h-[90vh] overflow-y-scroll">
          <span @click="isShow = false" class="cursor-pointer">❌</span>
          <Form class="flex flex-col justify-around items-center" @submit="createReceiver">
            <div class="flex flex-col mb-4">
              <label :title="formSubmit.first_name" :for="formSubmit.first_name">
                {{ $t('First Name') }} 
                <!-- <span class="text-red-500">*</span> -->
              </label>
              <Field name="first_name" type="text" class="
                    w-[240px] md:w-[320px]
                    mx-3
                    border-[1px] border-solid border-gray-300
                    focus:outline-none
                    p-3
                  " :id="formSubmit.first_name" v-model="formSubmit.first_name" />
            </div>
            <div class="flex flex-col mb-4">
              <label :title="formSubmit.last_name" :for="formSubmit.last_name">
                {{ $t('Last Name') }} <span class="text-red-500">*</span>
              <ErrorMessage class="text-red-500" name="last_name"/>
              </label>
              <Field name="last_name" type="text" class="
                    w-[240px] md:w-[320px]
                    mx-3
                    border-[1px] border-solid border-gray-300
                    focus:outline-none
                    p-3
                  " :id="formSubmit.last_name" v-model="formSubmit.last_name" 
                  :rules="validateEmpty"/>
            </div>
            <div class="flex flex-col mb-4">
              <label :title="formSubmit.phone1" :for="formSubmit.phone1">
                {{ $t('Phone 1') }} 
                <!-- <span class="text-red-500">*</span> -->
                <ErrorMessage name="phone1" class="text-red-500" />
              </label>
              <Field name="phone1" type="text" class="
                    w-[240px] md:w-[320px]
                    mx-3
                    border-[1px] border-solid border-gray-300
                    focus:outline-none
                    p-3
                  " :id="formSubmit.phone1" v-model="formSubmit.phone1" :rules="validatePhone" />
            </div>
            <div class="flex flex-col mb-4">
              <label :title="formSubmit.phone2" :for="formSubmit.phone2">
                {{ $t('Phone 2') }} 
                <!-- <span class="text-red-500">*</span> -->
                <ErrorMessage name="phone2" class="text-red-500" />
              </label>
              <Field name="phone2" type="text" class="
                    w-[240px] md:w-[320px]
                    mx-3
                    border-[1px] border-solid border-gray-300
                    focus:outline-none
                    p-3
                  " :id="formSubmit.phone2" v-model="formSubmit.phone2" :rules="validatePhone" />
            </div>
            <div class="flex flex-col mb-4">
              <label :title="formSubmit.address" :for="formSubmit.address">
                {{ $t('Address') }} <span class="text-red-500">*</span>
                <ErrorMessage class="text-red-500" name="address"/></label>
              <Field name="address" type="text" class="
                    w-[240px] md:w-[320px]
                    mx-3
                    border-[1px] border-solid border-gray-300
                    focus:outline-none
                    p-3
                  " :id="formSubmit.address" v-model="formSubmit.address" 
                  :rules="validateEmpty"/>
            </div>
            <div class="flex flex-col mb-4">
              <label :title="formSubmit.city" :for="formSubmit.city">
                {{ $t('City') }} <span class="text-red-500">*</span>
                <ErrorMessage class="text-red-500" name="city"/></label>
              <Field name="city" type="text" class="
                    w-[240px] md:w-[320px]
                    mx-3
                    border-[1px] border-solid border-gray-300
                    focus:outline-none
                    p-3
                  " :id="formSubmit.city" v-model="formSubmit.city" 
                  :rules="validateEmpty"/>
            </div>
            <div class="flex flex-col mb-4">
              <label :title="formSubmit.country" :for="formSubmit.country">
                {{ $t('Nation') }} <span class="text-red-500">*</span>
                <ErrorMessage class="text-red-500" name="country"/></label>
              <Field name="country" type="text" class="
                    w-[240px] md:w-[320px]
                    mx-3
                    border-[1px] border-solid border-gray-300
                    focus:outline-none
                    p-3
                  " :id="formSubmit.country" v-model="formSubmit.country" 
                  :rules="validateEmpty"/>
            </div>
            <button type="submit" class="rounded-sm text-white px-7 py-1 max-h-10 bg-green-600">
              {{ $t('Create', [$t('Receiver')]) }}
            </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from "../services/receiver";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      fields: Service.fields(),
      receiverList: [],
      isShow: false,
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
    this.getList();
  },
  methods: {
    async getList() {
      await Service.getListReceiver().then((res) => {
        this.receiverList = res.data.data;
      });
    },
    async createReceiver() {
      Service.createReceiver(this.formSubmit);
      this.isShow = false;
      this.getList();
      swal2.success(`${this.$t('Create', [this.$t('Successfully')])}`);
    },
    validatePhone(value) {
      if (!value) {
        return true;
      }
      // if the field is not a valid
      const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!regex.test(value)) {
        return `${this.$t('Phone')} ${this.$t('Wrong Format')}`
      }
      // All is good
      return true;
    },
    validateEmpty(value) {
      if(!value) {
        return this.$t('This field cannot be left blank')
      }
      return true;
    },
    updateReceiver(id) {
      this.$router.push({ name: 'receiver-update', params: {id: id} })
    },
    deleteReceiver(id, name) {
      swal2.confirm(`${this.$t('Delete')}`, `${this.$t('Are you sure you want to')}`).then((result) => {
        if (result.value) {
          Service.deleteReceiver(id)
            .then((res) => {
              if(res.data.error) {
                swal2.error(`${this.$t('This recipient cannot be deleted because it exists in tracking')}`)
              } else swal2.success(`${this.$t('Delete')} ${name} ${this.$t('Successfully')}`);
              this.getList();
            })
            .catch((err) => swal2.error(err));
        }
      });
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

td {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

thead {
  border-bottom: 1px solid #000;
}
</style>