<template>
  <div class="info">
    <div class="performance">
      <div class="title">{{ performance.title }}</div>
      <div class="sub">
        <div class="sub-item time">
          时间：
          {{ moment(performance.startTime).format("YYYY-MM-DD") }} —
          {{ moment(performance.endTime).format("YYYY-MM-DD") }}
        </div>
        <div class="sub-item sum">总分： {{ sum }}</div>
      </div>
    </div>
    <div class="chart">
      <div id="chart1" class="chart-item"></div>
      <div id="chart2" class="chart-item"></div>
    </div>
    <div class="department">
      <div class="dep-item" v-for="item in performance.departments" :key='item._id'>
        <a-button :type="currentDep._id == item._id? 'primary': ''" @click="clickCurrentDep(item)">{{item.name}}</a-button>
      </div>
    </div>
    <div class="user">
      <div class="user-item" v-for="item in currentDep.members" :key='item._id'>
        <a-button :type="currentUser._id == item._id? 'primary': ''" @click="clickCurrentUser(item)">
          {{item.userName}}
        </a-button>
      </div>
    </div>
    <div class="table">
      <div class="td"></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import highchart from "highcharts";
export default {
  name: "info",
  data() {
    return {
      moment,
      currentDep: {},
      id: this.$route.params.id,
      currentUser: {},
      performance: {},
      aggregateData: [],
      sum: 0,
      questionInfo: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo: function() {
      this.$get("/performance/info", {
        id: this.id
      }).then(res => {
        this.performance = res.data.performance;
        this.currentDep = res.data.performance.departments[0];
        this.currentUser = this.currentDep.members[0];
        this.getQuestionInfo(this.currentUser._id)
        this.aggregateData = res.data.aggregateData;
        this.sum = res.data.sum;
        this.drawLineChart(
          "chart1",
          "",
          res.data.x,
          [
            {name: '总分', color: '#f5222d', marker: {symbol: "circle"}, data: res.data.yAverage},
            {name: '平均分', color: '', marker: {symbol: "circle"}, data: res.data.ySumScore},
          ]
        );
        this.drawLineChart(
          "chart2",
          "",
          res.data.x,
          [
            {name: '正确率', color: '', marker: {symbol: "circle"}, data: res.data.ypercent},
          ]
        );
      });
    },
    getQuestionInfo: function(user) {
      this.$get('/performance/question', {
        performanceId: this.id,
        userId: user,
      }).then(res => {

      })
    },
    drawLineChart(container, title, dataX, dataY) {
      const chart = highchart.chart(container, {
        chart: {
          type: "spline"
        },
        animation: {
          defer: "2000"
        },
        title: {
          text: title
        },
        xAxis: {
          categories: dataX
        },
        credits: {
          enabled: false
        },
        yAxis: {
          title: {
            text: "分数"
          },
          labels: {
            formatter: function() {
              return this.value;
            }
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        series: dataY
      });
    },
    clickCurrentDep: function(data) {
      if(data._id == this.currentDep._id) {
        return;
      } else {
        this.currentDep = data;
        this.clickCurrentUser(data.members[0])
      }
    },
    clickCurrentUser: function(data) {
      this.currentUser = data;
      this.getQuestionInfo(this.currentUser._id)
    }
  }
};
</script>

<style scoped>
.info {
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
.sub {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sub .sub-item {
  margin: 0px 20px;
}
.chart {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chart-item {
  width: 50%;
}
.department, .user {
  display: flex;
}
.department .dep-item, .user-item {
  margin: 0px 10px;
}
.user {
  margin-top: 10px;
}
</style>
