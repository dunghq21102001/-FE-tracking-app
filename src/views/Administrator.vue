<template>
    <div class="w-full">
        <AdminHeader></AdminHeader>
        <div class="ml-[250px]">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import AdminHeader from '../components/AdminHeader.vue'
export default {
    components: {
        AdminHeader
    }
}
</script>