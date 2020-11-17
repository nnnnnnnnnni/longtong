<template>
  <div class="myStart">
    <div class="tab-contaner">
      <div class="tab-item" v-for="item in tabs" :key="item.icon" @click="action(item)">
        <div class="item-icon"><a-icon :type="item.icon"/></div>
        <div class="item-title">{{ item.title }}</div>
      </div>
    </div>
    <a-modal :title="title" :visible="visible" okText="提交" cancelText="取消" @ok="handleOk" @cancel="handleCancel">
      <a-form-model :model="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 14, offset: 1 }">
        <a-form-model-item label="请假类型" required v-if="form.type == 'qingjia'">
          <a-select placeholder="选择请假类型" v-model="form.extra.type">
            <a-select-option v-for="i in leaveTypes" :key="i.val" :value='i.val'>{{i.name}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="开始时间" required v-if="form.type == 'qingjia' || form.type == 'jiaban' || form.type == 'waichu'">
          <a-date-picker placeholder="选择日期" style="width: 49%;margin-right:2%" v-model="form.extra.startDate"/>
          <a-time-picker placeholder="选择时间" style="width: 49%" v-model="form.extra.startTime" format="HH:mm" :minuteStep='30'/>
        </a-form-model-item>
        <a-form-model-item label="结束时间" required v-if="form.type == 'qingjia' || form.type == 'jiaban' || form.type == 'waichu'">
          <a-date-picker placeholder="选择日期" style="width: 49%;margin-right:2%" v-model="form.extra.endDate" :disabledDate="disabledDate"/>
          <a-time-picker placeholder="选择时间" style="width: 49%" v-model="form.extra.endTime" format="HH:mm" :minuteStep='30'/>
        </a-form-model-item>
        <a-form-model-item :label="label" v-if="form.type == 'qingjia' || form.type == 'jiaban' || form.type == 'waichu'">
          <a-input v-model="lastTime" disabled>
            <template slot="suffix">小时</template>
          </a-input>
        </a-form-model-item>
        <a-form-model-item label='需求部门' required v-if="form.type== 'zhaopin'">
          <a-input :value="$store.state.user.department.info.name" disabled/>
        </a-form-model-item>
        <a-form-model-item label='需求职位' required v-if="form.type== 'zhaopin'">
          <a-input v-model="form.extra.job"/>
        </a-form-model-item>
        <a-form-model-item label='需求人数' required v-if="form.type== 'zhaopin'">
          <a-input v-model="form.extra.number"/>
        </a-form-model-item>
        <a-form-model-item label="商品名称" required v-if="form.type == 'caigou'">
          <a-input v-model="form.extra.name"/>
        </a-form-model-item>
        <a-form-model-item label="商品链接" required v-if="form.type == 'caigou'">
          <a-input v-model="form.extra.link" placeholder='如线下购买(不填)'/>
        </a-form-model-item>
        <a-form-model-item label="商品数量" required v-if="form.type == 'caigou'">
          <a-input v-model="form.extra.number" placeholder='数量(不填单位)'/>
        </a-form-model-item>
        <a-form-model-item label="商品价格" required v-if="form.type == 'caigou'">
          <a-input v-model="form.extra.price" placeholder='精确到 “分”'/>
        </a-form-model-item>
        <a-form-model-item label="入职时间" required v-if="form.type == 'zhuanzheng'">
          <a-date-picker style="width:100%" placeholder="选择日期" v-model="form.extra.startDate"/>
        </a-form-model-item>
        <a-form-model-item label="转正时间" required v-if="form.type == 'zhuanzheng'">
          <a-date-picker style="width:100%" placeholder="选择日期" v-model="form.extra.endDate" :disabledDate="disabledDate"/>
        </a-form-model-item>
        <a-form-model-item label="备注">
          <a-textarea v-model="form.notice" placeholder="填写备注"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { _leaveType } from "@/lib/type";
import moment from 'moment'
import tabs from "./tabs";
export default {
  name: "myStart",
  data() {
    return {
      title: '',
      label: '',
      tabs: tabs,
      visible: false,
      leaveTypes: _leaveType,
      fileList: [],
      form: {
        type: 'qingjia',
        extra: {
          type: 1
        }
      },
    };
  },
  computed: {
    // 计算确认时间
    lastTime: function() {
      if(this.form.type != 'qingjia' && this.form.type != 'jiaban' && this.form.type != 'waichu'){
        return 0;
      } else if(!this.form.extra.startTime || !this.form.extra.endTime || !this.form.extra.endDate || !this.form.extra.startDate) {
        return '0.0(自动计算)'
      } else {
        const startDate = moment(this.form.extra.startDate).format('YYYY-MM-DD');
        const startTime = moment(this.form.extra.startTime).format('HH:mm');
        const endDate = moment(this.form.extra.endDate).format('YYYY-MM-DD');
        const endTime = moment(this.form.extra.endTime).format('HH:mm');
        const start = moment(`${startDate} ${startTime}`).format('x');
        const end = moment(`${endDate} ${endTime}`).format('x');
        const tmp = moment.duration(end - start);
        return tmp.days() * 24 + tmp.hours() + tmp.minutes() /60;
      }
    }
  },
  methods: {
    // 打开model
    action: function(val) {
      this.title = val.title + '申请';
      this.label = val.title + '时长'
      this.visible = true;
      this.form.type = val.val;
    },
    // 禁用时间
    disabledDate: function(endValue) {
      const startValue = this.form.extra.startDate;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleCancel: function() {
      this.form = {
        type: 'qingjia',
        extra: {
          type: 1
        },
        notice: ''
      },
      this.visible = false;
    },
    // 确认提交
    handleOk: function() {
      if (
        (this.form.type == "qingjia" ||
          this.form.type == "jiaban" ||
          this.form.type == "waichu") &&
        (!this.form.extra.startTime ||
          !this.form.extra.endTime ||
          !this.form.extra.endDate ||
          !this.form.extra.startDate)
      ) {
        return this.$message.error("信息不完整");
      } else if (
        this.form.type == "caigou" &&
        (!this.form.extra.link ||
          !this.form.extra.name ||
          !this.form.extra.number ||
          !this.form.extra.price)
      ) {
        return this.$message.error("信息不完整");
      } else if (
        this.form.type == "zhaopin" &&
        (!this.form.extra.job || !this.form.extra.number)
      ) {
        return this.$message.error("信息不完整");
      } else if (
        this.form.type == "zhuanzheng" &&
        (!this.form.extra.endDate || !this.form.extra.startDate)
      ) {
        return this.$message.error("信息不完整");
      } else {
        if(this.form.type == "zhaopin") {
          this.form.extra.department = this.$store.state.user.department.info;
        }
        this.$post('/approve/create', this.form).then(res => {
          if(res.status == 200) {
            this.$message.success(res.msg);
            this.handleCancel();
          }
        })
      }
    },
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
