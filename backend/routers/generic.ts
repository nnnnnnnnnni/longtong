import { Irouter } from "../interface/router";
import * as generic from "../controller/generic";

const router: Irouter = {
  "/generic/upload": {
    method: "POST",
    middleware: generic.upload,
    allowAnonymous: true,
  },
};

export default router;
