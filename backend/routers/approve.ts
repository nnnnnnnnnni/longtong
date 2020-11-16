import { Irouter } from "../interface/router";
import * as approve from "../controller/approve";

const router: Irouter = {
  "/approve/approvers": {
    method: "GET",
    middleware: approve.approvers,
    allowAnonymous: false,
  },
  "/approve/info": {
    method: "GET",
    middleware: approve.approveSetting,
    allowAnonymous: false,
  },
  "/approve/update": {
    method: "PUT",
    middleware: approve.approveUpdate,
    allowAnonymous: false,
  },
};

export default router;
