class Request {
    static getListRequest() {
        return axios
            .get(API.request)
    }

    static createRequest(data) {
        return axios
            .post(API.request, data)
    }

    static deleteRequest(id) {
        return axios
            .delete(API.request + '/' + id)
    }

    static fields() {
        return [
            {
                name: '#',
                title: 'Số Thứ Tự'
            },
            {
                name: 'Họ Tên',
                title: 'Họ Và Tên'
            },
            {
                name: 'Email',
                title: 'Email'
            },
            {
                name: 'Tiêu Đề',
                title: 'Tiêu Đề'
            },
            {
                name: 'Câu Hỏi',
                title: 'Câu Hỏi'
            }
        ]
    }
}
export default Request