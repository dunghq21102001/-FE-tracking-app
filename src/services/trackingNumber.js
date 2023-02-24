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

    static fields() {
        return [
            {
                name: 'Mã Vận Đơn',
                title: 'Mã Vận Đơn'
            },
            {
                name: 'Phiếu Gửi Hàng',
                title: 'Phiếu Gửi Hàng'
            },
            {
                name: 'Trạng Thái',
                title: 'Trạng Thái'
            },
            {
                name: 'Người Nhận',
                title: 'Người Nhận'
            },
            {
                name: 'Số ĐT',
                title: 'Số ĐT'
            },
            {
                name: 'Địa Chỉ',
                title: 'Địa Chỉ'
            },
            {
                name: 'Ngày Tạo',
                title: 'Ngày Tạo'
            },
            {
                name: 'Ghi Chú',
                title: 'Ghi Chú'
            },
        ]
    }
}
export default trackingNumber