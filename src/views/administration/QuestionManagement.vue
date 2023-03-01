<template>
    <div class="w-full">
        <div class="bg-[#289ae7] text-center text-2xl text-white pb-4 pt-11 md:py-4">Guild Management</div>
    </div>

    <button @click="showCreate" class=" m-2 md:m-4 rounded-lg text-white px-7 py-1 max-h-10 bg-[#438aab]">
        😃 Tạo Câu Hỏi
    </button>

    <div class="mt-5 w-full overflow-x-scroll h-[60vh]">
        <table class="w-full text-center">
            <thead class="sticky top-0 left-0 bg-[#f37070]">
                <tr>
                    <th>
                        Câu Hỏi
                    </th>
                    <th>
                        Câu Trả Lời
                    </th>
                    <th>
                        Hành Động
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ser in listService" :key="ser.id">
                    <td>
                        <div class="w-[150px]">{{ ser.question ? ser.question : 'None' }}</div>
                    </td>
                    <td>
                        <div class="w-[600px]">{{ ser.answer }}</div>
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
                        <label :title="formData.question" :for="formData.question">
                            Câu Hỏi <span class="text-red-500">*</span>
                            <ErrorMessage name="question" class="text-red-500" />
                        </label>
                        <Field name="question" type="text" class="
                                    w-[240px] md:w-[360px]
                                    mx-3
                                    border-[1px] border-solid border-gray-300
                                    focus:outline-none
                                    p-3
                                    " :id="formData.question" v-model="formData.question" 
                                    :rules="validateEmpty"/>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label :title="formData.answer" :for="formData.answer">
                            Câu Trả Lời <span class="text-red-500">*</span>
                            <ErrorMessage name="answer" class="text-red-500" />
                        </label>
                        <Field name="answer" type="text" v-slot="{ field, errors }" class="
                                
                            " :id="formData.answer" v-model="formData.answer"
                            :rules="validateEmpty">
                            <textarea class="w-[240px] md:w-[360px]
                                mx-3
                                border-[1px] border-solid border-gray-300
                                focus:outline-none
                                p-3" v-bind="field" rows="8" name="answer"></textarea>
                        </Field>
                    </div>
                    <button v-if="isCreate" @click="create" class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#338bad]">
                        Tạo
                    </button>
                    <button v-if="isUpdate" @click="update" class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#3cb138]">
                        Sửa
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
import service from '../../services/guild'
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
                question: '',
                answer: ''
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            await service.getListGuild()
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
            this.formData.question = this.currentService.question
            this.formData.answer = this.currentService.answer
        },
        async create() {
            if(this.formData.question.trim() == '' || this.formData.answer.trim() == '') return swal2.error('Phải nhập đầy đủ thông tin để tạo 1 câu hỏi') 
            await service.createGuild(this.formData)
                .then(res => {
                    swal2.success('Tạo mới 1 câu hỏi thành công')
                    this.page = 1
                    this.getList()
                    this.close()
                })
                .catch(err => swal2.error(err))
        },
        async update() {
            if(this.formData.question.trim() == '' || this.formData.answer.trim() == '') return swal2.error('Phải nhập đầy đủ thông tin để sửa 1 câu hỏi') 
            await service.updateGuild(this.formData, this.currentService.id)
                .then(res => {
                    swal2.success('Chỉnh sửa câu hỏi thành công')
                    this.page = 1
                    this.getList()
                    this.close()
                })
                .catch(err => swal2.error(err))
        },
        deleteService(id) { 
            swal2.confirm("delete").then((result) => {
            if (result.value) {
            service.deleteGuild(id)
              .then(res => {
                swal2.success('Xoá câu hỏi thành công')
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
                question: '',
                answer: ''
            }
        },
        submitForm() { },
        async clickCallback(pageNum) {
            await axios.get(API.guild + `?page=${pageNum}`)
                .then(res => this.listService = res.data.data)
        },
        validateEmpty(value) {
            if(!value) {
            return 'Không được bỏ trống trường này'
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