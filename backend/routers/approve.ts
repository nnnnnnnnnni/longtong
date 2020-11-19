import { Irouter } from "../interface/router";
import * as approve from "../controller/approve";

const router: Irouter = {
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
  "/approve/create": {
    method: "POST",
    middleware: approve.create,
    allowAnonymous: false,
  },
  "/approve/approves": {
    method: "GET",
    middleware: approve.myApproves,
    allowAnonymous: false,
  },
  "/approve/posts": {
    method: "GET",
    middleware: approve.myposted,
    allowAnonymous: false,
  },
  "/approve/status": {
    method: "POST",
    middleware: approve.status,
    allowAnonymous: false,
  },
};

export default router;
