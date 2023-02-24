import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import API from './API'
import './assets/main.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import { createPinia } from 'pinia'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import swal2 from './swal2'
import _ from 'lodash';
import func from './ultilities/func'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import vueClickOutsideElement from 'vue-click-outside-element'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Paginate from "vuejs-paginate-next";




window.API = API
window.axios = axios
window.axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem("token")}` };
window.swal2 = swal2
window._ = _
window.func = func



const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.component('header-common', Header)
app.component('footer-common', Footer)

app.use(router)
app.use(vuetify)
app.use(pinia)
app.use(vueClickOutsideElement)
app.use(VueSweetalert2)
app.use(Paginate)


app.mount('#app')