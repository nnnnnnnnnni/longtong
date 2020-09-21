import { user } from "@/mongo/user";
import crypto from "crypto";

export const generateToken = (user: string): string => {
  const secret = "TOKEN_SCRECT";
  const hash = crypto
    .createHmac("sha256", secret)
    .update("I love cupcakes")
    .digest("hex");
  return hash;
};
