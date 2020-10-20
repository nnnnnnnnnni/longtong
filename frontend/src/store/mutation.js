export default {
  CHANGE_ROUTE: (state, route) => {
    state.route = route;
  },
  CHANGE_USER: (state, user) => {
    state.user = {
      _id: user._id,
      avator: user.avator || "",
      userName: user.userName || user.mail,
      name: user.name || user.mail,
      company: user.company || {},
      role: user.role || [],
      job: user.job || "",
      department: user.department || {info:{name: ''}, name: ''},
      mail: user.mail || "",
      phone: user.phone || "",
      mfa: user.mfa || false,
      miniProgram: user.miniProgram || "",
      wechat: user.wechat || "",
      timeLine: user.timeLine || 0,
      introduction: user.introduction || ""
    };
  },
  CHANGE_COMPANY: (state, value) => {
    state.user.company.info = value;
  },
};
