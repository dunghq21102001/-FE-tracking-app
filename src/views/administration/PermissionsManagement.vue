<template>
    <div class="w-full">
        <div class="bg-[#289ae7] text-center text-2xl text-white py-4">Permissions Management</div>
        <button @click="showCreate" class=" m-4 rounded-lg text-white px-7 py-1 max-h-10 bg-[#438aab]">
            🚫 Tạo quyền
        </button>
        <div class="w-full h-[60vh] overflow-y-scroll">
            <div class="w-full flex flex-col h-full flex-wrap justify-start items-start pl-[30px]">
                <span class="w-[200px] flex justify-between border-solid border-black border-b-[1px] mb-4 mr-4"
                    v-for="(per, i) in permissionList" :key="per.id">
                    {{ `${i + 1}/ ${per.name}` }}
                    <i class="cursor-pointer" @click="deletePer(per.id)">❌</i>
                </span>
            </div>
        </div>

        <!-- form create -->
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
                    <span>Tên quyền <span class="text-red-500">(*)</span></span>
                    <Field name="role" class="w-[320px]
                        mx-3
                        border-[1px] border-solid border-gray-300
                        focus:outline-none
                        mb-4
                        p-3" v-model="formData.name" />
                    <button v-if="isCreate" @click="createPer"
                        class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#338bad]">
                        Tạo
                    </button>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import service from '../../services/permission'
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            permissionList: [],
            isShow: false,
            isCreate: false,
            formData: {
                name: ''
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            await service.getPermissionList()
                .then(res => {
                    this.permissionList = res.data.permissions
                })
        },
        showCreate() {
            this.isShow = true
            this.isCreate = true
        },
        async createPer() {
            await service.createPermission(this.formData)
                .then(res => {
                    swal2.success('Tạo mới quyền thành công')
                    this.getList()
                    this.close()
                })
                .catch(er => swal2.error(er))
        },
        deletePer(id) {
            swal2.confirm("delete").then((result) => {
                if (result.value) {
                    service.deletePermission(id)
                        .then((res) => {
                            // console.log(res);
                            if (res.data.message) return swal2.error(res.data.message)
                            this.getList()
                            swal2.success(`Xoá quyền này thành công`);
                        })
                        .catch((err) => swal2.error("Something went wrong!"));
                }
            });
        },
        close() {
            this.isShow = false
            this.isCreate = false
            this.formData = {
                name: ''
            }
        },
        submitForm() { }
    }
}
</script>
<style></style>