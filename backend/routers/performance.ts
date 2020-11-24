import { Irouter } from "../interface/router";
import * as performance from "../controller/performance";

const router: Irouter = {
  "/performance/create": {
    method: "POST",
    middleware: performance.create,
    allowAnonymous: false,
  },
  "/performance/data": {
    method: "GET",
    middleware: performance.data,
    allowAnonymous: false,
  },
};

export default router;
