import Cookies from "universal-cookie";

interface User {
  id: string;
  usuario: string;
  correo: string;
  nombre: string;
  contrasena: string;
  faenas: string[];
  fechaCreacion: Date;
  fechaActualizacion: Date;
  plataformas: any;
  cargo?: string;
  avatar?: string;
}

interface Session {
  authToken: string;
  userId: string;
}

interface IGeslubSession {
  name?: string;
  domain?: string;
  platform?: string;
}

const cookies = new Cookies();

class GeslubSession {
  name: string;
  domain: string;
  platform: string;

  constructor({
    name = "geslub-session",
    domain = "geslub.cl",
    platform = "https://geslub.cl",
  }: IGeslubSession = {}) {
    this.name = name;
    this.domain = domain;
    this.platform = platform;
  }

  getSessionData(): Session | undefined {
    return cookies.get(this.name);
  }

  session(): boolean {
    return Boolean(this.getSessionData());
  }

  removeSession(): void {
    cookies.remove(this.name, { domain: this.domain });
  }

  async getUser(): Promise<User> {
    const res = await fetch(`${this.platform}/private/user`, {
      headers: {
        Authorization: `Bearer ${cookies.get(this.name)?.authToken}`,
      },
    });

    if (!res.ok) throw new Error(String(res.status));

    const data = await res.json();
    return data;
  }

  getRedirectUrl(sendBackTo?: string): string {
    if (!sendBackTo) return this.platform;

    return `${this.platform}/?redirect=${sendBackTo}`;
  }
}

export default GeslubSession;
