import axios from 'axios';
import AsyncStorage from '@react-native-async.storage/async-storage';

const API_BASE_URL = "http://172.30.3.44:8000/api"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

const RutasPublicas = ['/login', '/registrar'];

api.interceptors.request.use(
    async (config) => {
        //Verificar si la ruta es publica
        const isRutaPublica = RutasPublicas.some(route=>config.url.includes(route));
        if (!isRutaPublica){

            const userToken= await AsyncStorage.getItem('userToken');
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }
        }
        return config;
    }
);

api.interceptors.response.use(
    (response) =>response,
    async (error) =>{
        const originalRequest = error.config;
        const isRutaPublica = RutasPublicas.some(route=>originalRequest.url.includes(route));

        if(error.response && error.response.status === 401 && !isRutaPublica._retry && !isRutaPublica){
            originalRequest._retry = true;

            console.log("Token expirado o no autorizado.")
            await AsyncStorage.removeItem('userToken');
    }
    return Promise.reject(error);
    }
);
export default api;