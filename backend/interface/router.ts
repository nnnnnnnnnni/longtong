export interface Iroute {
  method: string;
  middleware: Function[];
  permission: string;
}

export interface Irouter {
  [path: string]: Iroute;
}
