<template>
    <header-common></header-common>
    <div class="w-full min-h-[100vh] pt-4 bg-[#ecf0f5]">
        <div class="w-[80%] mx-auto flex justify-between mb-4">
            <span class="text-2xl text-[#007199] uppercase font-bold">{{ $t('Update') }} {{ $t('Receiver') }}
            </span>
        </div>
        <div class="
                    mx-auto
                    pb-8
                    w-[90%]
                    lg:w-[80%]
                    bg-white
                    border-t-[4px] border-blue-400 border-solid
                    overflow-x-scroll
                  ">
            <Form class="flex flex-col mx-auto justify-around items-center w-[60%]" @submit="updateReceiver">
                <div class="flex flex-col mb-4 w-full">
                    <label :title="formSubmit.first_name" :for="formSubmit.first_name">
                        {{ $t('First Name') }}</label>
                    <Field name="first_name" type="text" class="
                          w-full
                          mx-3
                          border-[1px] border-solid border-gray-300
                          focus:outline-none
                          p-3
                        " :id="formSubmit.first_name" v-model="formSubmit.first_name" />
                </div>
                <div class="flex flex-col mb-4 w-full">
                    <label :title="formSubmit.last_name" :for="formSubmit.last_name">
                        {{ $t('Last Name') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="last_name"/>
                    </label>
                    <Field name="last_name" type="text" class="
                          w-full
                          mx-3
                          border-[1px] border-solid border-gray-300
                          focus:outline-none
                          p-3
                        " :id="formSubmit.last_name" v-model="formSubmit.last_name" 
                        :rules="validateEmpty"/>
                </div>
                <div class="flex flex-col mb-4 w-full">
                    <label :title="formSubmit.phone1" :for="formSubmit.phone1">
                        {{ $t('Phone 1') }}
                        <ErrorMessage name="phone1" class="text-red-500" />
                    </label>
                    <Field name="phone1" type="text" class="
                          w-full
                          mx-3
                          border-[1px] border-solid border-gray-300
                          focus:outline-none
                          p-3
                        " :id="formSubmit.phone1" v-model="formSubmit.phone1" :rules="validatePhone" />
                </div>
                <div class="flex flex-col mb-4 w-full">
                    <label :title="formSubmit.phone2" :for="formSubmit.phone2">
                        {{ $t('Phone 2') }} 
                        <ErrorMessage name="phone2" class="text-red-500" />
                    </label>
                    <Field name="phone2" type="text" class="
                          w-full
                          mx-3
                          border-[1px] border-solid border-gray-300
                          focus:outline-none
                          p-3
                        " :id="formSubmit.phone2" v-model="formSubmit.phone2" :rules="validatePhone" />
                </div>
                <div class="flex flex-col mb-4 w-full">
                    <label :title="formSubmit.address" :for="formSubmit.address">
                        {{ $t('Address') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="address"/></label>
                    <Field name="address" type="text" class="
                          w-full
                          mx-3
                          border-[1px] border-solid border-gray-300
                          focus:outline-none
                          p-3
                        " :id="formSubmit.address" v-model="formSubmit.address" 
                        :rules="validateEmpty"/>
                </div>
                <div class="flex flex-col mb-4 w-full">
                    <label :title="formSubmit.city" :for="formSubmit.city">
                        {{ $t('City') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="city"/></label>
                    <Field name="city" type="text" class="
                          w-full
                          mx-3
                          border-[1px] border-solid border-gray-300
                          focus:outline-none
                          p-3
                        " :id="formSubmit.city" v-model="formSubmit.city" 
                        :rules="validateEmpty"/>
                </div>
                <div class="flex flex-col mb-4 w-full">
                    <label :title="formSubmit.country" :for="formSubmit.country">
                        {{ $t('Nation') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="country"/></label>
                    <Field name="country" type="text" class="
                          w-full
                          mx-3
                          border-[1px] border-solid border-gray-300
                          focus:outline-none
                          p-3
                        " :id="formSubmit.country" v-model="formSubmit.country" 
                        :rules="validateEmpty"/>
                </div>
                <div class="w-[250px] flex justify-around">
                    <button type="submit" class="rounded-sm text-white px-7 py-1 max-h-10 bg-green-600">
                        {{ $t('Save') }}
                    </button>
                    <router-link :to="{name: 'receiver'}">
                        <button class="rounded-sm text-white px-7 py-1 max-h-10 bg-red-600">
                            {{ $t('Cancel') }}
                        </button>
                    </router-link>
                </div>
            </Form>
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
            formSubmit: {
                first_name: "",
                last_name: "",
                phone1: "",
                phone2: "",
                address: "",
                city: "",
                country: "",
            },
        }
    },
    created() {
        this.initDetailReceiver()
    },
    methods: {
        async initDetailReceiver() {
            await Service.getDetailReceiver(this.$route.params.id)
                .then(res => {
                    this.formSubmit = _.cloneDeep(res.data.receiver);
                })
                .catch(error => {
                    if(err.response.data.message 
                    && err.response.data.message == 'You are not allowed'){
                        swal2.error(`${this.$t('You are not authorized to take action')}`)
                        this.$router.push({ name: "error" });
                    }
                })
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
        async updateReceiver() {
            await Service.updateReceiver(this.formSubmit, this.formSubmit.id)
                .then(res => {
                    swal2.success(`${this.$t('Update')} ${this.$t('Successfully')}`)
                    this.$router.push({ name: 'receiver' })
                })
                .catch(err => {
                    if(err.response.data.message 
                    && err.response.data.message == 'You are not allowed'){
                        swal2.error(`${this.$t('You are not authorized to take action')}`)
                        this.$router.push({ name: "error" });
                    }
                })
        }
    }
}
</script>