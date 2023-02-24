export default class URL_API {
    static BASE_URL = import.meta.env.VITE_VUE_APP_API_URL
    static LOGIN = this.BASE_URL + '/login'
    static REGISTER = this.BASE_URL + '/register'
    static LOGOUT = this.BASE_URL + '/logout'
    static user = this.BASE_URL + '/user'
    static role = this.BASE_URL + '/role'
    static permission = this.BASE_URL + '/permission'
    static service = this.BASE_URL + '/service'
    static guild = this.BASE_URL + '/guild'
    static receiver = this.BASE_URL + '/receiver'
    static tracking = this.BASE_URL + '/tracking'
}