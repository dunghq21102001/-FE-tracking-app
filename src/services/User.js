class User {
    static login(data) {
        return axios
            .post(
                API.LOGIN, data,
            )
    }

    static register(data) {
        return axios
            .post(
                API.REGISTER, data
            )
    }

    static updateRoles(data, id){
        return axios
            .put(API.user + '/add-role/' + id, data)
    }

    static logout() {
        return axios
            .get(
                API.LOGOUT
            )
    }
    static getProfile() {
        return axios
            .get(API.user + '/profile')
    }
    static setProfile(data) {
        return axios
            .put(API.user + '/update', data)
    }

    static listUsers() {
        return axios
            .get(API.user + '/listUsers')
    }

    static detailUser(id) {
        return axios
            .get(API.user + '/detailUser' + '/' + id)
    }

    static fields() {
        return [
            {
                name: '#',
                title: 'Số Thứ Tự'
            },
            {
                name: 'Họ',
                title: 'Họ'
            },
            {
                name: 'Tên',
                title: 'Tên'
            },
            {
                name: 'Email',
                title: 'Email'
            },
            {
                name: 'Số Điện Thoại 1',
                title: 'Số Điện Thoại 1'
            },
            {
                name: 'Số Điện Thoại 2',
                title: 'Số Điện Thoại 2'
            },
            {
                name: 'Địa Chỉ',
                title: 'Địa Chỉ'
            },
            {
                name: 'Thành Phố',
                title: 'Thành Phố'
            },
            {
                name: 'Quốc Gia',
                title: 'Quốc Gia'
            },
            {
                name: 'Vai trò',
                title: 'Vai trò'
            },
            {
                name: 'Trạng Thái',
                title: 'Trạng Thái'
            },
        ]
    }
}
export default User