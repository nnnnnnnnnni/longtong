import ioredis from "ioredis";
import { Config } from "../config";

const redis = (db: number) => {
  return new ioredis({
    port: Number(Config.redis.prot),
    host: Config.redis.host,
    db: db,
  });
};

const USER_DB = 0;

export default {
  set: async (
    db: number = USER_DB,
    key: string,
    value: Object | string,
    expiryMode: "EX" | "PX" = "EX",
    tmp: number
  ): Promise<ioredis.Ok | null> => {
    try {
      if (tmp) {
        return await redis(db).set(key, JSON.stringify(value), expiryMode, tmp);
      } else {
        return await redis(db).set(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  },

  get: async (db: number = USER_DB, key: string): Promise<object> => {
    try {
      const data = await redis(db).get(key);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  },
};
