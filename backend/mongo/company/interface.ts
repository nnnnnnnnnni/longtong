import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface Icompany extends Document {
  name: string;           // 公司名字
  logo: string;           // 公司logo
  admins?: ObjectId[];    // 管理员
  members?: ObjectId[];   // 成员
  projects?: ObjectId[];  // 下属项目
  introduction: string;   // 简介
  createTime?: Date;      // 创建时间
  updateTime?: Date;      // 修改时间
  approve?: Object;       // 审批设置 [请假，加班，采购，外出，招聘，转正]
                          // 直接审批类型 1：仅本部门管理员、2：本部门管理员及上部门管理员、3：本部门管理员及指定部门管理员
                          // 指定部门ID
                          // 抄送类型    1：无、2：指定部门成员、3：指定部门管理员、4：指定部门成员及管理员
                          // 指定部门ID
}
