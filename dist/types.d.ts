export interface User {
    id: string;
    usuario: string;
    correo: string;
    nombre: string;
    faenas: string[];
    fechaCreacion: string;
    fechaActualizacion: string;
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
    apiURL?: string;
    loginURL?: string;
    redirect?: string;
    devSession?: boolean | User;
}
export interface Apis {
    apiURL: string;
    user: string;
}
