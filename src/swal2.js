import swal2 from 'sweetalert2/dist/sweetalert2'

class swal {
    static success(message, time = 2000) {
        swal2.fire({
            toast: true,
            showConfirmButton: false,
            position: 'top-end',
            timer: time,
            icon: 'success',
            timerProgressBar: true,
            title: message,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal2.stopTimer)
                toast.addEventListener('mouseleave', swal2.resumeTimer)
                toast.addEventListener('click', swal2.close)
            }
        })
    }
    static error(message, time = 2500) {
        swal2.fire({
            toast: true,
            showConfirmButton: false,
            position: 'top-end',
            timer: time,
            icon: 'error',
            timerProgressBar: true,
            title: message,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal2.stopTimer)
                toast.addEventListener('mouseleave', swal2.resumeTimer)
                toast.addEventListener('click', swal2.close)
            }
        })
    }
    static confirm(type, mess = '') {
        return swal2.fire({
            text: `${mess} ${type}`,
            icon: "warning",
            cancelButtonText: 'No',
            showCancelButton: true,
            confirmButtonColor: '#f38021',
            cancelButtonColor: '#b6d9ff',
            confirmButtonText: 'Yes'
        })
    }
}

export default swal