import { Irouter } from "../interface/router";
import * as project from "../controller/project";

const router: Irouter = {
  "/project/create": {
    method: "POST",
    middleware: project.create,
    allowAnonymous: false,
  },
  "/project/projects": {
    method: "GET",
    middleware: project.projects,
    allowAnonymous: false,
  },
  "/project/update": {
    method: "PUT",
    middleware: project.update,
    allowAnonymous: false,
  },
};

export default router;
