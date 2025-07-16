import api from "./conexion";

export const listarMedicos = async () => {
    try {
        const response = await api.get("/listarMedicos");
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al listar Medicos:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response 
                ? JSON.stringify(error.response.data) 
                : "Error de conexión",
        };
    }
};

export const eliminarMedicos = async (id) => {
    try {
        await api.delete(`/eliminarMedicos/${id}`);
        return { success: true };
    } catch (error) {
        console.error(
            "Error al eliminar paciente:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response 
                ? JSON.stringify(error.response.data) 
                : "Error de conexión",
        };
    }
};

export const crearMedicos = async (paciente) => {
    try {
        const response = await api.post("/crearMedicos", paciente);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al crear paciente:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response 
                ? JSON.stringify(error.response.data) 
                : "Error de conexión",
        };
    }
};

export const editarMedicos = async (id, data) => {
    try {
        const response = await api.put(`/editarMedicos/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar paciente:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response 
                ? JSON.stringify(error.response.data) 
                : "Error de conexión",
        };
    }
};