import * as I from "./index.types";
declare class GeslubSession {
    id: string;
    domain: string;
    loginURL: string;
    redirect: string;
    apis: I.Apis;
    constructor({ id, domain, apiURL, loginURL, redirect, }?: I.GeslubSession);
    getSession(): I.Session | undefined;
    isSession(): boolean;
    setSession(name: string, data: unknown, domain: string): void;
    removeSession(): void;
    getUser(): Promise<I.User>;
    getLoginURL({ shouldRedirect }?: {
        shouldRedirect?: boolean | undefined;
    }): string;
}
export default GeslubSession;
