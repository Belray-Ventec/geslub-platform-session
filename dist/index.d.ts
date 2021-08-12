import * as I from "./types";
declare class GeslubSession {
    id: string;
    domain: string;
    loginURL: string;
    redirect: string;
    apis: I.Apis;
    devSession: boolean | I.User;
    constructor({ id, domain, apiURL, loginURL, redirect, devSession, }?: I.GeslubSession);
    setSession(name: string, data: {
        userId: string;
        authToken: string;
    }, domain: string): void;
    getSession(): I.Session | undefined;
    isSession(): boolean;
    removeSession(): void;
    getUser(): Promise<I.User>;
    getLoginURL({ shouldRedirect }?: {
        shouldRedirect?: boolean | undefined;
    }): string;
}
export default GeslubSession;
