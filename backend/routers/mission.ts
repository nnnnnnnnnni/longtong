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
  "/mission/update": {
    method: "PUT",
    middleware: mission.update,
    allowAnonymous: false,
  },
  "/mission/missionById": {
    method: "GET",
    middleware: mission.missionById,
    allowAnonymous: false,
  },
  "/mission/moveUpdate": {
    method: "PUT",
    middleware: mission.moveUpdate,
    allowAnonymous: false,
  },
  "/mission/lock": {
    method: "POST",
    middleware: mission.lock,
    allowAnonymous: false,
  },
};

export default router;
