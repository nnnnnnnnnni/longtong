import { Irouter } from "../interface/router";
import * as performance from "../controller/performance";

const router: Irouter = {
  "/performance/create": {
    method: "POST",
    middleware: performance.create,
    allowAnonymous: false,
  },
  "/performance/update": {
    method: "PUT",
    middleware: performance.update,
    allowAnonymous: false,
  },
  "/performance/departments": {
    method: "GET",
    middleware: performance.departments,
    allowAnonymous: false,
  },
  "/performance/data": {
    method: "GET",
    middleware: performance.data,
    allowAnonymous: false,
  },
  "/performance/mine": {
    method: "GET",
    middleware: performance.mine,
    allowAnonymous: false,
  },
  "/performance/detail": {
    method: "GET",
    middleware: performance.detail,
    allowAnonymous: false,
  },
  "/performance/info": {
    method: "GET",
    middleware: performance.info,
    allowAnonymous: false,
  },
  "/performance/submit": {
    method: "POST",
    middleware: performance.submit,
    allowAnonymous: false,
  },
  "/performance/question": {
    method: "GET",
    middleware: performance.question,
    allowAnonymous: false,
  },
};

export default router;
