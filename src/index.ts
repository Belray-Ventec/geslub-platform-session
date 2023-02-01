import Cookies from "universal-cookie";

import * as I from "./types";
import { DEV_SESSION, DEV_USER } from "./utils";

const ApiTokenError = new Error("Invalid user session");
ApiTokenError.name = "InvalidToken";

const cookies = new Cookies();

class GeslubSession {
  id: string;
  domain: string;
  loginURL: string;
  redirect: string;
  apis: I.Apis;
  devSession: boolean | I.User;

  constructor({
    id = "geslub-session",
    domain = "geslub.cl",
    apiURL = "https://api.geslub.cl",
    loginURL = "https://geslub.cl",
    redirect = "",
    devSession = false,
  }: I.GeslubSession = {}) {
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
      console?.warn("Se esta usando instancía de sesión de prueba");
      if (typeof devSession === "object")
        this.setSession(
          this.id,
          { ...DEV_SESSION, userId: devSession.id },
          this.domain
        );
      else this.setSession(this.id, DEV_SESSION, this.domain);
    }
  }

  setSession(
    name: string,
    data: { userId: string; authToken: string },
    domain: string
  ): void {
    cookies.set(name, data, { domain });
  }

  getSession(): I.Session | undefined {
    return cookies.get(this.id);
  }

  isSession(): boolean {
    return Boolean(this.getSession());
  }

  removeSession(): void {
    cookies.set(this.id, undefined, { domain: this.domain, maxAge: -1 });
  }

  async getUser(): Promise<I.User> {
    if (this.devSession)
      return typeof this.devSession === "object" ? this.devSession : DEV_USER;

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
