export declare const DEV_SESSION: {
    authToken: string;
    userId: string;
};
export declare const DEV_USER: {
    id: string;
    nombre: string;
    usuario: string;
    fechaCreacion: string;
    fechaActualizacion: string;
    correo: string;
    faenas: string[];
    plataformas: {
        planning: {
            autorizacion: boolean;
            actProgRegistrosLista: {
                title: never[];
                subtitle: never[];
                content: never[];
                footer: never[];
            };
            rol: string;
            ordenColumnas: number[];
            visibilidadColumnas: boolean[];
            confirmacionActividad: boolean;
        };
        vales: {
            autorizacion: boolean;
            rol: string;
        };
        tribolab: {
            autorizacion: boolean;
            rol: string;
        };
        biblioteca: {
            autorizacion: boolean;
            rol: string;
        };
        dashboard: {
            autorizacion: boolean;
            rol: string;
        };
        dashreport: {
            autorizacion: boolean;
            rol: string;
        };
        platform: {
            autorizacion: boolean;
            rol: string;
        };
    };
    cargo: string;
    habilitado: boolean;
};
