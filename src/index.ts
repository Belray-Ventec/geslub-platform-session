import Cookies from "universal-cookie";

import * as I from "./types";
import { DEV_SESSION, DEV_USER } from "./utils";

const ApiTokenError = new Error("Invalid user session");
ApiTokenError.name = "InvalidToken";

const cookies = new Cookies();

class GeslubSession {
  id: I.GeslubSession["id"];
  domain: I.GeslubSession["domain"];
  loginURL: I.GeslubSession["loginURL"];
  redirect: I.GeslubSession["redirect"];
  devSession: I.GeslubSession["devSession"];
  apis: I.Apis;

  constructor({
    id = "geslub-session",
    domain = "geslub.cl",
    apiURL = "https://api.geslub.cl",
    loginURL = "https://geslub.cl",
    redirect = "",
    devSession = false,
  }: Partial<I.GeslubSession> = {}) {
    this.id = id;
    this.domain = domain;
    this.loginURL = loginURL;
    this.redirect = redirect;
    this.devSession = devSession;
    this.apis = {
      apiURL,
      user: `${apiURL}/private/user`,
    };

    if (devSession) {
      console?.warn("Se esta usando sesión de desarrollo");
      this.setSession(DEV_SESSION);
    }
  }

  setSession(data: { userId: string; authToken: string }): void {
    cookies.set(this.id, data, { domain: this.domain });
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

  async getSessionUser(): Promise<typeof DEV_USER> {
    if (this.devSession) return DEV_USER;

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

  getLoginURL({ shouldRedirect = false } = {}): string {
    if (shouldRedirect) return `${this.loginURL}?redirect=${this.redirect}`;
    return this.loginURL;
  }
}

export default GeslubSession;
