class trackingNumber {
    static getListTracking() {
        return axios
            .get(API.tracking)
    }

    static getDetailTracking(id) {
        return axios
            .get(API.tracking + '/' + id)
    }

    static createTracking(data) {
        return axios
            .post(API.tracking, data)
    }

    static updateTracking(data, id) {
        return axios
            .put(API.tracking + '/' + id, data)
    }

    static cancelTracking(id) {
        return axios
            .delete(API.tracking + '/' + id)
    }

    static searchTracking(bolId) {
        return axios
            .get(API.tracking + '/search', bolId)
    }

    static fields() {
        return [
            {
                name: 'BOL',
                title: 'BOL'
            },
            {
                name: 'Delivery Notes',
                title: 'Delivery Notes'
            },
            {
                name: 'Status',
                title: 'Status'
            },
            {
                name: 'Receiver',
                title: 'Receiver'
            },
            {
                name: 'Phone',
                title: 'Phone'
            },
            {
                name: 'Address',
                title: 'Address'
            },
            {
                name: 'Created Date',
                title: 'Created Date'
            },
            {
                name: 'Note',
                title: 'Note'
            },
        ]
    }
}
export default trackingNumber