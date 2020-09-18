import { Irouter } from "../interface/router";
import * as mission from "../controller/mission";

const router: Irouter = {
  "/mission/login": {
    method: "POST",
    middleware: [mission.login],
    permission: "public",
  },
  "/mission/logout": {
    method: "POST",
    middleware: [mission.logout],
    permission: "public",
  },
};

export default router;
