interface User {
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
interface Session {
    authToken: string;
    userId: string;
}
interface IGeslubSession {
    name?: string;
    domain?: string;
    platform?: string;
}
declare class GeslubSession {
    name: string;
    domain: string;
    platform: string;
    constructor({ name, domain, platform, }?: IGeslubSession);
    getSessionData(): Session | undefined;
    session(): boolean;
    removeSession(): void;
    getUser(): Promise<User>;
    getRedirectUrl(sendBackTo?: string): string;
}
export default GeslubSession;
