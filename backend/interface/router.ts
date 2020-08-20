export interface Route {
    path: string;
    method: string;
    middleware?: Function[];
}