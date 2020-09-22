import ioredis from "ioredis";
import { Config } from "../config";

const redis = (db: number) => {
  return new ioredis({
    port: Number(Config.redis.prot),
    host: Config.redis.host,
    password: Config.redis.password,
    db: db,
  });
};

const USER_DB = 0;

export default {
  set: async (
    db: number = USER_DB,
    key: string,
    value: Object | string,
    tmp?: number
  ): Promise<ioredis.Ok | null> => {
    try {
      if (tmp) {
        return await redis(db).set(key, JSON.stringify(value), "EX", tmp);
      } else {
        return await redis(db).set(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  get: async (db: number = USER_DB, key: string): Promise<object> => {
    try {
      const data = await redis(db).get(key);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  del: async (db: number = USER_DB, key: string): Promise<any> => {
    try {
      return await redis(db).del(key);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
