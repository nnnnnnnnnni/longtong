# longtong(笼统)

### A internal management platform, It can be used as a process management program for small companies or teams to facilitate the most efficient things in the least time.
### 一个内部管理平台，可以用作小型公司或团队的过程管理程序，以在最短的时间内促进最高效的事情。

<hr/>

## technology
frontend: vue2.x + vuex + vue-router

backend: koa(ts) + mongodb + redis

<hr/>

## Appreciation

|name|document link|
|---|---|
|FullCalendar|https://fullcalendar.io/docs/headerToolbar|
|vditor|https://ld246.com/article/1549638745630|
|css (ant-design-vue)|https://www.antdv.com/docs/vue/introduce-cn/|
|http (highcharts)|https://github.com/axios/axios|
|chart (highcharts)|https://www.highcharts.com/|
|DB (mongoose)|https://mongoosejs.com/|
|redis (ioredis)|https://www.npmjs.com/package/ioredis|
|OSS (qiniu)|https://developer.qiniu.com/kodo|

<hr/>

## Feature
 - [x] 用户登录（管理员、用户）
 - [x] 用户注册（管理员）
 - [x] 公司设置...
   - [x] 公司创建（logo，名称，介绍...）
   - [x] 公司设置更新
   - [x] 公司人员管理（新增、编辑）
   - [x] 公司部门管理（新增、编辑、删除）
   - [x] 公司项目管理（新增、编辑、删除）
   - [x] 公司审批管理（设置、更新）
 - [ ] 个人设置...
   - [x] 基本设置（设置、修改）
   - [x] 修改密码
   - [ ] 安全设置
     - [x] 邮箱绑定（默认邮箱创建）
     - [ ] 手机绑定
     - [ ] MFA绑定
   - [ ] 绑定设置...
     - [ ] 微信绑定（后续微信登录）
     - [ ] 微信小程序绑定（后续扫码登录）
 - [x] 个人信息展示页面（持续功能展出...）
 - [x] 日历功能...
   - [x] 日历图展示（图上展示、点击相亲展示）
   - [x] 日历图周期切换（日、周、月展示）
   - [x] 日历图日期切换（点击随意切换日期）
   - [x] 日历图任务新建（button新建、滑动新建）
   - [x] 日历图任务更新（点击更新）
 - [x] 首页展示...
   - [x] 任务数据可视化展示（定期数据记录暂无...）
   - [x] 任务数据列表展示
 - [x] 任务功能
   - [x] 任务新增（日历图页面）
   - [x] 任务完成、拒绝、关闭（日历图页面、首页展示页面）
   - [x] 任务更新（弹出框）
   - [ ] 任务评论
   - [ ] 创建子任务
   - [ ] 任务归类
 - [ ] 聊天功能（TODO）
 - [x] 文章文档(Markdown)
   - [x] 写文章
   - [x] 编辑文章
   - [ ] 文章评论
   - [ ] 设为私有
 - [x] 文件网盘（上传到qiniuOSS）
   - [x] 上传
   - [x] 下载
 - [x] 通讯录展示（链接后续跳转到指定人聊天）
 - [x] 审批
   - [x] 审批申请（任何人）
   - [x] 审批批复（管理员）
   - [x] 审批过程查看
 - [ ] 绩效讨论（TODO）
 - [ ] 视频会议（TODO）
 - [ ] 面试（TODO）
   - [ ] 申请面试
   - [ ] 面试记录
   - [ ] 创建试题
   - [ ] 面试答题
   - [ ] 面试批卷
   - [ ] ......
 - [ ] 多平台
   - [ ] 微信小程序（事实消息通知、简单信息展示、扫码登录）
   - [ ] 微信小程序（扫码登录）

## Usage

```bash
cd longtong
## install module with npm and registry in https://registry.npm.taobao.org
./build.sh

## make your own config in /backend/config.ts

## open first terminal and run...
cd ./backend
npm run dev

## open another
cd ../frontend
npm run dev

## then you can open the web server in localhost:8080
```

