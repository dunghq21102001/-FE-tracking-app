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

    static update(data, id) {
        return axios
            .put(API.post + '/' + id, data)
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