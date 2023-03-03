<template>
    <header-common></header-common>
    <div class="w-full min-h-[100vh] pt-4 bg-[#ecf0f5]">
        <div class="
                        mx-auto
                        w-[90%]
                        lg:w-[80%]
                        bg-white
                        border-t-[4px] border-blue-400 border-solid
                        ">
            <Form class="flex flex-col items-center justify-center my-5" @submit="submit">
                <div class="flex flex-col mb-4">
                    <label :title="formSubmit.carrier" :for="formSubmit.carrier">
                        {{ $t('Carrier') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="car" />
                    </label>
                    <Field name="car" type="text" class="
                        w-[240px] md:w-[320px]
                        mx-3
                        border-[1px] border-solid border-gray-300
                        focus:outline-none
                        p-3
                        " :id="formSubmit.carrier" v-model="formSubmit.carrier"
                    :rules="validateEmpty" />
                </div>
                <div class="flex flex-col mb-4">
                    <label :title="formSubmit.from_company_name" :for="formSubmit.from_company_name">
                        {{ $t('From Company') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="fcom" />
                    </label>
                    <Field name="fcom" type="text" class="
                        w-[240px] md:w-[320px]
                        mx-3
                        border-[1px] border-solid border-gray-300
                        focus:outline-none
                        p-3
                        " :id="formSubmit.from_company_name" v-model="formSubmit.from_company_name"
                    :rules="validateEmpty" />
                </div>
                <div class="flex flex-col mb-4">
                    <label :title="formSubmit.to_company_name" :for="formSubmit.to_company_name">
                        {{ $t('To Company') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="tcom" />
                    </label>
                    <Field name="tcom" type="text" class="
                        w-[240px] md:w-[320px]
                        mx-3
                        border-[1px] border-solid border-gray-300
                        focus:outline-none
                        p-3
                        " :id="formSubmit.to_company_name" v-model="formSubmit.to_company_name" :rules="validateEmpty" />
                </div>
                <div class="flex flex-col mb-4">
                    <label :title="formSubmit.from_address" :for="formSubmit.from_address">
                        {{ $t('From Address') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="fa" />
                    </label>
                    <Field name="fa" type="text" class="
                        w-[240px] md:w-[320px]
                        mx-3
                        border-[1px] border-solid border-gray-300
                        focus:outline-none
                        p-3
                        " :id="formSubmit.from_address" v-model="formSubmit.from_address" :rules="validateEmpty" />
                </div>
                <div class="flex flex-col mb-4">
                    <label :title="formSubmit.to_address" :for="formSubmit.to_address">
                        {{ $t('To Address') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="ta" />
                    </label>
                    <Field name="ta" type="text" class="
                        w-[240px] md:w-[320px]
                        mx-3
                        border-[1px] border-solid border-gray-300
                        focus:outline-none
                        p-3
                        " :id="formSubmit.to_address" v-model="formSubmit.to_address" :rules="validateEmpty" />
                </div>
                <div class="flex flex-col mb-4">
                    <label :title="formSubmit.from_city" :for="formSubmit.from_city">
                        {{ $t('From City') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="fc" />
                    </label>
                    <Field name="fc" type="text" class="
                        w-[240px] md:w-[320px]
                        mx-3
                        border-[1px] border-solid border-gray-300
                        focus:outline-none
                        p-3
                        " :id="formSubmit.from_city" v-model="formSubmit.from_city" :rules="validateEmpty" />
                </div>
                <div class="flex flex-col mb-4">
                    <label :title="formSubmit.to_city" :for="formSubmit.to_city">
                        {{ $t('To City') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="tc" />
                    </label>
                    <Field name="tc" type="text" class="
                        w-[240px] md:w-[320px]
                        mx-3
                        border-[1px] border-solid border-gray-300
                        focus:outline-none
                        p-3
                        " :id="formSubmit.to_city" v-model="formSubmit.to_city" :rules="validateEmpty" />
                </div>
                <div class="flex flex-col mb-4">
                    <label :title="formSubmit.bol_code" :for="formSubmit.bol_code">
                        {{ $t('BOL') }} <span class="text-red-500">*</span>
                        <ErrorMessage class="text-red-500" name="bc" />
                    </label>
                    <Field name="bc" type="text" class="
                        w-[240px] md:w-[320px]
                        mx-3
                        border-[1px] border-solid border-gray-300
                        focus:outline-none
                        p-3
                        " :id="formSubmit.bol_code" v-model="formSubmit.bol_code" :rules="validateEmpty" />
                </div>
                <div class="flex items-center">
                    <button type="submit" class="rounded-sm text-white px-7 py-1 max-h-10 bg-green-600 mr-3">
                        {{ $t('Print') }} {{ $t('BOL') }}
                    </button>
                    <router-link :to="{ name: 'tracking-number' }">
                        <button type="submit" class="rounded-sm text-white px-7 py-1 max-h-10 bg-gray-500">
                            {{ $t('Cancel') }}
                        </button>
                    </router-link>
                </div>
            </Form>

            <!-- shipping label -->
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
                <div class="w-[90%] md:w-[650px] bg-white rounded-lg p-6 h-[90vh] overflow-y-scroll" ref="shippingLabel">
                    <div class="mx-auto w-full flex justify-around border-black border-b-[1px] border-solid items-start">
                        <div class="flex flex-col w-[50%] p-3">
                            <span class="font-bold">{{ $t('From') }}</span>
                            <h1>
                                <span class="mr-2 font-bold">{{ $t('From Company') }}: </span>
                                <span>{{ formSubmit.from_company_name }}</span>
                            </h1>
                            <h1>
                                <span class="mr-2 font-bold">{{ $t('From Address') }}: </span>
                                <span>{{ formSubmit.from_address }}</span>
                            </h1>
                            <h1>
                                <span class="mr-2 font-bold">{{ $t('From City') }}: </span>
                                <span>{{ formSubmit.from_city }}</span>
                            </h1>
                        </div>
                        <div class="flex flex-col w-[50%] p-3">
                            <span class="font-bold">{{$t('To')}}</span>
                            <h1>
                                <span class="mr-2 font-bold">{{ $t('To Company') }}: </span>
                                <span>{{ formSubmit.to_company_name }}</span>
                            </h1>
                            <h1>
                                <span class="mr-2 font-bold">{{ $t('To Address') }}: </span>
                                <span>{{ formSubmit.to_address }}</span>
                            </h1>
                            <h1>
                                <span class="mr-2 font-bold">{{ $t('To City') }}: </span>
                                <span>{{ formSubmit.to_city }}</span>
                            </h1>
                        </div>
                    </div>

                    <!-- barcode -->
                    <div class="w-full flex justify-center font-bold my-4">
                        {{ $t('BOL') }}
                    </div>
                    <Vue3Barcode class="flex justify-center" :value="formSubmit.bol_code" :height="50" />
                    
                    <div class="p-3 w-full flex flex-col">
                        <h1><span class="font-bold">Carrier</span>: <span>{{ formSubmit.carrier }}</span></h1>
                        <h1><span class="font-bold">Date: </span>: <span>{{ currentDate }}</span></h1>
                        <h1><span class="font-bold">Container No.</span>: <span></span></h1>
                        <h1><span class="font-bold">{{ $t('License Plates') }}</span>: <span></span></h1>
                    </div>
                </div>
                <div class="w-full flex justify-center fixed bottom-[80px]">
                    <button @click="exportPDF" class="rounded-sm text-white px-7 py-1 max-h-10 bg-blue-500 mr-4">
                    {{ $t('Save') }}
                </button>
                <button @click="isShow = false" class="rounded-sm text-white px-7 py-1 max-h-10 bg-gray-500">
                    {{ $t('Cancel') }}
                </button>
                </div>
            </div>
            <!-- end -->

        </div>
    </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import Vue3Barcode from 'vue3-barcode'
import service from '../services/trackingNumber'
import html2pdf from 'html2pdf.js'
export default {
    components: {
        Form, ErrorMessage, Field, Vue3Barcode
    },
    data() {
        return {
            isShow: false,
            currentDate: new Date().toLocaleString(),
            formSubmit: {
                carrier: "",
                from_company_name: "",
                to_company_name: "",
                from_address: "",
                to_address: "",
                from_city: "",
                to_city: "",
                bol_code: "",
            },
        }
    },
    created() {
        this.initTrackingDetail()
    },
    methods: {
        async initTrackingDetail() {
            await service.getDetailTracking(this.$route.params.id)
                .then(res => {
                    this.formSubmit.from_city = res.data.tracking.user.city
                    this.formSubmit.to_city = res.data.tracking.receiver.city
                    this.formSubmit.from_address = res.data.tracking.user.address
                    this.formSubmit.to_address = res.data.tracking.receiver.address
                    this.formSubmit.bol_code = res.data.tracking.bol_id
                })
                .catch(err => console.log(err))
        },
        submit(value) {
            this.isShow = true
        },
        validateEmpty(value) {
            if (!value) {
                return this.$t('This field cannot be left blank')
            }
            return true;
        },
        exportPDF(){
            html2pdf(this.$refs.shippingLabel, {
                margin: 1,
                filename: 'document.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { dpi: 192, letterRendering: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            })
        }
    }
}
</script>
<style scoped>
h1 {
    text-overflow: ellipsis;
}
</style>