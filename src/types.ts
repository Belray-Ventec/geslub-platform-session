export interface Session {
  authToken: string;
  userId: string;
}

export interface GeslubSession {
  id: string;
  domain: string;
  apiURL: string;
  loginURL: string;
  redirect: string;
  devSession: boolean;
}

export interface Apis {
  apiURL: string;
  user: string;
}
