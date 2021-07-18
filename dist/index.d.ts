import * as I from "./index.types";
declare class GeslubSession {
    name: string;
    domain: string;
    platform: string;
    constructor({ name, domain, platform, }?: I.GeslubSession);
    getSessionData(): I.Session | undefined;
    session(): boolean;
    removeSession(): void;
    getUser(): Promise<I.User>;
    getRedirectUrl(sendBackTo?: string): string;
}
export default GeslubSession;
