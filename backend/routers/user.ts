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
};

export default router;
