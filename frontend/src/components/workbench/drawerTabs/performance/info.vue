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
        <div class="sub-item sum">总分： {{sum}}</div>
      </div>
    </div>
    <div class="chart" id="chart"></div>
    <div class="user"></div>
    <div class="table"></div>
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
      id: this.$route.params.id,
      performance: {},
      aggregateData: [],
      sum: 0,
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
        this.aggregateData = res.data.aggregateData;
        this.sum = res.data.sum;
        this.drawLineChart(
          "chart",
          "",
          res.data.x,
          res.data.yAverage,
          res.data.ysumScore
        );
      });
    },
    drawLineChart(container, title, dataX, dataY1, dataY2) {
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
        series: [
          {
            name: "总分",
            color: "#f5222d",
            marker: {
              symbol: "circle"
            },
            data: dataY2
          },
          {
            name: "平均分",
            marker: {
              symbol: "circle"
            },
            data: dataY1
          }
        ]
      });
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
</style>
