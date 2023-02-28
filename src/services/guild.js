class guild {
    static getListGuild() {
        return axios
            .get(API.guild)
    }

    static createGuild(data) {
        return axios
            .post(API.guild, data)
    }

    static updateGuild(data, id) {
        return axios
            .put(API.guild + '/' + id, data)
    }

    static deleteGuild(id) {
        return axios
            .delete(API.guild + '/' + id)
    }
}
export default guild