import Cookies from "universal-cookie";

import * as I from "./index.types";

const ApiTokenError = new Error("Token is undefined or invaild");
ApiTokenError.name = "InvalidToken";

const cookies = new Cookies();

class GeslubSession {
  name: string;
  domain: string;
  platform: string;

  constructor({
    name = "geslub-session",
    domain = "geslub.cl",
    platform = "https://geslub.cl",
  }: I.GeslubSession = {}) {
    this.name = name;
    this.domain = domain;
    this.platform = platform;
  }

  getSessionData(): I.Session | undefined {
    return cookies.get(this.name);
  }

  session(): boolean {
    return Boolean(this.getSessionData());
  }

  removeSession(): void {
    cookies.remove(this.name, { domain: this.domain });
  }

  async getUser(): Promise<I.User> {
    const token = cookies.get(this.name)?.authToken;

    if (!token) throw ApiTokenError;

    const res = await fetch(`${this.platform}/private/user`, {
      headers: {
        Authorization: `Bearer ${cookies.get(this.name)?.authToken}`,
      },
    });

    if (res.status === 301) throw ApiTokenError;
    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data;
  }

  getRedirectUrl(sendBackTo?: string): string {
    if (!sendBackTo) return this.platform;

    return `${this.platform}/?redirect=${sendBackTo}`;
  }
}

export default GeslubSession;
