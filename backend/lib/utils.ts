import crypto from "crypto";
import qiniu from "qiniu";
import { Config } from "../config";

export const generateToken = (user: string): string => {
  const secret = "TOKEN_SCRECT";
  const hash = crypto
    .createHmac("sha256", secret)
    .update("I love cupcakes")
    .digest("hex");
  return hash;
};

export const uploadFile = async (
  filePath: string,
  name: string
): Promise<any> => {
  return new Promise((reslove, reject) => {
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: Config.qiniu.bucket + ":" + name,
    });
    const mac = new qiniu.auth.digest.Mac(Config.qiniu.AK, Config.qiniu.SK);
    const token = putPolicy.uploadToken(mac);
    const conf = new qiniu.conf.Config({ zone: qiniu.zone.Zone_z0 });
    const formUploader = new qiniu.form_up.FormUploader(conf);
    const putExtra = new qiniu.form_up.PutExtra();
    // 文件上传
    formUploader.putFile(token, name, filePath, putExtra, function (
      respErr,
      respBody,
      respInfo
    ) {
      if (respErr) {
        reject(respErr);
      }
      if (respInfo.statusCode == 200) {
        const config = new qiniu.conf.Config();
        const bucketManager = new qiniu.rs.BucketManager(mac, config);
        const publicBucketDomain = Config.qiniu.url;
        reslove(bucketManager.publicDownloadUrl(publicBucketDomain, name));
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
  });
};
