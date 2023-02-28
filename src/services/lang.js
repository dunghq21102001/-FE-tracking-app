import axios from "axios"
import API from '../API'
class language {
    static getVi() {
        return axios
            .get(API + '/vi')
    }

    static getEn() {
        return axios
            .get(API + '/en')
    }
}
export default language