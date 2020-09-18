import { Irouter } from "../interface/router";
import * as user from "../controller/user";

const router: Irouter = {
  "/user/login": {
    method: "GET",
    middleware: [user.login],
    permission: "public",
  },
  "/user/logout": {
    method: "POST",
    middleware: [user.logout],
    permission: "public",
  },
};

export default router;
