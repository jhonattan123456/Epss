import api from "./conexion";

export const listarCitas = async () => {
    try {
        const response = await api.get("/listarCitas");
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al listar pacientes:",
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

export const eliminarCitas = async (id) => {
    try {
        await api.delete(`/eliminarCitas/${id}`);
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

export const crearCitas = async (paciente) => {
    try {
        const response = await api.post("/crearCitas", paciente);
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

export const editarCitas = async (id, data) => {
    try {
        const response = await api.put(`/editarCitas/${id}`, data);
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