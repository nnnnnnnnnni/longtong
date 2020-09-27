import { Irouter } from "../interface/router";
import * as user from "../controller/user";

const router: Irouter = {
  "/user/register": {
    method: "POST",
    middleware: user.register,
    allowAnonymous: true,
  },
  "/user/login": {
    method: "POST",
    middleware: user.login,
    allowAnonymous: true,
  },
  "/user/logout": {
    method: "POST",
    middleware: user.logout,
    allowAnonymous: false,
  },
  "/user/main": {
    method: "GET",
    middleware: user.main,
    allowAnonymous: false,
  },
  "/user/update": {
    method: "PUT",
    middleware: user.update,
    allowAnonymous: false,
  },
  "/user/userInfo": {
    method: "GET",
    middleware: user.userInfo,
    allowAnonymous: false,
  },
  "/user/users": {
    method: "GET",
    middleware: user.users,
    allowAnonymous: false,
  },
  "/user/addUser": {
    method: "POST",
    middleware: user.addUser,
    allowAnonymous: false,
  },
};

export default router;
