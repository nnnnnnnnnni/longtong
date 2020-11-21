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
    function: (cb)=> {cb()}
  },
  {
    val: 'approve',
    icon: "audit",
    title: "审批",
    function: ()=> {router.push({ name: "approve" })}
  },
  {
    val: 'performance',
    icon: "solution",
    title: "绩效",
    function: ()=> {router.push({ name: "performance_mine" })}
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
    function: ()=> {router.push({ name: "setting_base" })}
  }
];
