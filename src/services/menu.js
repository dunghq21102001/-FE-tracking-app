export default class MenuFunc {
    static getListMenu() {
        return [{ name: 'Home', title: 'Home', url: 'home' },
        { name: 'Event Tracking', title: 'Event Tracking', url: 'eventTracking' },
        { name: 'Service', title: 'Service', url: 'service' },
        { name: 'Guild', title: 'Guild', url: 'guild' },
        { name: 'Contact', title: 'Contact', url: 'contact' },
        ]
    }
    static getListMenuAdmin() {
        return [
            { name: 'Home', title: 'Home', url: 'home' },
            { name: 'User', title: 'User', url: 'users-management' },
            { name: 'Role', title: 'Role', url: 'roles-management' },
            { name: 'Permission', title: 'Permission', url: 'permissions-management' },
            { name: 'Grant', title: 'Grant', url: 'assign-roles' },
            { name: 'Service', title: 'Service', url: 'service-management' },
            { name: 'Guild', title: 'Guild', url: 'question-management' },
            { name: 'Request', title: 'Request', url: 'request-management' },
        ]
    }

}