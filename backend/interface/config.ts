export interface Iconfig {
  port: number;
  mongo: {
    host: string;
    port: string;
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
    prot: string;
    password: string;
  };
  qiniu: {
    AK: string;
    SK: string;
    bucket: string;
    url: string;
  };
  localStatic: string;
}
