class service {
    static getListService() {
        return axios
            .get(API.service)
    }

    static createService(data) {
        return axios
            .post(API.service, data)
    }

    static updateService(data, id) {
        return axios
            .put(API.service + '/' + id, data)
    }

    static deleteService(id) {
        return axios
            .delete(API.service + '/' + id)
    }
}
export default service