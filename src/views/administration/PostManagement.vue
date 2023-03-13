<template>
    <div class="w-full">
        <div class="bg-[#289ae7] text-center text-2xl text-white pb-4 pt-11 md:py-4">{{ $t('X Management', [$t('Post')]) }}
        </div>
    </div>


    <button @click="showCreate" class=" m-2 md:m-4 rounded-lg text-white px-7 py-1 max-h-10 bg-[#438aab]">
        😃 {{ $t('Create', [$t('Post')]) }}
    </button>

    <div class="mt-5 w-full overflow-x-scroll h-[60vh]">
        <table class="w-full text-center">
            <thead class="sticky top-0 left-0 bg-[#f37070]">
                <tr>
                    <th :title="field.title" v-for="(field, i) in fields" :key="i">
                        {{ $t(field.name) }}
                    </th>
                    <th>
                        {{ $t('Action') }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in postList" :key="p.id">
                    <td>
                        <div class="w-[150px]">{{ p.title }}</div>
                    </td>
                    <td>
                        <div class="w-[600px]">{{ p.description }}</div>
                    </td>
                    <td>
                        <div class="w-[600px]">{{ p.content }}</div>
                    </td>
                    <td>
                        <div class="w-[600px]">{{ p.summary }}</div>
                    </td>
                    <td>
                        <div class="w-[350px] flex flex-wrap">
                            <img class="h-[100px] m-2" v-for="img in p.images" :key="img.id" v-lazy="filePath + img.file_path" />
                        </div>
                    </td>
                    <td>
                        <div class="w-[150px]">{{ p.user.email }}</div>
                    </td>
                    <td>
                        <div class="w-[200px] flex justify-around py-3">
                            <button @click="showUpdate(p.id)" class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#43ab48]">
                                ⚙️
                            </button>
                            <button @click="deletePost(p.id)" class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#ffa09e]">
                                ❌
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- paginate -->
    <paginate v-model="page" :page-count="totalPage" :page-range="3" :margin-pages="2" :click-handler="clickCallback"
        :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
    </paginate>


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
                    <label :title="$t('Title')" :for="$t('Title')">
                        {{ $t('Title') }} <span class="text-red-500">*</span>
                        <ErrorMessage name="title" class="text-red-500" />
                    </label>
                    <Field name="title" type="text" class="
                    w-[240px] md:w-[360px]
                    mx-3
                    border-[1px] border-solid border-gray-300
                    focus:outline-none
                    p-3
                    " :id="$t('Title')" v-model="formData.title" :rules="validateEmpty" />
                </div>
                <div class="flex flex-col mb-4">
                    <label :title="$t('Description')" :for="$t('Description')">
                        {{ $t('Description') }} <span class="text-red-500">*</span>
                        <ErrorMessage name="description" class="text-red-500" />
                    </label>
                    <Field name="description" type="text" class="
                    w-[240px] md:w-[360px]
                    mx-3
                    border-[1px] border-solid border-gray-300
                    focus:outline-none
                    p-3
                    " :id="$t('Description')" v-model="formData.description" :rules="validateEmpty" />
                </div>
                <div class="flex flex-col mb-4">
                    <label :title="$t('Content')" :for="$t('Content')">
                        {{ $t('Content') }} <span class="text-red-500">*</span>
                        <ErrorMessage name="content" class="text-red-500" />
                    </label>
                    <Field name="content" type="text" v-slot="{ field, errors }" class="
                                
                            " :id="$t('Content')" v-model="formData.content"
                            :rules="validateEmpty">
                            <textarea class="w-[240px] md:w-[360px]
                                mx-3
                                border-[1px] border-solid border-gray-300
                                focus:outline-none
                                p-3" v-bind="field" rows="6" name="content"></textarea>
                    </Field>
                </div>
                <div class="flex flex-col mb-4">
                    <label :title="$t('Summary')" :for="$t('Summary')">
                        {{ $t('Summary') }} <span class="text-red-500">*</span>
                        <ErrorMessage name="summary" class="text-red-500" />
                    </label>
                    <Field name="summary" type="text" class="
                    w-[240px] md:w-[360px]
                    mx-3
                    border-[1px] border-solid border-gray-300
                    focus:outline-none
                    p-3
                    " :id="$t('Summary')" v-model="formData.summary" :rules="validateEmpty" />
                </div>
                <div class="flex mb-4">
                    <label class="cursor-pointer bg-[#289ae7] rounded-lg p-2" :title="$t('Image')" :for="$t('Image')">
                        🖼️ {{ $t('Choose', [$t('Image')]) }}</label>
                    <input multiple class="hidden" type="file" :id="$t('Image')" @change="fileChange">
                </div>
                <div class="w-[240px] md:w-[360px] flex flex-wrap justify-center items-center mb-4" v-if="listShow">
                    <div class="relative mx-1" v-for="(image, index) in listShow">
                    <img class="h-[100px]" :src="image" />
                    <button class="absolute top-0 right-0" @click="removeImage(index)">❌</button>
                    </div>
                </div>
                <button v-if="isCreate" @click="createPost" class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#338bad]">
                    {{ $t('Create') }}
                </button>
                <button v-if="isUpdate" @click="updatePost" class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#3cb138]">
                    {{ $t('Update') }}
                </button>
            </Form>
        </div>
    </div>
</template>
<script>
import service from '../../services/post'
import Paginate from 'vuejs-paginate-next';
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        paginate: Paginate,
    },
    data() {
        return {
            fields: service.fields(),
            page: 1,
            totalPage: 0,
            isShow: false,
            isCreate: false,
            isUpdate: false,
            postList: [],
            postSelected: null,
            filePath: serverPath,
            listShow: [],
            formData: {
                title: '',
                description: '',
                content: '',
                summary: '',
                files: []
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            service.getAll()
                .then(res => {
                    this.postList = res.data.data
                    this.totalPage = res.data.last_page
                })
                .catch(err => {
                    if (err.response.data.message
                        && err.response.data.message == 'You are not allowed') {
                        swal2.error(`${this.$t('You are not authorized to take action')}`)
                        this.$router.push({ name: "error" });
                    }
                })
        },
        showCreate() { 
            this.isShow = true
            this.isCreate = true
        }, showUpdate(id) { },
        async createPost() {
            if(this.formData.files.length == 0) {
                return swal2.error(this.$t('Choose at least 1 image to create a post'))
            }
            let fd = new FormData()
            this.formData.files.forEach(img => {
                fd.append('files[]', img)
            })
            fd.append('title', this.formData.title)
            fd.append('description', this.formData.description)
            fd.append('content', this.formData.content)
            fd.append('summary', this.formData.summary)
            await service.create(fd)
                .then(res => {
                    swal2.success(`${this.$t('Create', [this.$t('Post')])} ${this.$t('Successfully')}`)
                    this.page = 1
                    this.getList()
                    this.close()
                })
                .catch(err => {
                    if(err.response.data.message 
                    && err.response.data.message == 'You are not allowed'){
                        swal2.error(`${this.$t('You are not authorized to take action')}`)
                        return this.$router.push({ name: "error" });
                    }
                    return swal2.error(this.$t('Something Went Wrong') + ', ' + this.$t('Please -', [$t('Try Again')]))
                })
         }, updatePost() { },
        deletePost() { }, submitForm(){},
        validateEmpty(value) {
            if(!value) {
            return `${this.$t('This field cannot be left blank')}`
            }
            return true;
        },
        close(){
            this.isShow = false
            this.isCreate = false
            this.isUpdate = false
            this.formData = {
                title: '',
                description: '',
                content: '',
                summary: '',
                files: []
            }
        },
        async clickCallback(pageNum) {
            await axios.get(API.post + `?page=${pageNum}`)
                .then(res => this.postList = res.data.data)
        },
    
        fileChange(e){
        const file = e.target.files[0]
        console.log(file);
        // if(file.size > 2000000)  return swal2.error(this.$t('File cannot be larger than -MB', ['2']))

        // this.formData.files = file
        // file.name
        // file.type
            if(file.size > 4000000) return swal2.error(this.$t('File cannot be larger than -MB', ['4']))
            if(file.type == 'image/jpeg' 
            || file.type == 'image/png' 
            || file.type == 'image/jpg'){
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.createImage(files);
                this.formData.files.push(e.target.files[0])
                
            }
        },
        createImage(files) {
            let vm = this;
            for (let index = 0; index < files.length; index++) {
                let reader = new FileReader();
                reader.onload = function(event) {
                const imageUrl = event.target.result;
                vm.listShow.push(imageUrl);
                }
                reader.readAsDataURL(files[index]);
            }
        },
        removeImage(index) {
            this.listShow.splice(index, 1)
            this.formData.files.splice(index, 1)
        }
    }
}
</script>
<style scoped>
th {
    padding: 10px 0;
}

.pagination {
    justify-content: space-around;
    margin-top: 20px;
}
</style>