import AsyncStoreage from '@react-native-async-storage/async-storage';
import api from './api';

export const loginUser = async (email, password) =>{
    try {
        const response = await api.post('/login', {email, password});
        const {token} = response.data.token;

        await AsyncStoreage.setItem("userToken", token);

        return {success: true, token};
} catch (error) {
    console.error(
        'Error de login', 
        error.response ? error.response.data : error.message
    );
    return {
        success: false,
        message: error.response
        ? error.response.data.message
        : "Error al conectar",
    };
}
}
