<template>
    <div class="shadow-custom w-[250px] h-[100vh] overflow-y-scroll fixed top-0 left-0
                                        bg-[#101a32] text-white">
        <router-link :to="{ name: 'home' }">
            <img src="https://www.amnh.org/var/ezflow_site/storage/images/media/amnh/images/explore/ology-images/earth/what-s-the-big-idea-about-earth/earth-icon/4690373-1-eng-US/earth-icon.png"
                alt="home img" class="h-[200px] mx-auto my-[10px]">
        </router-link>
        <ul class="w-full flex-col">
            <!-- <router-link :to="{ name: 'users-management' }">
                <li><span>Users</span><span>⫸</span></li>
            </router-link>
            <router-link :to="{ name: 'roles-management' }">
                <li><span>Roles</span><span>⫸</span></li>
            </router-link>
            <router-link :to="{ name: 'permissions-management' }">
                <li><span>Permissions</span><span>⫸</span></li>
            </router-link>
            <router-link :to="{ name: 'assign-roles' }">
                <li><span>Assign Roles</span><span>⫸</span></li>
            </router-link> -->
            <router-link :to="{ name: menuItem.url }" v-for="(menuItem, i) in listMenuAdmin" :key="i">
                <li :title="menuItem.title"><span>{{ menuItem.name }}</span><span>⫸</span></li>
            </router-link>
        </ul>
    </div>
</template>
<script>
import menuService from '../services/menu'
export default {
    data() {
        return {
            listMenuAdmin: menuService.getListMenuAdmin()
        }
    },
    created() { },
    methods: {

    }

}
</script>
<style scoped>
li {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li:hover {
    background-color: #1e2d55;
    cursor: pointer;
}

.shadow-custom {
    box-shadow: 2px 0px 12px 0px black;
}
</style>