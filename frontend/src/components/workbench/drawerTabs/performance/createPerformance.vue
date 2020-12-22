<template>
  <div class="createPerformance">
    <div class="container">
      <div class="top">
        <div class="top-item">
          <a-button type="primary" size="small" @click="openPormanceModal">创建评审</a-button>
        </div>
        <div class="top-item">
          <a-button type="primary" size="small" @click="openQuestionModal">创建题目</a-button>
        </div>
      </div>
      <div class="list">
        <div class="list-item">
          <div class="list-title"><h3>审批列表</h3></div>
          <div class="performances">
            <div class="performance-item" v-for="item in performances" :key="item._id" @click="showDetail(item, 1)">
              <div class="hang">
                <div class="info title">{{item.title}}</div>
                <div class="info dep">{{item.departments[0].name}}{{item.departments.length > 1 ? `等 ${item.departments.length} 个部门`: ''}}</div>
              </div>
              <div class="hang">
                <div class="time">
                  <span class="info time">{{moment(item.startTime).format('YYYY-MM-DD')}}</span> ~ 
                  <span class="info time">{{moment(item.endTime).format('YYYY-MM-DD')}}</span>
                </div>
                <div class="time question" v-if="item.questions && item.questions.length"> 共 {{item.questions.length}} 道题</div>
                <div class="time question" v-else>暂无题目</div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="list-title">
            <h3>题目列表</h3>
          </div>
          <div class="questions">
            <div class="question-item" v-for="item in questions" :key="item._id" @click="showDetail(item, 2)">
              <div class="item name">{{item.title}}</div>
              <div class="item type">单选题</div>
              <div class="item score">{{item.score}}</div>
              <div class="nouse" v-if="item.belong == 0"></div>
              <div class="use" v-else></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 新增/编辑 审批 -->
      <a-modal :title="openType == 1? '新增': '编辑'" :visible="performanceVisible" @ok="handlePormanceOk" @cancel="handleCancel" width='800px'>
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
          <a-form-model-item label="所含题目" >
            <a-button type='primary' icon='fullscreen' @click="openSelect(performanceForm)">选择</a-button>
            <span class="space20" v-if="performanceForm.questions">共 {{performanceForm.questions.length}} 道题</span>
          </a-form-model-item>
        </a-form-model>
      </a-modal>

      <!-- 新增/编辑 题目 -->
      <a-modal :title="openType == 1? '新增': '编辑'" :visible="questionVisible" @ok="handleQuestionOk" @cancel="handleCancel">
        <a-form-model :model="performanceForm" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="题目标题" required>
            <a-input v-model="questionForm.title" placeholder='题目标题' />
          </a-form-model-item>
          <a-form-model-item label="题目描述" required>
            <a-textarea v-model="questionForm.description" placeholder='题目描述' />
          </a-form-model-item>
          <a-form-model-item label="题目分值" required>
            <a-input type='number' v-model="questionForm.score" placeholder='题目分值' />
          </a-form-model-item>
          <a-form-model-item label="已被引用" v-if="openType == 2">
            <span class="space10" v-if="questionForm.performances">{{questionForm.performances.length}}</span>
          </a-form-model-item>
        </a-form-model>
      </a-modal>

      <select-question :dataSource='dataSource' :visible='selectVisible' @cancel="handleSelectCancel" @change="selectChange" :selected='selected'/>
    </div>
  </div>
</template>

