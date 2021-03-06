import { Irouter } from "../interface/router";
import * as company from "../controller/company";

const router: Irouter = {
  "/company/create": {
    method: "POST",
    middleware: company.create,
    allowAnonymous: false,
  },
  "/company/companyInfo": {
    method: "GET",
    middleware: company.companyInfo,
    allowAnonymous: false,
  },
  "/company/update": {
    method: "PUT",
    middleware: company.update,
    allowAnonymous: false,
  },
};

export default router;
