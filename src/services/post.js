class post {
    static getAll() {
        return axios
            .get(API.post)
    }

    static getTop() {
        return axios
            .get(API.post + '/getTop')
    }

    static create(data) {
        return axios
            .post(API.post, data)
    }

    static detail(id) {
        return axios
            .get(API.post + '/' + id)
    }

    static increaseView(id) {
        return axios
            .put(API.post + '/increase-view/' + id)
    }

    static update(data, id) {
        return axios
            .post(API.post + '/update/' + id, data)
    }

    static delete(id) {
        return axios
            .delete(API.post + '/' + id)
    }

    static fields() {
        return [
            {
                name: 'Title',
                title: 'Title'
            },
            {
                name: 'Description',
                title: 'Description'
            },
            {
                name: 'Content',
                title: 'Content'
            },
            {
                name: 'Summary',
                title: 'Summary'
            },
            {
                name: 'Image',
                title: 'Image'
            },
            {
                name: 'User',
                title: 'User'
            },
        ]
    }
}

export default post