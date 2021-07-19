import * as I from "./index.types";
declare class GeslubSession {
    id: string;
    domain: string;
    loginURL: string;
    apis: I.Apis;
    constructor({ id, domain, apiURL, loginURL, }?: I.GeslubSession);
    getSession(): I.Session | undefined;
    isSession(): boolean;
    removeSession(): void;
    getUser(): Promise<I.User>;
    getLoginURL(sendBackTo?: string): string;
}
export default GeslubSession;
