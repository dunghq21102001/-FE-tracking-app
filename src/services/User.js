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
                title: 'Numerical'
            },
            {
                name: 'First Name',
                title: 'First Name'
            },
            {
                name: 'Last Name',
                title: 'Last Name'
            },
            {
                name: 'Email',
                title: 'Email'
            },
            {
                name: 'Phone 1',
                title: 'Phone 1'
            },
            {
                name: 'Phone 2',
                title: 'Phone 2'
            },
            {
                name: 'Address',
                title: 'Address'
            },
            {
                name: 'City',
                title: 'City'
            },
            {
                name: 'Nation',
                title: 'Nation'
            },
            {
                name: 'Role',
                title: 'Role'
            },
            {
                name: 'Status',
                title: 'Status'
            },
        ]
    }
}
export default User