import { Irouter } from "../interface/router";
import * as generic from "../controller/generic";

const router: Irouter = {
  "/generic/upload": {
    method: "POST",
    middleware: generic.upload,
    allowAnonymous: true,
  },
  "/generic/panUpload": {
    method: "POST",
    middleware: generic.panUpload,
    allowAnonymous: false,
  },
  "/generic/pans": {
    method: "GET",
    middleware: generic.pans,
    allowAnonymous: true,
  },
  "/generic/deleteFile": {
    method: "DELETE",
    middleware: generic.deleteFile,
    allowAnonymous: false,
  },
};

export default router;
