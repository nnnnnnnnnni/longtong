<template>
  <div class="home">
    <div class="news">
      <div class="news-header">与我相关</div>
      <div class="news-content">
        <div class="middle" v-if="newsData.length == 0">
          <a-empty></a-empty>
        </div>
      </div>
    </div>
    <div class="chart-item">
      <div id="projectChart" class="item"></div>
    </div>
    <div class="chart-item">
      <div id="problemChart" class="item"></div>
    </div>
    <div class="chart-item">
      <div id="typeChart" class="item"></div>
    </div>
    <div class="chart-item">
      <div id="priorityChart" class="item"></div>
    </div>
    <div class="chart-item">
      <div id="typeTrendChart" class="item"></div>
    </div>
  </div>
</template>

<script>
import * as utils from '../../lib/utils'
import highchart from "highcharts";
export default {
  name: "home",
  data() {
    return {
      newsData: [],
      projectchartData: [
        {
          name: "Chrome",
          y: 80,
        },
        {
          name: "Internet Explorer",
          y: 20,
        },
        {
          name: "Internet Explorer",
          y: 20,
        },
      ],
      problemChartData: [
        {
          name: "BUG",
          y: 80,
        },
        {
          name: "需求",
          y: 20,
        },
        {
          name: "任务",
          y: 20,
        },
      ],
      typeChartData: [
        {
          name: "待分配",
          y: 20,
        },
        {
          name: "进行中",
          y: 80,
        },
        {
          name: "待开始",
          y: 20,
        },
        {
          name: "已完成",
          y: 20,
        },
        {
          name: "已关闭",
          y: 20,
        },
        {
          name: "已逾期",
          y: 20,
        },
      ],
      priorityChartData: [
        {
          name: "十分紧急",
          color: 'rgb(230, 36, 18)',
          y: 80,
        },
        {
          name: "紧急",
          color: 'rgb(250, 140, 21)',
          y: 20,
        },
        {
          name: "普通",
          color: 'rgb(27, 154, 238)',
          y: 20,
        },
        {
          name: "较低",
          color: 'rgb(140, 140, 140)',
          y: 20,
        },
      ],
    };
  },
  mounted() {
    this.drawPieChart("projectChart", "项目概况", this.projectchartData);
    this.drawPieChart('problemChart', '类型概况', this.problemChartData);
    this.drawPieChart('typeChart', '状态概况', this.typeChartData);
    this.drawPieChart('priorityChart', '优先级概况', this.priorityChartData);
    this.drawLineChart('typeTrendChart', '类型趋势')
  },
  methods: {
    drawPieChart: function (container, title, data) {
      highchart.chart(container, {
        chart: {
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: title,
          align: "center",
        },
        tooltip: {
          headerFormat: "<br>",
          pointFormat: "{point.name}<br/>{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            allowPointSelect: false,
            cursor: "pointer",
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
          },
        },
        series: [
          {
            name: "占比",
            data: data,
          },
        ],
      });
    },
    drawLineChart(container, title, dataX, dataY) {
      const chart = highchart.chart(container, {
        chart: {
          type: 'spline'
        },
        animation: {
          defer: '2000'
        },
        title: {
          text: title
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        credits: {
          enabled: false
        },
        yAxis: {
          title: {
              text: '数量'
          },
          labels: {
            formatter: function () {
              return this.value;
            }
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        series: [{
          name: 'Tokyo',
          marker: {
            symbol: 'circle'
          },
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 23.3, 18.3, 1.9, 9.6, 9.6, 9.6]
        }, {
          name: 'London',
          marker: {
            symbol: 'circle'
          },
          data: [4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    })
    },
  },
};
</script>


<style scoped>
.home {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-content: flex-start;
  overflow-y: auto;
  flex-wrap: wrap;
}
.home .news {
  width: 100%;
  height: 34%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 5px;
}
.news .news-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  user-select: none;
  line-height: 20px;
  box-sizing: border-box;
  padding-left: 1%;
  font-size: 16px;
}
.news .news-content {
  height: calc(100% - 40px);
  width: 99%;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
}
.home .chart-item {
  flex: 1 0 auto;
  border-radius: 5px;
  min-width: 350px;
  margin: 1%;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%;
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.16);
}
.chart-item .item {
  width: 100%;
  height: 100%;
}
.middle {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>