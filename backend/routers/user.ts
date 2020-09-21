import { Irouter } from "../interface/router";
import * as user from "../controller/user";

const router: Irouter = {
  "/user/register": {
    method: "GET",
    middleware: [user.register],
    allowAnonymous: true,
  },
  "/user/login": {
    method: "GET",
    middleware: [user.login],
    allowAnonymous: true,
  },
  "/user/logout": {
    method: "POST",
    middleware: [user.logout],
    allowAnonymous: true,
  },
};

export default router;
