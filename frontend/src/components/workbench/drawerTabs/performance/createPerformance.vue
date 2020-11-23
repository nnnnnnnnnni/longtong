<template>
  <div class="createPerformance">
    <div class="container">
      <div class="top">
        <div class="top-item">
          <a-button type="primary" size="small" @click="openPormanceModal">创建评审</a-button>
        </div>
        <div class="top-item">
          <a-button type="primary" size="small">创建题目</a-button>
        </div>
      </div>
      <div class="list">
        <div class="list-item">
          <h3 class="title">审批列表</h3>
          <div class="performances">
            <div class="performance-item"></div>
          </div>
        </div>
        <div class="list-item">
          <h3 class="title">题目列表</h3>
          <div class="questions">
            <p>1123123</p>
          </div>
        </div>
      </div>

      <!-- 新增/编辑 审批 -->
      <a-modal :title="openType == 1? '新增': '编辑'" :visible="performanceVisible" @ok="handlePormanceOk" @cancel="handleCancel">
        <a-form-model :model="performanceForm" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="绩效标题" required>
            <a-input v-model="performanceForm.name" />
          </a-form-model-item>
          <a-form-model-item label="开始时间" required>
            <a-date-picker style="width: 100%" v-model="performanceForm.startTime" format="YYYY-MM-DD 00:00" :disabled-date="disabledStartDate" />
          </a-form-model-item>
          <a-form-model-item label="结束时间" required>
            <a-date-picker style="width: 100%" v-model="performanceForm.endTime" format="YYYY-MM-DD 23:59" :disabled-date="disabledEndDate"/>
          </a-form-model-item>
          <a-form-model-item label="参与部门" required>
            <a-select mode="multiple" v-model="performanceForm.departments" :allowClear='true'>
              <a-select-option v-for="item in departments" :key="item._id" :value='item._id'>{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "createPerformance",
  data() {
    return {
      wrapperCol: { span: 14, offset: 1 },
      labelCol: { span: 6 },
      openType: 1,
      departments: [],
      performanceVisible: false,
      performanceForm: {},
      performances: [],
      questions: []
    };
  },
  mounted() {
    this.getDepartments();
  },
  methods: {
    // 禁止的开始时间
    disabledStartDate(startValue) {
      const endValue = this.performanceForm.endTime;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    /// 禁止的结束时间
    disabledEndDate(endValue) {
      const startValue = this.performanceForm.startTime;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= moment(endValue).valueOf();
    },
    getDepartments: function() {
      this.$get('/department/departments').then(res => {
        this.departments = res.data;
      })
    },
    // 打开 创建绩效modal
    openPormanceModal: function() {
      this.openType = 1;
      this.performanceVisible = true;
    },
    // 创建绩效Btn ok
    handlePormanceOk: function() {
      
    },
    // modal cancel
    handleCancel: function() {
      this.performanceVisible = false;
    }
  }
};
</script>

<style scoped>
.createPerformance {
  height: 100%;
  overflow: hidden;
}
.createPerformance .container {
  height: 100%;
  overflow: hidden;
}
.container .top {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.container .top .top-item {
  margin-right: 20px;
}
.container .list {
  display: flex;
  height: 100%;
}
.container .list .list-item {
  width: 50%;
  box-sizing: border-box;
  padding: 10px;
}
.container .list .list-item .title {
  height: 28px;
  line-height: 28px;
  border: 1px solid #eee;
  text-align: center;
  width: 100px;
  border-radius: 10px;
  font-size: 12px;
}
.container .list .list-item .performances,
.container .list .list-item .questions {
  height: 100%;
  overflow: auto;
}
</style>
