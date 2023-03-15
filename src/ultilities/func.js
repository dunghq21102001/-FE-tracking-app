class func {
    static formatDate(value) {
        value.getFullYear() +
            "-" +
            ((value.getMonth() + 1).length != 2
                ? "0" + (value.getMonth() + 1)
                : value.getMonth() + 1) +
            "-" +
            (value.getDate().length != 2 ? "0" + value.getDate() : value.getDate())
    }

    static checkPermission(permission, permissionList) {
        return _.some(permissionList, {
            name: permission
        });
    }
    static getLocalTime(time) {
        return new Date(time).toLocaleString()
    }
}
export default func