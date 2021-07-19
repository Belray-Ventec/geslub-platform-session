import Cookies from "universal-cookie";

import * as I from "./index.types";

const ApiTokenError = new Error("Token is undefined or invaild");
ApiTokenError.name = "InvalidToken";

const cookies = new Cookies();

class GeslubSession {
  id: string;
  domain: string;
  loginURL: string;
  apis: I.Apis;

  constructor({
    id = "geslub-session",
    domain = "geslub.cl",
    apiURL = "https://api.geslub.cl",
    loginURL = "https://geslub.cl",
  }: I.GeslubSession = {}) {
    this.id = id;
    this.domain = domain;
    this.loginURL = loginURL;
    this.apis = {
      apiURL,
      user: `${apiURL}/private/user`,
    };
  }

  getSession(): I.Session | undefined {
    return cookies.get(this.id);
  }

  isSession(): boolean {
    return Boolean(this.getSession());
  }

  removeSession(): void {
    cookies.remove(this.id, { domain: this.domain });
  }

  async getUser(): Promise<I.User> {
    const token = cookies.get(this.id)?.authToken;

    if (!token) throw ApiTokenError;

    const res = await fetch(this.apis.user, {
      headers: {
        Authorization: `Bearer ${cookies.get(this.id)?.authToken}`,
      },
    });

    if (res.status === 301) throw ApiTokenError;
    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data;
  }

  getLoginURL(sendBackTo?: string): string {
    if (!sendBackTo) return this.apis.apiURL;

    return `${this.loginURL}/?redirect=${sendBackTo}`;
  }
}

export default GeslubSession;
