<template>
  <div class="setting-menu">
    <div class="avator">
      <img :src="this.$store.state.user.avator" alt />
    </div>
    <div class="name info-item">{{this.$store.state.user.userName}}</div>
    <div class="item-group">
      <div class="edit info-item" :class="{edit_active: mode == 'edit'}">
        <lt-btutton circle="true" title="Edit Profile" @click="changeMode"/>
      </div>
      <div class="info-item _edit quit" :class="{quit_active: mode == 'edit'}">
        <lt-btutton circle="true" title="Exit Editing" @click="changeMode"/>
      </div>
    </div>
    <!-- <div class="division info-item" :class="{division_active: mode == 'edit'}">
      <i class="line"></i>
    </div>-->
    <div class="item-group">
      <div class="job info-item" :class="{job_active: mode == 'edit'}" :title="this.$store.state.user.job">
        <a-icon style="fontSize: 16px;color: #1890ff" type="idcard" />
        <span class="info-item-text">{{this.$store.state.user.job || '暂未设置'}}</span>
      </div>
      <div class="info-item _edit base" :class="{base_active: mode == 'edit', checked_active: editActive == 'base'}" @click="changeTab('base')">
        <div class="info-item-text">基本设置</div>
      </div>
    </div>
    <div class="item-group">
      <div class="department info-item ellipsis" :class="{department_active: mode == 'edit'}" :title="this.$store.state.user.department">
        <a-icon style="fontSize: 16px;color: #1890ff" type="cluster" />
        <span class="info-item-text ellipsis">{{this.$store.state.user.department.info.name || '暂未设置'}}</span>
      </div>
      <div class="info-item _edit safe" :class="{safe_active: mode == 'edit', checked_active: editActive == 'safe'}" @click="changeTab('safe')">
        <div class="info-item-text">安全设置</div>
      </div>
    </div>
    <div class="item-group">
      <div class="mail info-item" :class="{mail_active: mode == 'edit'}" :title="this.$store.state.user.mail">
        <a-icon style="fontSize: 16px;color: #1890ff" type="mail" />
        <div class="info-item-text">{{this.$store.state.user.mail || '暂未设置'}}</div>
      </div>
      <div class="info-item _edit bind" :class="{bind_active: mode == 'edit', checked_active: editActive == 'bind'}" @click="changeTab('bind')">
        <div class="info-item-text">绑定设置</div>
      </div>
    </div>
    <div class="item-group">
      <div class="phone info-item" :class="{phone_active: mode == 'edit'}" :title="this.$store.state.user.phone">
        <a-icon style="fontSize: 16px;color: #1890ff" type="phone" />
        <div class="info-item-text">{{this.$store.state.user.phone || '暂未设置'}}</div>
      </div>
      <div class="info-item _edit bind" :class="{bind_active: mode == 'edit', checked_active: editActive == 'company'}" @click="changeTab('company')" v-if="this.$store.state.user.company.role != 'user'">
        <div class="info-item-text">公司设置</div>
      </div>
    </div>
    <div class="item-group">
      <div class="line info-item" :class="{line_active: mode == 'edit'}" :title="this.$store.state.user.timeLine">
        <a-icon style="fontSize: 16px;color: #1890ff" type="line-chart" />
        <div class="info-item-text">{{this.$store.state.user.timeLine}}</div>
      </div>
      <div class="info-item _edit bind" :class="{departments_active: mode == 'edit', checked_active: editActive == 'departments'}" @click="changeTab('departments')">
        <div class="info-item-text">我的部门</div>
      </div>
    </div>
    <div class="item-group">
      <div class="introduction info-item" style="height: auto;align-items:flex-start" :class="{introduction_active: mode == 'edit'}" :title="this.$store.state.user.introduction">
        <a-icon style="fontSize: 16px;color: #1890ff;padding-top: 4px" type="eye" />
        <div class="info-item-text">{{this.$store.state.user.introduction || '暂未设置'}}</div>
      </div>
      <div class="info-item _edit bind" :class="{projects_active: mode == 'edit', checked_active: editActive == 'projects'}" @click="changeTab('projects')">
        <div class="info-item-text">我的项目</div>
      </div>
    </div>
  </div>
</template>

<script>
import ltBtutton from "@/components/common/button.vue";
export default {
  name: "setting-menu",
  data() {
    return {
      mode: "profile", //profile or edit
      editActive: this.$route.name
    };
  },
  components: {
    ltBtutton,
  },
  created() {
    if(this.$route.path.toString().includes('/setting')){
      this.mode = 'edit';
    }
  },
  methods: {
    changeMode: function(){
      if(this.mode == 'edit'){
        this.editActive = '';
      }
      this.mode = this.mode == 'edit'? 'profile' : 'edit'
    },
    changeTab: function(tab){
      if(this.editActive == tab){
        return;
      } else {
        this.editActive = tab;
        this.$router.push({name: tab})
      }
    }
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
  box-sizing: border-box;
  position: relative;
}
.setting-menu .avator {
  cursor: pointer;
  margin: 20px auto 10px auto;
  width: 220px;
  height: 220px;
}
.avator img {
  width: inherit;
  height: inherit;
}
.item-group{
  position: relative;
  overflow: hidden;
}
.info-item {
  position: relative;
  text-align: left;
  left: 0;
  padding: 10px 0px;
  height: 24px;
  font-size: 14px;
  margin: 0 auto;
  left: 0;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #666;
  width: 90%;
  cursor: default;
  user-select: none;
  transition: all 1s;
}
.info-item .info-item-text {
  width: calc(100% - 28px);
  margin-left: 10px;
}
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}
.division .line {
  display: block;
  width: 100%;
  border-top: 1px solid #cccccc;
}
.name {
  font-size: 20px;
  justify-content: center;
}
.edit {
  font-size: 16px;
  height: 34px;
}
.edit_active, .job_active, .division_active, .department_active, .mail_active, .phone_active, .line_active, .introduction_active  {
  left: -100%;
}
._edit {
  position: absolute;
  top: 0;
  left: 100%;
  width: 90%;
  margin: 0 5%;
  text-align: center;
  height: 24px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 5px;
}
.quit{
  font-size: 16px;
  height: 34px;
  width: 95% !important;
}
.quit_active, .base_active, .safe_active, .bind_active, .departments_active, .projects_active {
  left: 0;
  top: 0;
}
.checked_active{
  background-color: rgba(0, 0, 0, 0.12);
}
</style>