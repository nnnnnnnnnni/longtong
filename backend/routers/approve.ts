import { Irouter } from "../interface/router";
import * as approve from "../controller/approve";

const router: Irouter = {
  "/approve/approvers": {
    method: "GET",
    middleware: approve.approvers,
    allowAnonymous: false,
  },
};

export default router;
