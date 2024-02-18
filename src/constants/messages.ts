const MESSAGES = {
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
};

export default MESSAGES;
