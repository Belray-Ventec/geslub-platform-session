export interface User {
    id: string;
    usuario: string;
    correo: string;
    nombre: string;
    contrasena: string;
    faenas: string[];
    fechaCreacion: Date;
    fechaActualizacion: Date;
    plataformas: any;
    cargo?: string;
    avatar?: string;
}
export interface Session {
    authToken: string;
    userId: string;
}
export interface GeslubSession {
    id?: string;
    domain?: string;
    baseURL?: string;
}
export interface Apis {
    baseURL: string;
    user: string;
}
