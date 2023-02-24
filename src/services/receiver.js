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
                name: 'Tên',
                title: 'Tên'
            },
            {
                name: 'Địa Chỉ',
                title: 'Địa Chỉ'
            },
            {
                name: 'Quận / Huyện',
                title: 'Quận / Huyện'
            },
            {
                name: 'Tỉnh / Thành Phố',
                title: 'Tỉnh / Thành Phố'
            },
            {
                name: 'Số ĐT 1',
                title: 'Số ĐT 1'
            },
            {
                name: 'Số ĐT 2',
                title: 'Số ĐT 2'
            },
        ]
    }
}
export default receiver