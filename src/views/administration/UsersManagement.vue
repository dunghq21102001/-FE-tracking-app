<template>
    <div class="w-full">
        <div class="bg-[#289ae7] text-center text-2xl text-white pb-4 pt-11 md:py-4">Users Management</div>
        <button @click="showCreate" class=" m-4 rounded-lg text-white px-7 py-1 max-h-10 bg-[#438aab]">
            😃 Tạo User
        </button>
        <div class="overflow-x-scroll w-full h-[65vh]">
            <table class="w-full">
                <thead>
                    <tr>
                        <th :title="field.title" v-for="(field, i) in fields" :key="i">
                            {{ field.name }}
                        </th>
                        <th title="Hành Động">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :class="i % 2 == 0 ? 'bg-[#eeeef3]' : ''" v-for="(user, i) in listUsers" :key="user.id">
                        <td>
                            <div class="w-[150px]">{{ i + 1 }}</div>
                        </td>
                        <td>
                            <div class="w-[150px]">{{ user.first_name }}</div>
                        </td>
                        <td>
                            <div class="w-[150px]">{{ user.last_name }}</div>
                        </td>
                        <td>
                            <div class="w-[150px]">{{ user.email }}</div>
                        </td>
                        <td>
                            <div class="w-[150px]">{{ user.phone1 }}</div>
                        </td>
                        <td>
                            <div class="w-[150px]">{{ user.phone2 }}</div>
                        </td>
                        <td>
                            <div class="w-[500px]">{{ user.address }}</div>
                        </td>
                        <td>
                            <div class="w-[150px]">{{ user.city }}</div>
                        </td>
                        <td>
                            <div class="w-[150px]">{{ user.country }}</div>
                        </td>
                        <td>
                            <div class="w-[500px]">
                                <span class="role-custom" v-for="role in user.roles" :key="role.id">
                                    {{ role.name }}
                                </span>
                            </div>
                        </td>
                        <td>
                            <div class="w-[150px]">💡 Active</div>
                        </td>
                        <td>
                            <div class="w-[200px] flex justify-around">
                                <button @click="showUpdate(user.id)"
                                    class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#43ab48]">
                                    ⚙️
                                </button>
                                <button class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#ffa09e]">
                                    ❌
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- pagination -->
        <paginate
            v-model="page"
            :page-count="totalPage"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'"
        >
        </paginate>

        <!-- form create/update -->
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
                        <label :title="FormData.email" :for="FormData.email">
                            Email <span class="text-red-500">*</span>
                            <ErrorMessage name="email" class="text-red-500"/>
                        </label>
                        <Field name="email" type="text" class="
                            w-[240px] md:w-[320px]
                            mx-3
                            border-[1px] border-solid border-gray-300
                            focus:outline-none
                            p-3
                            " :id="FormData.email" v-model="FormData.email" 
                            :rules="validateEmail"/>
                    </div>
                    <div v-if="isCreate" class="flex flex-col mb-4">
                        <label :title="FormData.password" :for="FormData.password">
                            Password <span class="text-red-500">*</span>
                            <ErrorMessage name="password" class="text-red-500"/>
                        </label>
                        <Field name="password" type="text" class="
                            w-[240px] md:w-[320px]
                            mx-3
                            border-[1px] border-solid border-gray-300
                            focus:outline-none
                            p-3
                            " :id="FormData.password" v-model="FormData.password" 
                            :rules="validatePassword"/>
                    </div>
                    <div class="flex flex-wrap pb-4 w-full" v-if="isCreate">
                        <span>Roles <span class="text-red-500">*</span>:</span>
                        <div class="flex mx-4" v-for="(role, i) in listRoles" :key="role.id">
                            <input :id="role.name" :value="role.id" v-model="FormData.roles" type="checkbox"><label
                                :for="role.name">{{ role.name }}</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap pb-4 w-full" v-if="isUpdate && detailUser">
                        <span>Roles <span class="text-red-500">*</span>:</span>
                        <div class="flex mx-4" v-for="(role, i) in listRoles" :key="role.id">
                            <input :id="role.name" :value="role.id" v-model="FormData.roles" type="checkbox"><label
                                :for="role.name">{{ role.name }}</label>
                        </div>
                    </div>
                    <button v-if="isCreate" @click="createUser"
                        class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#338bad]">
                        Tạo
                    </button>
                    <button v-if="isUpdate" @click="updateUser"
                        class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#3cb138]">
                        Sửa
                    </button>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import service from '../../services/User'
