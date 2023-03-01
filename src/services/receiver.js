class receiver {
    static getListReceiver() {
        return axios
            .get(API.receiver)
    }

    static getDetailReceiver(id) {
        return axios
            .get(API.receiver + '/' + id)
    }

    static createReceiver(data) {
        return axios
            .post(API.receiver, data)
    }

    static updateReceiver(data, id) {
        return axios
            .put(API.receiver + '/' + id, data)
    }
    
    static deleteReceiver(id) {
        return axios
            .delete(API.receiver + '/' + id)
    }

    static fields() {
        return [
            {
                name: 'Name',
                title: 'Name'
            },
            {
                name: 'Address',
                title: 'Address'
            },
            {
                name: 'District',
                title: 'District'
            },
            {
                name: 'City',
                title: 'City'
            },
            {
                name: 'Phone 1',
                title: 'Phone 1'
            },
            {
                name: 'Phone 2',
                title: 'Phone 2'
            },
        ]
    }
}
export default receiver