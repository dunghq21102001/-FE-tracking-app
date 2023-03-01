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
                title: 'Numerical'
            },
            {
                name: 'Full Name',
                title: 'Full Name'
            },
            {
                name: 'Email',
                title: 'Email'
            },
            {
                name: 'Title',
                title: 'Title'
            },
            {
                name: 'Question',
                title: 'Question'
            }
        ]
    }
}
export default Request