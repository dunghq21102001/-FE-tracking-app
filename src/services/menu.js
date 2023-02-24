export default class MenuFunc {
    static getListMenu() {
        return [{ name: 'Trang chủ', title: 'Trang chủ', url: 'home' },
        { name: 'Theo dõi vận đơn', title: 'Theo dõi vận đơn', url: 'eventTracking' },
        { name: 'Dịch vụ', title: 'Dịch vụ', url: 'service' },
        { name: 'Câu hỏi thường gặp', title: 'Câu hỏi thường gặp', url: 'guild' },
        { name: 'Liên hệ', title: 'Liên hệ', url: 'contact' },
        ]
    }
    static getListMenuAdmin() {
        return [
            { name: 'Người Dùng', title: 'Quản Lý Người Dùng', url: 'users-management' },
            { name: 'Vai Trò', title: 'Quản Lý Vai Trò', url: 'roles-management' },
            { name: 'Quyền', title: 'Quản Lý Quyền', url: 'permissions-management' },
            { name: 'Cấp Quyền', title: 'Quản Lý Cấp Quyền Cho Người Dùng', url: 'assign-roles' },
            { name: 'Dịch Vụ', title: 'Quản Lý Dịch Vụ', url: 'service-management' },
            { name: 'Câu Hỏi Thường Gặp', title: 'Quản Lý Câu Hỏi Thường Gặp', url: 'question-management' },
            { name: 'Yêu Cầu', title: 'Quản Lý Yêu Cầu Từ Người Dùng', url: 'request-management' },
        ]
    }

}