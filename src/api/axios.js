// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:8000/api',
//     withCredentials: true, 
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     },
// });

// export default api;
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

