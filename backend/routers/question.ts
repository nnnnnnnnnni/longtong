import { Irouter } from "../interface/router";
import * as question from "../controller/question";

const router: Irouter = {
  "/question/create": {
    method: "POST",
    middleware: question.create,
    allowAnonymous: false,
  },
  "/question/update": {
    method: "PUT",
    middleware: question.update,
    allowAnonymous: false,
  },
  "/question/data": {
    method: "GET",
    middleware: question.data,
    allowAnonymous: false,
  },
};

export default router;
