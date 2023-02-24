import { useAuthStore } from '../store/user'
export default function auth({ next, router }) {
    const token = localStorage.getItem('token');
    if (!token) {
        return router.push({ name: 'login' });

    }

    const authStore = useAuthStore()
    authStore.getProfile()

    window.axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('token')}` };
    return next();
}
