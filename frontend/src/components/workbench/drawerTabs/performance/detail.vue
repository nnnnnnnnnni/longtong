<template>
  <div class='detail'>
    <div class="title">
      <router-link class="back" :to='{name: "performance_mine"}'>返回</router-link>
      {{performance.title}}</div>
    <div class="questions">
      <div class="question" v-for="(item, index) in performance.questions" :key="item._id">
        <div class="question-item question-id">
          <div class="question-id-container">{{index + 1}}</div>
        </div>
        <div class="question-item question-title">{{item.title}}</div>
        <div class="question-item question-desc">{{item.description}}</div>
        <div class="question-item question-options">
          <a-radio-group v-model="answers[index]">
            <a-radio v-for="(ratio, d) in performance.ratio" :key="ratio" :value="ratio" :disabled="!isChecking">
              {{performance.text[d]}}
            </a-radio>
          </a-radio-group>
        </div>
      </div>
    </div>
    <div class="button">
      <a-button block size='large' class="ledt" type='primary' v-if="!isChecking" @click="toInfo">查看</a-button>
      <a-button block size='large' type='primary' :disabled='!isChecking' @click="submit">提交</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      id: this.$route.params.id,
      performance: {
        text: [],
        tatio: [],
      },
      isChecking: true,
      answers: [],
    };
  },
  mounted() {
    this.getDetail();
  },
  computed: {
    _answers: function() {
      return this.answers.filter(item => {return !!item})
    }
  },
  methods: {
    // 获取绩效所有基础信息
    getDetail: function() {
      this.$get('/performance/detail', {
        id: this.id
      }).then(res => {
        if(res.status == 400) {
          this.$message.info('正在跳转')
          setTimeout(() => {
            this.$router.push({name: 'performance_info', params: {id: this.id}})
          }, 2000);
        }
        this.performance = res.data.performance;
        this.answers = res.data.answers;
        this.isChecking = !res.data.isFinished;
      })
    },
    submit: function() {
      if(this.performance.questions.length != this._answers.length) {
        return this.$message.error('请先全部做完')
      }
      this.$modal.confirm({
        title: '是否确认提交?',
        content: '提交后无法修改，请慎重提交!',
        onOk: () => {
          this.$message.loading({content: '提交中......请稍后', key: 'uplading'})
          this.$post('/performance/submit', {
            answers: this.answers,
            id: this.id
          }).then(res => {
            if(res.status == 200) {
              this.$message.success({content: '提交成功！', key: 'uplading'});
              this.getDetail();
            }
          }).catch(err => {
            this.$message.success({content: '失败', key: 'uplading'})
          }) 
        },
        onCancel() {},
      });
    },
    toInfo: function() {
      this.$router.push({name: 'performance_info', params: {id: this.id}});
    }
  }
};
</script>


<style scoped>
.detail {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
  overflow-x: hidden;
  overflow-y: auto;
}
.title {
  height: 60px;
  padding: 10px 9px;
  font-size: 36px;
  line-height: 40px;
  text-align: center;
  width: 100%;
  position: relative;
}
.title .back {
  display: block;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  position: absolute;
  left: 10px;
  top: 10px;
  font-weight: 600;
  cursor: pointer;
}
.title .back:hover {
  text-decoration: underline;
}
.options {
  display: flex;
  justify-content: space-between;
}
.questions {
  width: 100%;
  margin-top: 30px;
}
.questions .question {
  display: flex;
  margin: 10px 0px;
  border: 1px solid #e6e6e6;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
}
.question-item {
  display: flex;
  align-items: center;
}
.question-id {
  width: 60px;
}
.question-id-container {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #e6e6e6;
  border-radius: 50%;
}
.question-title {
  width: 150px;
}
.question-desc {
  flex: 1;
  padding: 0px 20px;
  word-break: break-all;
}
.question-options {
  width: 320px;
  display: flex;
}
.question-options .question-option {
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.button {
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.button .ledt {
  margin-right: 20px;
}
</style>