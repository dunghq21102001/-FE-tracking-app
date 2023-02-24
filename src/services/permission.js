class permission {
    static getPermissionList() {
        return axios
            .get(API.permission)
    }

    static createPermission(data) {
        return axios
            .post(API.permission, data)
    }

    static deletePermission(id) {
        return axios
            .delete(API.permission + '/' + id)
    }
}

export default permission