export default function checkLogin({ next, router }) {
    const token = localStorage.getItem('token');
    if (token) {
      return router.push({ name: 'home' });
    }
    return next();
  }