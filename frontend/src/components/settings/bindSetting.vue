<template>
  <div class="bindSetting">
    <h2>绑定设置</h2>
    <div class="form-container">
      <div class="form-item">
        <a-card hoverable style="width: 300px">
          <template slot="actions" class="ant-card-actions">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>绑定</span>
              </template>
              <a-icon key="paper-clip" type="paper-clip" />
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>修改</span>
              </template>
              <a-icon key="edit" type="edit" />
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>解绑</span>
              </template>
              <a-icon key="disconnect" type="disconnect" />
            </a-tooltip>
          </template>
          <a-card-meta title="微信" :description="userInfo.wechat || '暂未绑定'">
            <a-avatar slot="avatar" icon='heat-map' />
          </a-card-meta>
        </a-card>
      </div>
      <div class="form-item">
        <a-card hoverable style="width: 300px">
          <template slot="actions" class="ant-card-actions">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>绑定</span>
              </template>
              <a-icon key="paper-clip" type="paper-clip" />
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>修改</span>
              </template>
              <a-icon key="edit" type="edit" />
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>解绑</span>
              </template>
              <a-icon key="disconnect" type="disconnect" />
            </a-tooltip>
          </template>
          <a-card-meta title="微信小程序" :description="userInfo.miniProgram || '暂未绑定'">
            <a-avatar slot="avatar" icon="wechat"/>
          </a-card-meta>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bindSetting",
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo: function() {
      this.$get("/user/userInfo").then(res => {
        this.userInfo = res.data;
      });
    }
  }
};
</script>


<style scoped>
h2 {
  padding-left: 20px;
  margin: 10px 0px 20px 0px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
}
.form-container {
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.form-item {
  flex: 1;
  margin: 20px 10px;
}
</style>