import { Document } from 'mongoose';

export interface Iuser extends Document {
    name: String,           // 姓名
    userName: String,       // 昵称
    avator: String,         // 头像
    job: String,            // 担任职务
    department: String,     // 部门
    introduction: String,   // 简介
    mail: String,           // 邮箱
    password: String,       // 密码
    wechat: String,         // 绑定微信
    miniProgram: String,    // 绑定小程序
    phone: String,          // 手机
    createTime: Date,       // 创建时间
    lastLoginTime: Date,    // 最后登录时间
    timeLine: String,       // 工作时长
    mfa: String,            // MFA绑定
}