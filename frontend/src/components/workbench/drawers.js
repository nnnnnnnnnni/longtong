import router from '../../router'
export default [
  {
    val: 'meetting',
    icon: "laptop",
    title: "会议",
    function: ()=> {console.log()}
  },
  {
    val: 'live',
    icon: "audio",
    title: "直播",
    function: ()=> {alert('直播')}
  },
  {
    val: 'document',
    icon: "file",
    title: "文档",
    function: ()=> {router.push({ name: "document_list" })}
  },
  {
    val: 'cloud',
    icon: "hdd",
    title: "云盘",
    function: ()=> {alert('云盘')}
  },
  {
    val: 'mail',
    icon: "mail",
    title: "邮箱",
    function: ()=> {alert('邮箱')}
  },
  {
    val: 'notice',
    icon: "notification",
    title: "通知",
    function: ()=> {alert('通知')}
  },
  {
    val: 'address',
    icon: "team",
    title: "通讯录",
    function: ()=> {alert('通讯录')}
  },
  {
    val: 'approve',
    icon: "audit",
    title: "审批",
    function: ()=> {alert('审批')}
  },
  {
    val: 'performance',
    icon: "solution",
    title: "绩效",
    function: ()=> {alert('绩效')}
  },
  {
    val: 'interview',
    icon: "user-add",
    title: "面试",
    function: ()=> {alert('面试')}
  },
  {
    val: 'setting',
    icon: "setting",
    title: "设置",
    function: ()=> {alert('设置')}
  },
  {
    val: 'process',
    icon: "profile",
    title: "流程",
    function: ()=> {alert('流程')}
  },
  {
    val: 'publicity',
    icon: "fire",
    title: "宣传",
    function: ()=> {alert('宣传')}
  }
];
