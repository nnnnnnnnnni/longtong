import { Irouter } from "../interface/router";
import * as home from "../controller/home";

const router: Irouter = {
  "/home": {
    method: "GET",
    middleware: home.infos,
    allowAnonymous: false,
  },
};

export default router;
