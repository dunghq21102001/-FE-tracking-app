class guild {
    static getListGuild() {
        return axios
            .get(API.guild)
    }
}
export default guild