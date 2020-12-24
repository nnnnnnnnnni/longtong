<template>
  <div class="myPerformance">
    <div class="container">
      <div class="item" v-for="item in data" :key="item._id" :class="{outTime: item.outTime, inTime: !item.outTime}">
        <div class="title">
          <div class="title-text">{{ item.title }}</div>
          <div class="title-time">{{ moment(item.startTime).format('YYYY-MM-DD') }} — {{ moment(item.endTime).format('YYYY-MM-DD') }}</div>
        </div>
        <div class="sums">
          <div class="sums-item">
            <span class="sums-item-text">总题数：</span>{{item.questionNumber}}
          </div>
          <div class="sums-item">
            <span class="sums-item-text">总分：</span>{{item.scoreSum}}
          </div>
          <div class="sums-item">
            <span class="sums-item-text">参与部门：</span>{{item.departmentNumber}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "myPerformance",
  data() {
    return {
      moment,
      data: {}
    };
  },
  mounted() {
    this.getMyPerformance();
  },
  methods: {
    getMyPerformance: function() {
      this.$get("/performance/mine").then(res => {
        this.data = res.data;
      });
    }
  }
};
</script>

<style scoped>
.myPerformance {
  height: 100%;
  overflow: hidden;
}
.container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.container .item {
  margin: 10px 0.5%;
  width: 49%;
  height: 200px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.container .inTime:hover {
  border: 1px solid #1890ff;
}
.container .outTime {
  filter: grayscale(100%) !important;
  cursor: no-drop !important;
  color: grey !important;
}
.container .item .title {
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
}
.container .item .title .title-text {
  font-size: 20px;
  font-weight: 600;
}
.container .item .title .title-time {
  color: #444;
  font-size: 12px;
}
.container .item .sums {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  display: flex;
  text-align: center;
}
.container .item .sums .sums-item {
  flex: 1;
}
</style>
