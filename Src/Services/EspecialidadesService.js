import api from "./conexion";

export const listarEspecialidades = async () => {
    try {
        const response = await api.get("/listarEspecialidad");
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al listar Especialidades:",
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

export const eliminarEspecialidades = async (id) => {
    try {
        await api.delete(`/eliminarEspecialidad/${id}`);
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

export const crearEspecialidades = async (paciente) => {
    try {
        const response = await api.post("/crearEspecialidad", paciente);
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

export const editarEspecialidades = async (id, data) => {
    try {
        const response = await api.put(`/editarEspecialidad/${id}`, data);
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