<script>
import selectQuestion from '@/components/workbench/drawerTabs/performance/selectQuestion'
import moment from 'moment';
export default {
  name: "createPerformance",
  data() {
    return {
      targetKeys: [],
      selectedKeys: [],
      targetDom: null,
      moment,
      wrapperCol: { span: 14, offset: 1 },
      labelCol: { span: 6 },
      openType: 1,
      departments: [],
      selectVisible: false,
      performanceVisible: false,
      questionVisible: false,
      questionForm: {},
      performanceForm: {
        keys: ['A', 'B', 'C', 'D'],
        text: ['优秀','良好','及格','不及格'],
        ratio: [100, 80, 60, 40],
      },
      performances: [],
      questions: [],
      dataSource: [],
      selected: [],
    };
  },
  components: {
    selectQuestion
  },
  mounted() {
    this.getDepartments();
    this.getPerformances();
    this.getQuestions();
  },
  methods: {
    // 获取所有绩效列表
    getPerformances: function() {
      this.$get('/performance/data').then(res => {
        this.performances = res.data;
      })
    },
    // 获取所有绩效问题列表
    getQuestions: function() {
      this.$get('/question/data').then(res => {
        this.questions = res.data.map(question => {
          question.disabled = false;
          return question
        });
      })
    },
    // 获取所有部门
    getDepartments: function() {
      this.$get('/performance/departments').then(res => {
        this.departments = res.data;
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
    // 打开 创建绩效modal
    openPormanceModal: function() {
      this.openType = 1;
      this.performanceVisible = true;
    },
    // 打开 创建问题modal
    openQuestionModal: function() {
      this.openType = 1;
      this.questionVisible = true;
    },
    // 创建绩效Btn ok
    handlePormanceOk: function() {
      if(!this.performanceForm.title) return this.$message.error('必须：绩效标题');
      if(!this.performanceForm.startTime) return this.$message.error('必须：开始时间');
      if(!this.performanceForm.endTime) return this.$message.error('结束时间');
      if(!this.performanceForm.departments) return this.$message.error('必须：参与部门');
      if(this.performanceForm.text.length <2 || this.performanceForm.ratio.length <2) return this.$message.error('必须：选项长度');
      if(this.openType == 1) {
        this.$post('/performance/create', Object.assign(this.performanceForm, {
          startTime: moment(moment(this.performanceForm.startTime).format('YYYY-MM-DD 00:00:00')),
          endTime: moment(moment(this.performanceForm.endTime).format('YYYY-MM-DD 23:59:00'))
        })).then(res => {
          this.getPerformances();
          this.$message.success('创建成功');
          this.handleCancel();
        })
      } else if (this.openType == 2) {
        this.$put('/performance/update', Object.assign(this.performanceForm, {
          startTime: moment(moment(this.performanceForm.startTime).format('YYYY-MM-DD 00:00:00')),
          endTime: moment(moment(this.performanceForm.endTime).format('YYYY-MM-DD 23:59:00'))
        })).then(res => {
          this.getPerformances();
          this.getQuestions();
          this.$message.success('更新成功');
          this.handleCancel();
        })
      }
    },
    // 创建问题Btn ok
    handleQuestionOk: function() {
      if(!this.questionForm.title) return this.$message.error('必须：题目标题');
      if(!this.questionForm.description) return this.$message.error('必须：题目描述');
      if(!this.questionForm.score) return this.$message.error('必须：题目分值');
      if(this.openType == 1) {
        this.$post('/question/create', this.questionForm).then(res => {
          this.getQuestions();
          this.$message.success('创建成功');
          this.handleCancel();
        })
      } else if (this.openType == 2) {
        this.$put('/question/update', this.questionForm).then(res => {
          this.getQuestions();
          this.$message.success('更新成功');
          this.handleCancel();
        })
      }
    },
    // modal cancel
    handleCancel: function() {
      this.performanceForm = {
        keys: ['A', 'B', 'C', 'D'],
        text: ['优秀','良好','及格','不及格'],
        ratio: [100, 80, 60, 40],
      };
      this.questionForm = {};
      this.selected = [];
      this.performanceVisible = false;
      this.questionVisible = false;
    },
    // 选择题目cancel
    handleSelectCancel: function() {
      this.performanceForm.questions = this.selected
      this.selectVisible = false;
      this.performanceVisible = true;
    },
    // 打开选择题目
    openSelect: function(data) {
      this.dataSource = [];
      this.performanceVisible = false;
      this.selectVisible = true;
      this.selected = data.questions || [];
    },
    // 打开编辑model
    showDetail: function(data, type) {
      this.openType = 2;
      if(type == 1) {
        this.performanceForm = Object.assign({}, {
          ...data,
          departments: data.departments.map(item => item._id),
          keys: ['A', 'B', 'C', 'D'],
          text: ['优秀','良好','及格','不及格'],
          ratio: [100, 80, 60, 40],
        })
        this.performanceVisible = true;
      } else if(type == 2) {
        this.questionForm = Object.assign({}, data);
        this.questionVisible = true;
      }
    },
    // 输入框变化搜索
    selectChange: function(e) {
      this.$get('/question/data',{
        text: e.target.value
      }).then(res => {
        this.dataSource = res.data.slice(0, 10);
      })
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
.container .list .list-item .list-title {
  height: 28px;
  line-height: 28px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.container .list .list-item .list-title h3 {
  border: 1px solid #eee;
  border-radius: 10px;
  width: 100px;
  margin-right: 50px;
  margin-bottom: 0px;
}
.container .list .list-item .performances,
.container .list .list-item .questions {
  height: calc(100% - 30px);
  overflow: auto;
  padding: 0px 10px 10px 0px;
  box-sizing: border-box;
}
.performance-item, .question-item {
  width: 100%;
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}
.performance-item:hover, .question-item:hover {
  border-color: #76c7fa;
}
.performance-item .hang {
  box-sizing: border-box;
  line-height: 24px;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 4px 0px;
}
.performance-item .title {
  font-size: 16px;
  font-weight: 500;
}
.question-item {
  justify-content: space-between;
  flex-direction: row;
}
.question-item .item {
  width: 33.3%;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;
}
.question-item .type {
  text-align: center;
}
.question-item .score {
  text-align: right;
}
.question-item .use {
  text-align: right;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: red;
  margin: auto 0px auto 5px;
}
.question-item .nouse {
  text-align: right;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: green;
  margin: auto 0px auto 5px;
}
.space10 {
  margin-left: 10px;
}
.space20 {
  margin-left: 20px;
}
</style>
