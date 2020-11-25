<template>
  <div class="approve">
    <div class="approve-item">
      <div class="item title name">审批名称</div>
      <div class="item title admin">直接审批人</div>
      <div class="item title cc">抄送人</div>
    </div>
    <div class="approve-item" v-for="tab in tabs" :key="tab.val">
      <div class="item name">{{ tab.title }}</div>
      <div class="item admin">
        <a-radio-group v-model="radio[tab.val].admin" @change="change">
          <a-radio :style="radioStyle" :value="1">
            仅本部门管理员
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            本部门管理员及上部门管理员
          </a-radio>
          <a-radio :style="inlineRadioStyle" :value="3">
            本部门管理员及
            <a-select size='small' v-model="radio[tab.val].adminBind" style="width: 120px;display: inline-block" @change="change">
              <a-select-option v-for="dep in departments" :key="dep._id" :value='dep._id'>
                {{dep.name}}
              </a-select-option>
            </a-select>
            部门管理员
          </a-radio>
        </a-radio-group>
      </div>
      <div class="item cc">
        <a-radio-group v-model="radio[tab.val].cc" @change="change">
          <a-radio :style="radioStyle" :value="1">
            无
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            <a-select size='small' v-model="radio[tab.val].ccBind" style="width: 120px;display: inline-block" @change="change">
              <a-select-option v-for="dep in departments" :key="dep._id" :value='dep._id'>
                {{dep.name}}
              </a-select-option>
            </a-select>
            部门成员
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            <a-select size='small' v-model="radio[tab.val].ccBind" style="width: 120px;display: inline-block" @change="change">
              <a-select-option v-for="dep in departments" :key="dep._id" :value='dep._id'>
                {{dep.name}}
              </a-select-option>
            </a-select>
            部门管理员
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            <a-select size='small' v-model="radio[tab.val].ccBind" style="width: 120px;display: inline-block" @change="change">
              <a-select-option v-for="dep in departments" :key="dep._id" :value='dep._id'>
                {{dep.name}}
              </a-select-option>
            </a-select>
            部门成员及管理员
          </a-radio>
        </a-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import tabs from "@/components/workbench/drawerTabs/approve/tabs";
export default {
  name: "approveTab",
  props: ["activeTab"],
  data() {
    return {
      tabs: tabs,
      departments: [],
      radio: {
        qingjia: {},
        caigou: {},
        waichu: {},
        jiaban: {},
        zhaopin: {},
        zhuanzheng: {}
      },
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      inlineRadioStyle: {
        display: 'inline-block',
        height: '30px',
        lineHeight: '30px',
      }
    };
  },
  watch: {
    activeTab: function() {
      if (this.activeTab == 5) {
        this.getInfos();
      }
    }
  },
  mounted(){
    this.getInfos()
  },
  methods: {
    // 更新设置
    change: function() {
      console.log(this.radio)
      this.$put('/approve/update', {
        doc: this.radio
      }).then(res => {
        if(res.status == 200) {
          return this.$message.success('修改成功')
        }
      })
    },
    // 获取初步设置
    getInfos: function() {
      this.$get('/approve/info').then(res=> {
        this.radio= Object.assign(this.radio, res.data.info);
        this.departments = res.data.departments;
      })
    }
  }
};
</script>

<style scoped>
.approve-item {
  display: flex;
  justify-content: space-around;
  line-height: 20px;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.approve-item .item {
  flex: 1 0 auto;
}
.approve-item .title {
  text-align: center;
}
</style>
