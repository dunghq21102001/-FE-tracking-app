<template>
    <div class="hidden shadow-custom w-[250px] h-[100vh] overflow-y-scroll fixed top-0 left-0 bg-[#101a32] text-white md:block">
        <router-link :to="{ name: 'home' }">
            <img src="https://www.transparentpng.com/thumb/box/real-cardboard-box-png-hd--UsWnQV.png"
                alt="home img" class="h-[200px] mx-auto my-[10px]">
        </router-link>
        <ul class="w-full flex-col">
            <router-link :to="{ name: menuItem.url }" v-for="(menuItem, i) in listMenuAdmin" :key="i">
                <li :title="menuItem.title"><span>{{ menuItem.name }}</span><span>⫸</span></li>
            </router-link>
        </ul>
    </div>

    <!-- responsive menu -->
    <div class="block md:hidden fixed top-2 left-2">
        <v-menu  transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">
              ☰
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(field, i) in listMenuAdmin" 
            :key="i" >
            <router-link :to="{ name: field.url }">
              <v-list-item-title>
                  {{ field.name }}
                </v-list-item-title>
              </router-link>  
            </v-list-item>
          </v-list>
        </v-menu>
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