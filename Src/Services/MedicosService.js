// Importa la instancia configurada de axios (api) desde el archivo de conexión
import api from "./conexion";

/**
 * Servicio para listar todos los médicos
 * @returns {Object} Objeto con propiedad success (boolean) y data (array de médicos) o message (string de error)
 */
export const listarMedicos = async () => {
    try {
        // Realiza petición GET al endpoint /listarMedicos
        const response = await api.get("/listarMedicos");
        // Retorna los datos si la petición es exitosa
        return { success: true, data: response.data };
    } catch (error) {
        // Registra el error en consola con detalles
        console.error(
            "Error al listar Medicos:",
            error.response ? error.response.data : error.message
        );
        // Retorna objeto de error con mensaje apropiado
        return {
            success: false,
            message: error.response 
                ? JSON.stringify(error.response.data) 
                : "Error de conexión",
        };
    }
};

/**
 * Servicio para eliminar un médico por su ID
 * @param {string|number} id - ID del médico a eliminar
 * @returns {Object} Objeto con propiedad success (boolean) y opcional message (string de error)
 */
export const eliminarMedicos = async (id) => {
    try {
        // Realiza petición DELETE al endpoint /eliminarMedicos/{id}
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

/**
 * Servicio para crear un nuevo médico
 * @param {Object} medico - Datos del médico a crear
 * @returns {Object} Objeto con success (boolean), data (datos del médico creado) o message (error)
 */
export const crearMedicos = async (medico) => {
    try {
        // Realiza petición POST al endpoint /crearMedicos con los datos del médico
        const response = await api.post("/crearMedicos", medico);
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

/**
 * Servicio para editar un médico existente
 * @param {string|number} id - ID del médico a editar
 * @param {Object} data - Nuevos datos del médico
 * @returns {Object} Objeto con success (boolean), data (datos actualizados) o message (error)
 */
export const editarMedicos = async (id, data) => {
    try {
        // Realiza petición PUT al endpoint /editarMedicos/{id} con los nuevos datos
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