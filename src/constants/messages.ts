import HTTP_STATES from "./http-states";
const { UNAUTHORIZED, UNKNOWN_ERROR, BAD_REQUEST, NOT_FOUND } = HTTP_STATES;

const MESSAGES = {
  AUTH: {
    PASSWORD: {
      SHORT: "La contraseña debe tener al menos 6 caracteres",
      LONG: "La contraseña debe tener como máximo 100 caracteres",
      REQUIRED: "La contraseña es requerida",
      UNKNOWN: "Error desconocido",
    },
    EMAIL: {
      REQUIRED: "El email es requerido",
      INVALID: "El email es inválido",
      UNKNOWN: "Error desconocido",
      FORMAT: "El email es inválido",
      UNIQUE: "El email ya está en uso",
    },
    USERNAME: {
      REQUIRED: "El nombre de usuario es requerido",
      SHORT: "El nombre de usuario debe tener al menos 3 caracteres",
      LONG: "El nombre de usuario debe tener como máximo 25 caracteres",
      UNIQUE: "El nombre de usuario ya está en uso",
    },
    _: {
      [UNAUTHORIZED]: "Correo o Contraseña incorrectos",
      [UNKNOWN_ERROR]: "Error desconocido, inténtalo más tarde",
      [BAD_REQUEST]: "Credenciales inválidas",
    },
  },
  BRANCH: {
    NAME: {
      REQUIRED: "El nombre es requerido",
      SHORT: "El nombre debe tener al menos 3 caracteres",
      LONG: "El nombre debe tener como máximo 25 caracteres",
      UNIQUE: "El nombre ya está en uso",
    },
    LIMIT: {
      REQUIRED: "El límite es requerido",
      MIN: "El límite debe ser mayor a 0",
      MAX: "El límite debe ser menor a 1000",
      TYPE: "El límite debe ser un número",
    },
    _: {
      [BAD_REQUEST]: "Petición incorrecta",
      [UNKNOWN_ERROR]: "Inténtalo más tarde",
      [UNAUTHORIZED]: "No autorizado",
    },
  },
  FORM_USER_DATA: {
    FULL_NAME: {
      REQUIRED: "El nombre es requerido",
      SHORT: "El nombre debe tener al menos 5 caracteres",
      LONG: "El nombre debe tener como máximo 25 caracteres",
    },
    PHONE: {
      REQUIRED: "El teléfono es requerido",
      SHORT: "El teléfono debe tener al menos 10 caracteres",
      LONG: "El teléfono debe tener como máximo 15 caracteres",
    },
    SEX: {
      REQUIRED: "El sexo es requerido",
      TYPE: "El sexo es inválido",
    },
    EMERGENCY_CONTACT_FULL_NAME: {
      REQUIRED: "El nombre es requerido",
      SHORT: "El nombre debe tener al menos 5 caracteres",
      LONG: "El nombre debe tener como máximo 25 caracteres",
    },
    EMERGENCY_CONTACT_PHONE: {
      REQUIRED: "El teléfono es requerido",
      SHORT: "El teléfono debe tener al menos 10 caracteres",
      LONG: "El teléfono debe tener como máximo 15 caracteres",
    },
    ALLERGIES: {
      SHORT: "Las alergias deben tener al menos 2 caracteres",
      LONG: "Las alergias deben tener como máximo 200 caracteres",
    },
    DISEASES: {
      SHORT: "Las enfermedades deben tener al menos 2 caracteres",
      LONG: "Las enfermedades deben tener como máximo 200 caracteres",
    },
    MEDICINE: {
      SHORT: "Los medicamentos deben tener al menos 2 caracteres",
      LONG: "Los medicamentos deben tener como máximo 200 caracteres",
    },
    _: {
      [BAD_REQUEST]: "Petición incorrecta",
      [UNKNOWN_ERROR]: "Inténtalo más tarde",
      [UNAUTHORIZED]: "No autorizado",
      [NOT_FOUND]: "No encontrado",
      LOCKED: "El formulario está bloqueado",
    },
  },
};

export default MESSAGES;
