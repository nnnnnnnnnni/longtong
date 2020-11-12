import { Iconfig } from "./interface/config";
import path from 'path'
export const Config: Iconfig = {
  port: 8081,
  mongo: {
    host: "",
    port: "",
    name: "",
    username: "",
    password: "",
  },
  session: {
    name: "",
    secret: "",
  },
  redis: {
    host: "",
    prot: "",
    password: "",
  },
  qiniu: {
    AK: '',
    SK: '',
    url: '',
    bucket: '',
  },
  localStatic: path.resolve(__dirname, 'static'),
};
