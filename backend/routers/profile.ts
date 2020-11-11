import { Irouter } from "../interface/router";
import * as profile from "../controller/profile";

const router: Irouter = {
  "/profileInfos": {
    method: "GET",
    middleware: profile.infos,
    allowAnonymous: false,
  },
  "/address": {
    method: "GET",
    middleware: profile.address,
    allowAnonymous: false,
  },
};

export default router;
