import { Irouter } from "../interface/router";
import * as department from "../controller/department";

const router: Irouter = {
  "/department/create": {
    method: "POST",
    middleware: department.create,
    allowAnonymous: false,
  },
  "/department/update": {
    method: "PUT",
    middleware: department.update,
    allowAnonymous: false,
  },
  "/department/departments": {
    method: "GET",
    middleware: department.departments,
    allowAnonymous: false,
  },
};

export default router;
