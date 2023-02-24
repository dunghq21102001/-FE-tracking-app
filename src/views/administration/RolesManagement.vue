<template>
    <div class="w-full">
        <div class="bg-[#289ae7] text-center text-2xl text-white py-4">Roles Management</div>
        <button @click="showCreate" class=" m-4 rounded-lg text-white px-7 py-1 max-h-10 bg-[#438aab]">
            📜 Tạo vai trò
        </button>
        <div class="w-full">
            <div class="w-full flex flex-col px-8 mb-4" v-for="(role, i) in rolesList" :key="role.id">
                <span class="uppercase">{{ role.name }}
                    <i class="cursor-pointer" @click="showUpdate(role.id)">⚙️</i>
                    <i class="cursor-pointer" @click="deleteRole(role.id)">❌</i>
                </span>
                <div class="w-full flex flex-wrap border-solid border-[1px] border-black rounded-lg p-4 justify-center">
                    <div class="flex items-center w-[150px] mb-3" v-for="permission in role.permissions"
                        :key="permission.id">
                        <span class="mr-2">•</span>
                        <span>{{ permission.name }}</span>
                    </div>
                </div>
            </div>
        </div>

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
            <div class="w-[60%] bg-white rounded-lg p-6 h-[40vh] overflow-y-scroll">
                <span @click="close" class="cursor-pointer">❌</span>
                <Form class="flex flex-col justify-around items-center" @submit="submitForm">
                    <span>Tên vai trò <span class="text-red-500">(*)</span></span>
                    <Field name="role" class="w-[320px]
                            mx-3
                            border-[1px] border-solid border-gray-300
                            focus:outline-none
                            mb-4
                            p-3" v-model="formData.name" />
                    <button v-if="isCreate" @click="createRole"
                        class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#338bad]">
                        Tạo
                    </button>
                    <button v-if="isUpdate" @click="updateRole"
                        class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#3cb138]">
                        Sửa
                    </button>
                </Form>
            </div>
        </div>

    </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import service from '../../services/role'
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            rolesList: [],
            isShow: false,
            isCreate: false,
            isUpdate: false,
            currentRole: null,
            formData: {
                name: ''
            }
        }
    },
    created() {
        this.getList();
    },
    methods: {
        async getList() {
            await service.getList()
                .then(res => {
                    this.rolesList = res.data.roles
                })
        },
        getPermissionName(string) {
            return string.substring(0, string.indexOf("."))
        },
        showCreate() {
            this.isShow = true
            this.isCreate = true
        },
        showUpdate(id) {
            this.isShow = true
            this.isUpdate = true

            this.currentRole = this.rolesList.find(role => role.id == id)
            if (this.currentRole) this.formData.name = this.currentRole.name
        },
        async createRole() {
            await service.createRole(this.formData)
                .then(res => {
                    swal2.success('Tạo mới vai trò thành công')
                    this.getList()
                    this.close()
                })
                .catch(err => swal2(err))
        },
        async updateRole() {
            await service.updateRole(this.formData, this.currentRole.id)
                .then(res => {
                    swal2.success('Sửa vai trò thành công')
                    this.getList()
                    this.close()
                })
                .catch(err => swal2(err))
        },
        deleteRole(id) {
            swal2.confirm("delete").then((result) => {
                if (result.value) {
                    service.deleteRole(id)
                        .then((res) => {
                            // console.log(res);
                            if (res.data.message) return swal2.error(res.data.message)
                            this.getList()
                            swal2.success(`Xoá vai trò này thành công`);
                        })
                        .catch((err) => swal2.error("Something went wrong!"));
                }
            });
        },
        submitForm() { },
        close() {
            this.isShow = false
            this.isCreate = false
            this.isUpdate = false
            this.formData = {
                name: ''
            }
        },
    }
}
</script>
<style></style>