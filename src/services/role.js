class role {
    static getList() {
        return axios
            .get(API.role)
    }
    static detail(id) {
        return axios
            .get(API.role + '/' + id)
    }
    static createRole(data) {
        return axios
            .post(API.role, data)
    }

    static updateRole(data, id) {
        return axios
            .put(API.role + '/' + id, data)
    }

    static deleteRole(id) {
        return axios
            .delete(API.role + '/' + id)
    }

    static addPermissionsForRole(data, id) {
        return axios
            .put(API.role + '/addPermission/' + id, data)
    }
}
export default role