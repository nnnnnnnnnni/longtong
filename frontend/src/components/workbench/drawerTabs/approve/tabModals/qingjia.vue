<template>
  <div class="qingjia">
    <a-modal
      title="请假申请"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        :model="form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14, offset: 1 }"
      >
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
          <a-date-picker placeholder="选择日期" style="width: 49%;margin-right:2%" v-model="form.endDate" />
          <a-time-picker placeholder="选择时间" style="width: 49%" v-model="form.endTime" format="HH:mm" :minuteStep='30' />
        </a-form-model-item>
        <a-form-model-item label="请假时长">
          <a-input v-model="lastTime" disabled>
            <template slot="suffix">小时</template>  
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { _leaveType } from "@/lib/type";
export default {
  name: "qingjia",
  props: ["visible"],
  data() {
    return {
      leaveTypes: _leaveType,
      form: {
        type: 1,
        extra: {
          type: 1
        }
      }
    };
  },
  computed: {
    lastTime: function() {
      if(!this.form.startTime || !this.form.endTime || !this.form.endDate || !this.form.startDate) {
        return '0.0'
      } else {
        return 1
      }
    }
  },
  methods: {
    handleOk: function() {},
    handleCancel: function() {
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped></style>
