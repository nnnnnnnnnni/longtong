export const participantsColumns = [
  {
    title: "头像",
    dataIndex: "avator",
    key: "avator",
    className: "_center",
    scopedSlots: { customRender: "avator" }
  },
  {
    title: "姓名",
    className: "_center",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "岗位",
    dataIndex: "job",
    className: "_center",
    key: "job"
  },
  {
    title: "部门",
    className: "_center",
    dataIndex: "department",
    key: "department",
    scopedSlots: { customRender: "department" }
  },
  {
    title: "联系方式",
    className: "_center",
    dataIndex: "mail",
    key: "mail",
    scopedSlots: { customRender: "contact" }
  },
  {
    title: "公司角色",
    className: "_center",
    dataIndex: "company",
    key: "company",
    scopedSlots: { customRender: "company" }
  },
  {
    title: "参与项目",
    className: "_center",
    dataIndex: "projects",
    key: "projects",
    scopedSlots: { customRender: "projects" }
  },
  {
    title: "操作",
    className: "_center",
    dataIndex: "_id",
    key: "_id",
    scopedSlots: { customRender: "_id" },
    fixed: "right"
  }
];

export const departmentColumns = [
  {
    title: "名称",
    className: "_center",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "管理数",
    className: "_center",
    dataIndex: "adminNum",
    key: "adminNum"
  },
  {
    title: "成员数",
    className: "_center",
    dataIndex: "userNum",
    key: "userNum"
  },
  {
    title: "上级部门",
    className: "_center",
    scopedSlots: { customRender: "attached" }
  },
  {
    title: "操作",
    className: "_center",
    scopedSlots: { customRender: "action" },
    fixed: "right"
  }
];

export const projectsColumns = [
  {
    title: "LOGO",
    className: "_center",
    dataIndex: "logo",
    scopedSlots: { customRender: "logo" }
  },
  {
    title: "名称",
    className: "_center",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "管理数",
    className: "_center",
    dataIndex: "admins",
    scopedSlots: { customRender: "admins" }
  },
  {
    title: "成员数",
    className: "_center",
    dataIndex: "members",
    scopedSlots: { customRender: "members" }
  },
  {
    title: "隶属部门",
    className: "_center",
    scopedSlots: { customRender: "uppers" }
  },
  {
    title: "操作",
    className: "_center",
    scopedSlots: { customRender: "action" },
    fixed: "right"
  }
];
