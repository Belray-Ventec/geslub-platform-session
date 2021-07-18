import * as I from "./index.types";
declare class GeslubSession {
    id: string;
    domain: string;
    apis: I.Apis;
    constructor({ id, domain, baseURL, }?: I.GeslubSession);
    getSession(): I.Session | undefined;
    isSession(): boolean;
    removeSession(): void;
    getUser(): Promise<I.User>;
    getLoginURL(sendBackTo?: string): string;
}
export default GeslubSession;
