import { Irouter } from "../interface/router";
import * as document from "../controller/document";

const router: Irouter = {
  "/document/create": {
    method: "POST",
    middleware: document.create,
    allowAnonymous: false,
  },
  "/document/docs": {
    method: "GET",
    middleware: document.docs,
    allowAnonymous: false,
  },
  "/document/docById": {
    method: "GET",
    middleware: document.docById,
    allowAnonymous: false,
  },
};

export default router;
