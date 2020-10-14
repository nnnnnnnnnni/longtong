import { Irouter } from "../interface/router";
import * as mission from "../controller/mission";

const router: Irouter = {
  "/mission/create": {
    method: "POST",
    middleware: mission.create,
    allowAnonymous: false,
  },
  "/mission/missions": {
    method: "GET",
    middleware: mission.missions,
    allowAnonymous: false,
  },
};

export default router;
