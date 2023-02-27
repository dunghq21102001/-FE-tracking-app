<template>
    <div class="w-full">
        <div class="bg-[#289ae7] text-center text-2xl text-white pb-4 pt-11 md:py-4">Assign Roles</div>
        <select name="" id="" class="m-5 w-[200px] py-2 text-center border-black border-[2px] rounded-lg border-solid"
            v-model="selectedRole">
            <option disabled value="">Chọn vai trò</option>
            <option v-bind:value="role.id" v-for="role in roleList" :key="role.id">
                {{ role.name }}
            </option>
        </select>

        <div v-if="selectedRole" class="flex justify-start ml-5 overflow-x-scroll">
            <span class="mr-3 hover:bg-[#289ae7] p-2 cursor-pointer rounded-lg"
                :class="selectedPerName == perName ? 'active' : ''" v-for="(perName, i) in permissionNameList" :key="i"
                @click="getCurrentPermission(perName)">
                {{ perName }}
            </span>
        </div>
        <div v-if="selectedRole && selectedList" class="flex flex-wrap w-[80%] mx-auto justify-around p-3 mt-5">
            <div class="flex items-center" v-for="perm in selectedList" :key="perm.id">
                <input :id="perm.name" type="checkbox" v-model="currentListRoleId" :value="perm.id" class="mr-1"><label
                    :for="perm.name">
                    {{ perm.name }}</label>
            </div>
        </div>
        <div class="w-full mt-5 flex" v-if="selectedRole && selectedList">
            <button @click="updateRole" class="rounded-lg text-white px-7 py-1 max-h-10 bg-[#338bad] mx-auto">
                Lưu
            </button>
        </div>
    </div>
</template>
<script>
import roleService from '../../services/role'
import permissionService from '../../services/permission'
export default {
    data() {
        return {
            permissionList: [],
            roleList: [],
            permissionNameList: [],
            selectedList: [],
            permissionListOfRole: [],
            selectedRole: '',
            selectedPerName: '', //use to active name (change bg color when click to)
            currentRole: {},
            currentListRoleId: []

        }
    },
    created() {
        this.getPermissionList()
        this.getRoleList()
    },
    methods: {
        async getRoleList() {
            await roleService.getList()
                .then(res => {
                    this.roleList = res.data.roles
                })
                .catch(err => swal2.error(err))
        },
        async getPermissionList() {
            await permissionService.getPermissionList()
                .then(res => {
                    this.permissionList = res.data.permissions
                    this.getPermissionNameList()
                })
                .catch(err => swal2.error(err))
        },
        getPermissionNameList() {
            for (let per of this.permissionList) {
                let perName = per.name.substring(0, per.name.indexOf('.'))
                if (!this.permissionNameList.includes(perName)) {
                    this.permissionNameList.push(perName)
                }
            }
        },
        getCurrentPermission(name) {
            this.selectedList = []
            this.selectedPerName = name
            this.permissionList.map(per => {
                if (this.getPermissionName(per.name) == name) {
                    this.selectedList.push(per)
                }
            })
        },
        getPermissionName(permissionName) {
            return permissionName.substring(0, permissionName.indexOf('.'))
        },
        getDetailRole() {
            this.currentListRoleId = []
            const selectedRole = this.selectedRole
            this.roleList.find(role => {
                if (role.id == selectedRole) {
                    this.currentRole = role
                }
            })
            for (let per of this.currentRole.permissions) {
                this.currentListRoleId.push(per.id)
            }
        },
        async updateRole() {
            const submitData = {
                name: '',
                permission_ids: this.currentListRoleId
            }
            // this.currentListRoleId.map(id => submitData.permission_ids.push(id))
            await roleService.addPermissionsForRole(submitData, this.currentRole.id)
                .then(res => {
                    swal2.success('Chỉnh sửa quyền của vai trò này thành công')
                    this.getPermissionList()
                    this.getRoleList()
                })
                .catch(err => swal2.error(err))
        }
    },
    watch: {
        selectedRole() {
            this.getDetailRole()
        }
    }
}
</script>
<style>
.active {
    background-color: #289ae7;
    color: #fff;
}
</style>