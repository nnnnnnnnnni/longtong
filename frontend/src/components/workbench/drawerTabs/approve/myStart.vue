<template>
  <div class="myStart">
    <div class="tab-contaner">
      <div class="tab-item" v-for="item in tabs" :key="item.icon" @click="action(item)">
        <div class="item-icon"><a-icon :type="item.icon" /></div>
        <div class="item-title">{{ item.title }}</div>
      </div>
    </div>
    <a-modal :title="title" :visible="visible" okText="提交" cancelText="取消" @ok="handleOk" @cancel="visible = false">
      <a-form-model :model="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 14, offset: 1 }">
        <a-form-model-item label="请假类型" required>
          <a-select placeholder="选择请假类型" v-model="form.extra.type">
            <a-select-option v-for="i in leaveTypes" :key="i.val" :value='i.val'>
              {{i.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="开始时间" required>
          <a-date-picker placeholder="选择日期" style="width: 49%;margin-right:2%" v-model="form.startDate" />
          <a-time-picker placeholder="选择时间" style="width: 49%" v-model="form.startTime" format="HH:mm" :minuteStep='30' />
        </a-form-model-item>
        <a-form-model-item label="结束时间" required>
          <a-date-picker placeholder="选择日期" style="width: 49%;margin-right:2%" v-model="form.endDate" :disabledDate="disabledDate" />
          <a-time-picker placeholder="选择时间" style="width: 49%" v-model="form.endTime" format="HH:mm" :minuteStep='30' />
        </a-form-model-item>
        <a-form-model-item label="请假时长">
          <a-input v-model="lastTime" disabled>
            <template slot="suffix">小时</template>  
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="备注">
          <a-textarea v-model="form.notice" placeholder="填写备注"> </a-textarea>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { _leaveType } from "@/lib/type";
import tabs from "./tabs";
export default {
  name: "myStart",
  data() {
    return {
      title: '',
      tabs: tabs,
      visible: false,
      approvers: [],
      leaveTypes: _leaveType,
      fileList: [],
      form: {
        type: 1,
        extra: {
          type: 1
        }
      },
    };
  },
  mounted() {
    this.getApprovers();
  },
  computed: {
    lastTime: function() {
      if(!this.form.startTime || !this.form.endTime || !this.form.endDate || !this.form.startDate) {
        return '0.0'
      } else {
        const startDate = moment(this.form.startDate).format('YYYY-MM-DD');
        const startTime = moment(this.form.startTime).format('HH:mm');
        const endDate = moment(this.form.endDate).format('YYYY-MM-DD');
        const endTime = moment(this.form.endTime).format('HH:mm');
        const start = moment(`${startDate} ${startTime}`).format('x');
        const end = moment(`${endDate} ${endTime}`).format('x');
        const tmp = moment.duration(end - start);
        return tmp.days() * 24 + tmp.hours() + tmp.minutes() /60;
      }
    }
  },
  methods: {
    action: function(val) {
      this.title = val.title + '申请';
      this.visible = true;
      console.log(val)
    },
    // 禁用时间
    disabledDate: function(endValue) {
      const startValue = this.form.startDate;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleOk: function() {},
    //获取审批人员
    getApprovers: function (){
      this.$get('/approve/approvers').then(res => {
        this.approvers = res.data
      })
    }
  }
};
</script>

<style scoped>
.tab-contaner {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 20px;
}
.tab-contaner .tab-item {
  width: 33%;
  height: 116px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
}
.tab-item .item-icon {
  font-size: 18px;
}
.tab-item .item-title {
  margin-top: 5px;
  font-size: 14px;
}
.tab-contaner .tab-item:hover {
  color: #40a9ff;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.03);
}
</style>
