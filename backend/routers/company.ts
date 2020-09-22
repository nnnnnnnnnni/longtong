import { Irouter } from "../interface/router";
import * as company from "../controller/company";

const router: Irouter = {
  "/company/create": {
    method: "POST",
    middleware: company.create,
    allowAnonymous: false,
  },
};

export default router;
