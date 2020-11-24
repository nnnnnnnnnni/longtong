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
            <div class="performance-item" v-for="item in performances" :key="item._id">
              <div class="info title">{{item.title}}</div>
              <div class="info dep">{{item.departments[0].name}}{{item.departments.length > 1 ? `等 ${item.departments.length} 个部门`: ''}}</div>
              <div class="time">
                <span class="info time">{{moment(item.startTime).format('YYYY-MM-DD')}}</span> ~ 
                <span class="info time">{{moment(item.endTime).format('YYYY-MM-DD')}}</span>
              </div>
            </div>
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
            <a-input v-model="performanceForm.title" placeholder='绩效标题' />
          </a-form-model-item>
          <a-form-model-item label="开始时间" required>
            <a-date-picker style="width: 100%" placeholder='开始时间' v-model="performanceForm.startTime" format="YYYY-MM-DD 00:00" :disabled-date="disabledStartDate" />
          </a-form-model-item>
          <a-form-model-item label="结束时间" required>
            <a-date-picker style="width: 100%" placeholder='结束时间' v-model="performanceForm.endTime" format="YYYY-MM-DD 23:59" :disabled-date="disabledEndDate"/>
          </a-form-model-item>
          <a-form-model-item label="参与部门" required>
            <a-select mode="multiple" placeholder='参与部门' v-model="performanceForm.departments" :allowClear='true'>
              <a-select-option v-for="item in departments" :key="item._id" :value='item._id'>{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item v-for="(key, index) in performanceForm.keys" :key="key" :label="'选项' + key" :required ='index <2'>
            <a-input v-model="performanceForm.text[index]" placeholder="文本" style="width: 60%"/>
            <a-input v-model="performanceForm.ratio[index]" placeholder="占比%" style="width: 35%;margin-left: 5%">
              <template slot="suffix">%</template>
            </a-input>
          </a-form-model-item>
        </a-form-model>
      </a-modal>

      <!-- 新增/编辑 题目 -->
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: "createPerformance",
  data() {
    return {
      moment,
      wrapperCol: { span: 14, offset: 1 },
      labelCol: { span: 6 },
      openType: 1,
      departments: [],
      performanceVisible: false,
      performanceForm: {
        keys: ['A', 'B', 'C', 'D'],
        text: ['优秀','良好','及格','不及格'],
        ratio: [100, 80, 60, 40],
      },
      performances: [],
      questions: [],
    };
  },
  mounted() {
    this.getDepartments();
    this.getPerformances();
  },
  methods: {
    getPerformances: function() {
      this.$get('/performance/data').then(res => {
        this.performances = res.data;
      })
    },
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
      if(!this.performanceForm.title) return this.$message.error('必须：绩效标题');
      if(!this.performanceForm.startTime) return this.$message.error('必须：开始时间');
      if(!this.performanceForm.endTime) return this.$message.error('结束时间');
      if(!this.performanceForm.departments) return this.$message.error('必须：参与部门');
      if(this.performanceForm.text.length <2 || this.performanceForm.ratio.length <2) return this.$message.error('必须：选项长度');
      this.$post('/performance/create', Object.assign(this.performanceForm, {
        startTime: moment(moment(this.performanceForm.startTime).format('YYYY-MM-DD 00:00:00')),
        endTime: moment(moment(this.performanceForm.endTime).format('YYYY-MM-DD 23:59:00'))
      })).then(res => {
        this.getPerformances();
        this.$message.success('创建成功');
        this.handleCancel();
      })
    },
    // modal cancel
    handleCancel: function() {
      this.performanceForm = {
        keys: ['A', 'B', 'C', 'D'],
        text: ['优秀','良好','及格','不及格'],
        ratio: [100, 80, 60, 40],
      }
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
  height: calc(100% - 45px);
}
.container .list .list-item {
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.container .list .list-item>.title {
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
  height: calc(100% - 30px);
  overflow: auto;
  padding: 0px 10px 10px 0px;
  box-sizing: border-box;
}
.performance-item {
  width: 100%;
  margin: 5px auto;
  display: flex;
  padding: 5px 10px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 5px;
  cursor: pointer;
  flex-wrap: wrap;
  justify-content: space-between;
  transition: all 0.3s;
}
.performance-item:hover {
  border-color: #76c7fa;
}
.performance-item .title {
  font-size: 16px;
  font-weight: 500;
}
.performance-item .dep {
  width: 150px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  height: inherit;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.performance-item .time {
  width: 100%;
  padding-top: 10px;
  font-size: 12px;

}
</style>
