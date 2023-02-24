import { data } from 'autoprefixer';
import { defineStore } from 'pinia'
import user from '../services/User'
import permission from '../services/permission'
export const useAuthStore = defineStore('user', {
    state: () => ({
        token: localStorage.token ? localStorage.token : null,
        userData: {},
        permission: []
    }),
    getters: {
        getToken: state => {
            return state.token;
        },
        getUser: state => {
            return state.userData;
        },
        getPermission: state => {
            return state.permission;
        }
    },
    actions: {
        async login(dataSubmit) {
            await user
                .login(dataSubmit)
                .then(response => {
                    this.token = response.data.access_token;
                    localStorage.setItem('token', response.data.access_token);
                    window.axios.defaults.headers.common = { 'Authorization': `bearer ${response.data.access_token}` }
                })
                .catch(e => {
                    if (e.response) {
                        swal2.error(e.response.data.error)
                    }
                    //  else if (e.request) {
                    //     console.log(e.request);
                    // } else {
                    //     console.log('Error', e.message);
                    // }
                });

        },
        async getProfile() {
            await user.getProfile(this.token)
                .then(response => {
                    this.userData = response.data.user
                })
                .catch(e => {
                    if (navigator.onLine) {
                        localStorage.removeItem('token');
                        swal2.error('Token không hợp lệ!', 3000)
                        window.location.href = "/login";
                    } else {
                        swal2.error("Bạn đang ngoại tuyến, vui lòng kiểm tra lại đường truyền!");
                    }
                });
        },

        async getPermissionList() {
            await permission.getPermissionList()
                .then(res => {
                    this.permission = res.data;
                })
          },

    },
})