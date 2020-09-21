export interface Iroute {
  method: string;
  middleware: Function[];
  allowAnonymous: boolean;
}

export interface Irouter {
  [path: string]: Iroute;
}

export type Irole = 'creater' | 'admin' | 'user' | 'public'