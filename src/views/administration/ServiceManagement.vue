<template>
    <div class="w-full">
        <div class="bg-[#289ae7] text-center text-2xl text-white pb-4 pt-11 md:py-4">{{$t('X Management', [$t('Service')])}}</div>
    </div>

    <button @click="showCreate" class=" m-2 md:m-4 rounded-lg text-white px-7 py-1 max-h-10 bg-[#438aab]">
        😃 {{$t('Create', [$t('Service')])}}
    </button>

    <div class="mt-5 w-full overflow-x-scroll h-[60vh]">
        <table class="w-full text-center">
            <thead class="sticky top-0 left-0 bg-[#f37070]">
                <tr>
                    <th>
                        {{ $t('Name') }}
                    </th>
                    <th>
                        {{ $t('Description') }}
                    </th>
                    <th>
                        {{ $t('Action') }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ser in listService" :key="ser.id">
                    <td>
                        <div class="w-[150px]">{{ ser.name ? ser.name : 'None' }}</div>
                    </td>
                    <td>
                        <div class="w-[600px]">{{ ser.description }}</div>
                    </td>
                    <td>
                        <div class="w-[200px] flex justify-around py-3">
                            <button @click="showUpdate(ser.id)"
                                class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#43ab48]">
                                ⚙️
                            </button>
                            <button @click="deleteService(ser.id)"
                                class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#ffa09e]">
                                ❌
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- show modal -->
        <div v-if="isShow" class="fixed
                z-10
                top-0
                left-0
                right-0
                bottom-0
                bg-black/30
                flex
                justify-center
                items-center">
            <div class="w-[90%] md:w-[60%] bg-white rounded-lg p-6 h-[90vh] overflow-y-scroll">
                <span @click="close" class="cursor-pointer">❌</span>
                <Form class="flex flex-col justify-around items-center" @submit="submitForm">
                    <div class="flex flex-col mb-4">
                        <label :title="formData.name" :for="formData.name">
                            {{ $t('Name') }} 
                            <ErrorMessage name="name" class="text-red-500" />
                        </label>
                        <Field name="name" type="text" class="
                                    w-[240px] md:w-[320px]
                                    mx-3
                                    border-[1px] border-solid border-gray-300
                                    focus:outline-none
                                    p-3
                                    " :id="formData.name" v-model="formData.name" />
                    </div>
                    <div class="flex flex-col mb-4">
                        <label :title="formData.description" :for="formData.description">
                            {{ $t('Description') }} <span class="text-red-500">*</span>
                            <ErrorMessage name="description" class="text-red-500" />
                        </label>
                        <Field name="description" type="text" v-slot="{ field, errors }" class="" :id="formData.description" 
                        :rules="validateEmpty"
                        v-model="formData.description">
                            <textarea class="w-[240px] md:w-[320px]
                                mx-3
                                border-[1px] border-solid border-gray-300
                                focus:outline-none
                                p-3" v-bind="field" rows="5" name="description"></textarea>
                        </Field>
                    </div>
                    <button v-if="isCreate" @click="create" class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#338bad]">
                        {{ $t('Create', [$t('Service')]) }}
                    </button>
                    <button v-if="isUpdate" @click="update" class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#3cb138]">
                        {{ $t('Update') }}
                    </button>
                </Form>
            </div>
        </div>
    </div>
    <!-- paginate -->
    <paginate v-model="page" :page-count="totalPage" :page-range="3" :margin-pages="2" :click-handler="clickCallback"
        :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
    </paginate>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import service from '../../services/service'
import Paginate from 'vuejs-paginate-next';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        paginate: Paginate,
    },
    data() {
        return {
            listService: [],
            page: 1,
            totalPage: 0,
            isShow: false,
            isCreate: false,
            isUpdate: false,
            currentService: null,
            formData: {
                name: '',
                description: ''
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            await service.getListService()
                .then(res => {
                    this.listService = res.data.data
                    this.totalPage = res.data.last_page
                })
                .catch(err => swal2.error(err))
        },
        showCreate() {
            this.isShow = true
            this.isCreate = true
        },
        showUpdate(id) {
            this.isShow = true
            this.isUpdate = true
            this.currentService = this.listService.find(ser => ser.id == id)
            this.formData.name = this.currentService.name
            this.formData.description = this.currentService.description
        },
        async create() {
            if(this.formData.description.trim() == '') return swal2.error(`${this.$t('Enter To', [this.$t('Description'), this.$t('Create')])}`)
            await service.createService(this.formData)
                .then(res => {
                    swal2.success(`${this.$t('Create', [this.$t('Service')])} ${this.$t('Successfully')}`)
                    this.page = 1
                    this.getList()
                    this.close()
                })
                .catch(err => swal2.error(err))
        },
        async update() {
            if(this.formData.description.trim() == '') return swal2.error(`${this.$t('Enter To', [this.$t('Description'), this.$t('Update')])}`)
            await service.updateService(this.formData, this.currentService.id)
                .then(res => {
                    swal2.success(`${this.$t('Update')} ${this.$t('Successfully')}`)
                    this.page = 1
                    this.getList()
                    this.close()
                })
                .catch(err => swal2.error(err))
        },
        deleteService(id) { 
            swal2.confirm(`${this.$t('Delete')}`, `${this.$t('Are you sure you want to')}`).then((result) => {
            if (result.value) {
            service.deleteService(id)
              .then(res => {
                swal2.success(`${this.$t('Delete')} ${this.$t('Successfully')}`)
                this.getList()
                this.page = 1
              })
          }
        });
        },
        close() {
            this.isShow = false
            this.isCreate = false
            this.isUpdate = false
            this.formData = {
                name: '',
                description: ''
            }
        },
        submitForm() { },
        async clickCallback(pageNum) {
            await axios.get(API.service + `?page=${pageNum}`)
                .then(res => this.listService = res.data.data)
        },
        validateEmpty(value) {
            if(!value) {
            return `${this.$t('This field cannot be left blank')}`
            }
            return true;
        },

    }
}
</script>

<style scoped>
th {
    padding: 10px 0;
}

.pagination {
    justify-content: space-around;
}
</style>