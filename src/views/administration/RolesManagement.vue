<template>
    <div class="w-full">
        <div class="bg-[#289ae7] text-center text-2xl text-white pb-4 pt-11 md:py-4">{{$t('X Management', [$t('Role')])}}</div>
        <button @click="showCreate" class=" m-4 rounded-lg text-white px-7 py-1 max-h-10 bg-[#438aab]">
            📜 {{$t('Create', [$t('Role')])}}
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
            <div class="w-[90%] md:w-[60%] bg-white rounded-lg p-6 h-[40vh] overflow-y-scroll">
                <span @click="close" class="cursor-pointer">❌</span>
                <Form class="flex flex-col justify-around items-center" @submit="submitForm">
                    <span>{{ $t('Name') }}<span class="text-red-500">(*)</span>
                    <ErrorMessage class="text-red-500" name="role"></ErrorMessage>
                </span>
                    <Field name="role" class="
                            w-[240px] md:w-[320px]
                            mx-3
                            border-[1px] border-solid border-gray-300
                            focus:outline-none
                            mb-4
                            p-3" v-model="formData.name" 
                            :rules="validateEmpty"/>
                    <button v-if="isCreate" @click="createRole"
                        class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#338bad]">
                        {{ $t('Create', [$t('Role')]) }}
                    </button>
                    <button v-if="isUpdate" @click="updateRole"
                        class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#3cb138]">
                        {{ $t('Update') }}
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
            if(this.formData.name.trim() == '') return swal2.error(`${this.$t('Enter To', [this.$t('All Field'), this.$t('Create')])}`)
            await service.createRole(this.formData)
                .then(res => {
                    swal2.success(`${this.$t('Create', [this.$t('Role')])} ${this.$t('Successfully')}`)
                    this.getList()
                    this.close()
                })
                .catch(err => swal2(err))
        },
        async updateRole() {
            if(this.formData.name.trim() == '') return swal2.error(`${this.$t('Enter To', [this.$t('All Field'), this.$t('Update')])}`)
            await service.updateRole(this.formData, this.currentRole.id)
                .then(res => {
                    swal2.success(`${this.$t('Update')} ${this.$t('Successfully')}`)
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
                            swal2.success(`${this.$t('Delete')} ${this.$t('Successfully')}`);
                        })
                        .catch((err) => swal2.error(err));
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
        validateEmpty(value) {
            if(!value) {
            return `${this.$t('This field cannot be left blank')}`
            }
            return true;
        },
    }
}
</script>
<style></style>