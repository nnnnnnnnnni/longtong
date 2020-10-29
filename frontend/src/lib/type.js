export const _priority = [
  {
    name: "十分紧急",
    val: 1,
    color: "rgb(230, 36, 18)"
  },
  {
    name: "紧急",
    val: 2,
    color: "rgb(250, 140, 21)"
  },
  {
    name: "普通",
    val: 3,
    color: "rgb(27, 154, 238)"
  },
  {
    name: "较低",
    val: 4,
    color: "rgb(140, 140, 140)"
  }
];

export const _missionType = [
  {
    name: "BUG",
    val: "bug",
    color: "rgb(230, 36, 18)",
    icon: 'bug'
  },
  {
    name: "需求",
    val: "demand",
    color: "rgb(124, 181, 236)",
    icon: 'inbox'
  },
  {
    name: "任务",
    val: "mission",
    color: "rgb(144, 237, 125)",
    icon: 'tool'
  },
  {
    name: "会议",
    val: "meeting",
    color: "#fa8c16",
    icon: 'laptop'
  }
];

export const _statusType = [
  {
    name: "等待分配",
    val: "needAssign",
    color: "#096dd9"
  },
  {
    name: "即将开始",
    val: "upcoming",
    color: "#fadb14"
  },
  {
    name: "进行中",
    val: "processing",
    color: "#a0d911"
  },
  {
    name: "已逾期",
    val: "overdue",
    color: "#f5222d"
  },
  {
    name: "已通过",
    val: "passed",
    color: "#52c41a"
  },
  {
    name: "已关闭",
    val: "closed",
    color: "#434343"
  }
];

export function getPriority(priority, key) {
  try {
    if (key == "name") {
      return _priority[Number(priority) - 1].name;
    } else if (key == "color") {
      return _priority[Number(priority) - 1].color;
    }
  } catch (error) {
    return "";
  }
}

export function getMissionType(type, key) {
  for (let i = 0; i < _missionType.length; i++) {
    if (_missionType[i].val == type && key == "name") {
      return _missionType[i].name;
    }
    if (_missionType[i].val == type && key == "color") {
      return _missionType[i].color;
    }
    if (_missionType[i].val == type && key == "icon") {
      return _missionType[i].icon;
    }
  }
  return "";
}

export function getStatusType(type, key) {
  for (let i = 0; i < _statusType.length; i++) {
    if (_statusType[i].val == type && key == "name") {
      return _statusType[i].name;
    }
    if (_statusType[i].val == type && key == "color") {
      return _statusType[i].color;
    }
  }
  return "";
}
