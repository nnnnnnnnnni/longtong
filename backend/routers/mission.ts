import { Irouter } from "../interface/router";
import * as mission from "../controller/mission";

const router: Irouter = {
  "/mission/create": {
    method: "POST",
    middleware: mission.create,
    allowAnonymous: false,
  },
};

export default router;
