import router from '../../router'
export default [
  {
    val: 'meetting',
    icon: "laptop",
    title: "会议",
    function: ()=> {console.log()}
  },
  {
    val: 'document',
    icon: "file",
    title: "文档/文章",
    function: ()=> {router.push({ name: "document_list" })}
  },
  {
    val: 'cloud',
    icon: "hdd",
    title: "云盘",
    function: ()=> {router.push({ name: "pans" })}
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
    function: ()=> {router.push({ name: "base" })}
  },
  {
    val: 'process',
    icon: "profile",
    title: "流程",
    function: ()=> {alert('流程')}
  }
];