import rolesService from '../../services/role'
import { Form, Field, ErrorMessage } from "vee-validate";
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
            fields: service.fields(),
            listUsers: [],
            listRoles: [],
            detailUser: null,
            isCreate: false,
            isUpdate: false,
            isShow: false,
            page: 1,
            totalPage: 0,
            perPage: '',
            FormData: {
                email: '',
                password: '',
                roles: []
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            await service.listUsers()
                .then(res => {
                    console.log(res.data);
                    if(res.data.message == 'Token is Invalid'){
                        localStorage.removeItem('token');
                        window.location.href = "/login";
                    }
                    this.perPage = res.data.per_page
                    this.totalPage = res.data.last_page
                    this.listUsers = res.data.data
                })
                .catch(err => swal2.error(err))
            await rolesService.getList()
                .then(res => {
                    this.listRoles = res.data.roles
                })

        },
        showCreate() {
            this.isShow = true
            this.isCreate = true
        },
        showUpdate(id) {
            this.isShow = true
            this.isUpdate = true
            // await service.detailUser(id)
            //     .then(res => {
            //         this.FormUpdate.email = res.data.user.email
            //         this.FormUpdate.roles = res.data.user.roles
            //     })
            this.detailUser = this.listUsers.find(u => u.id == id)
            this.FormData.email = this.detailUser.email
            for (let i of this.detailUser.roles) {
                this.FormData.roles.push(i.id)
            }
        },
        async createUser() {
            await service.register(this.FormData)
                .then(res => {
                    this.close()
                    this.getList()
                    swal2.success('Tạo mới người dùng thành công')
                })
                .catch(err => swal2(err))
        },
        async updateUser() {
            const data = {
                email: this.FormData.email,
                roles: this.FormData.roles
            }
            await service.updateRoles(data, this.detailUser.id)
                .then(res => {
                    swal2.success('Chỉnh sửa người dùng thành công')
                    this.getList()
                    this.close()
                    this.page = 1
                })
                .catch(err => swal2.error(err))
        },
        submitForm() { },
        close() {
            this.isShow = false
            this.isCreate = false
            this.isUpdate = false
            this.FormData = {
                email: '',
                password: '',
                roles: []
            }
        },
        async clickCallback (pageNum) {
        await axios.get(API.user + `/listUsers?page=${pageNum}`)
            .then(res => this.listUsers = res.data.data)
        },
        validateEmail(value) {
            if (!value) {
                return '(Bắt buộc nhập)';
            }
             // if the field is not a valid email
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(value)) {
                return 'Hãy nhập đúng định dạng email';
            }
            return true
        },
        validatePassword(value) {
            if(!value){
                return '(Bắt buộc nhập)'
            }
            return true
        }
    }
}
</script>
<style scoped lang="css">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
table {
    text-align: center;
}

thead {
    height: 80px;
    border-bottom: 1px solid #000;
    top: 0;
    left: 0;
    position: sticky;
    background-color: #f37070;
}

td {
    padding-top: 10px;
    padding-bottom: 10px;
}

.role-custom~.role-custom::before {
    content: ", ";
}

/* Adopt bootstrap pagination stylesheet. */
  
  /* Write your own CSS for pagination */
  
  .pagination {
    justify-content: space-around;
  }
  /* .page-item {
  } */
</style>