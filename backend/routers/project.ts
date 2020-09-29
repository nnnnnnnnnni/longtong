import { Irouter } from "../interface/router";
import * as project from "../controller/project";

const router: Irouter = {
  "/project/create": {
    method: "POST",
    middleware: project.create,
    allowAnonymous: false,
  },
};

export default router;
