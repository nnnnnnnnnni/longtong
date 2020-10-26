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
    color: "rgb(230, 36, 18)"
  },
  {
    name: "需求",
    val: "demand",
    color: "rgb(124, 181, 236)"
  },
  {
    name: "任务",
    val: "mission",
    color: "rgb(144, 237, 125)"
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
  }
  return "";
}
