export default {
  CHANGE_ROUTE: (state, route) => {
    state.route = route;
  },
  CHANGE_USER: (state, user) => {
    state.user = {
      avator: user.avator || "",
      userName: user.userName || user.mail,
      name: user.name || user.mail,
      job: user.job || "",
      department: user.department || "",
      mail: user.mail || "",
      phone: user.phone || "",
      mfa: user.mfa || false,
      wxxcx: user.wxxcx || "",
      wechat: user.wechat || "",
      timeLine: user.timeLine || 0,
      introduction: user.introduction || ""
    };
  }
};
