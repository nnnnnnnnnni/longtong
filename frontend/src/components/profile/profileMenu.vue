<template>
  <div class="setting-menu">
    <div class="avator">
      <img :src="userInfo.avator" alt />
    </div>
    <div class="username">{{userInfo.userName}}</div>
    <div class="menu-group">
      <div class="info-item">
        <a-button type='primary' block @click="goSetting">GO SETTING</a-button>
      </div>
      <div class="info-item" :title="userInfo.job">
        <a-icon style="fontSize: 16px;color: #1890ff" type="idcard" />
        <span class="info-item-text">{{userInfo.job || '暂未设置'}}</span>
      </div>
      <div class="info-item ellipsis" :title="userInfo.department">
        <a-icon style="fontSize: 16px;color: #1890ff" type="cluster" />
        <span class="info-item-text ellipsis">{{userInfo.department.info.name || '暂未设置'}}</span>
      </div>
      <div class="info-item" :title="userInfo.mail">
        <a-icon style="fontSize: 16px;color: #1890ff" type="mail" />
        <div class="info-item-text">{{userInfo.mail || '暂未设置'}}</div>
      </div>
      <div class="info-item" :title="userInfo.phone">
        <a-icon style="fontSize: 16px;color: #1890ff" type="phone" />
        <div class="info-item-text">{{userInfo.phone || '暂未设置'}}</div>
      </div>
      <div class="info-item" :title="userInfo.timeLine || 0">
        <a-icon style="fontSize: 16px;color: #1890ff" type="line-chart" />
        <div class="info-item-text">{{userInfo.timeLine || 0}}</div>
      </div>
      <div class="info-item" :title="userInfo.introduction">
        <a-icon style="fontSize: 16px;color: #1890ff;padding-top: 4px" type="eye" />
        <div class="info-item-text">{{userInfo.introduction || '暂未设置'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setting-menu",
  data() {
    return {
      userInfo: {
        company: {info: '', role: 'user'},
        department: {info: {name: ''}}
      },
      userId: this.$route.params.id
    };
  },
  created() {
    this.getInfo()
  },
  methods: {
    goSetting: function() {
      this.$router.push({name: 'setting'})
    },
    getInfo: function() {
      this.$get("/user/userInfo", {
        field: "avator,name,company,userName,mail,phone,job,department,introduction"
      }).then(res => {
        this.userInfo = Object.assign(this.userInfo, res.data);
      });
    },
  },
};
</script>


<style scoped>
*,
*::before,
*::after {
  box-sizing: content-box;
}
.setting-menu {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
}
.setting-menu .avator {
  cursor: pointer;
  margin: 20px auto;
  width: 220px;
  height: 220px;
}
.avator img {
  width: inherit;
  height: inherit;
}
.username {
  font-size: 26px;
  height: 40px;
  line-height: 40px;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
}
.menu-group{
  overflow: hidden;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  transition: all .8s;
}
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}
.info-item {
  box-sizing: border-box;
  position: relative;
  text-align: left;
  padding: 10px 0px;
  height: 40px;
  font-size: 14px;
  margin: 0px auto;
  line-height: 40px;
  display: flex;
  align-items: center;
  color: #666;
  width: 90%;
  user-select: none;
  transition: all .5s;
}
.info-item .info-item-text {
  flex: 1;
  margin-left: 10px;
}
</style>