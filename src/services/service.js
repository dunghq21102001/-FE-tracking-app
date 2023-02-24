class service {
    static getListService() {
        return axios
            .get(API.service)
    }
}
export default service