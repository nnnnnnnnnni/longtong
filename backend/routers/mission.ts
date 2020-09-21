import { Irouter } from "../interface/router";
import * as mission from "../controller/mission";

const router: Irouter = {
  "/mission/login": {
    method: "POST",
    middleware: mission.login,
    allowAnonymous: true,
  },
  "/mission/logout": {
    method: "POST",
    middleware: mission.logout,
    allowAnonymous: true,
  },
};

export default router;
