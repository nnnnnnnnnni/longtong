export interface Config {
    port: number;
    mongo: {
        host: string;
        port: number;
        name: string;
        username: string;
        password: string;
    };
    session: {
        name: string;
        secret: string;
    };
    redis: {
        host: string;
        password: string;
    };
    localStatic: string
}
