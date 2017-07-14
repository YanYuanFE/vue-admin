import axios from 'axios';
import router from '@/router';

axios.default.timeout = 5000;

axios.interceptors.response.use((res) => {
  if (!res.data.session) {
    router.replace({
      path: 'login',
      query: {
        redirect: router.currentRoute.fullPath,
      },
    });
  }
  return res;
}, err => Promise.reject(err));

export default axios;
