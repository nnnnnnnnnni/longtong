
const leaveType = [
  {
    val: 'qingjia',
    icon: "calendar",
    title: "请假",
  },
  {
    val: 'jiaban',
    icon: "user-add",
    title: "加班",
  },
  {
    val: 'caigou',
    icon: "shopping-cart",
    title: "采购/报销",
  },
  {
    val: 'waichu',
    icon: "car",
    title: "外出",
  },
  {
    val: 'zhaopin',
    icon: "contacts",
    title: "招聘",
  },
  {
    val: 'zhuanzheng',
    icon: "transaction",
    title: "转正",
  },
];
export default leaveType

export const statusType = {
  posted: {
    title: '已申请',
    color: '#1890ff'
  },
  processing: {
    title: '处理中',
    color: '#722ed1'
  },
  passed: {
    title: '已通过',
    color: '#52c41a'
  },
  rejected: {
    title: '已拒绝',
    color: '#f5222d'
  }
}

export function getApproveType(type) {
  for (let i = 0; i < leaveType.length; i++) {
    if (leaveType[i].val == type) {
      return leaveType[i].title;
    }
  }
  return "";
}