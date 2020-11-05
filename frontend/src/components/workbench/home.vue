<template>
  <div class="home">
    <div class="chart-item">
      <div id="projectChart" class="item"></div>
    </div>
    <div class="chart-item">
      <div id="problemChart" class="item"></div>
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
import {getMissionType, getPriority, getStatusType} from '../../lib/type'
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
          color: getMissionType('bug', 'color'),
          y: 80,
        },
        {
          name: "需求",
          color: getMissionType('demand', 'color'),
          y: 20,
        },
        {
          name: "任务",
          color: getMissionType('mission', 'color'),
          y: 20,
        },
      ],
      priorityChartData: [
        {
          name: "十分紧急",
          color: getPriority(1, 'color'),
          y: 80,
        },
        {
          name: "紧急",
          color: getPriority(2, 'color'),
          y: 20,
        },
        {
          name: "普通",
          color: getPriority(3, 'color'),
          y: 20,
        },
        {
          name: "较低",
          color: getPriority(4, 'color'),
          y: 20,
        },
      ],
    };
  },
  mounted() {
    this.drawPieChart("projectChart", "项目概况", this.projectchartData);
    this.drawPieChart('problemChart', '类型概况', this.problemChartData);
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
.home .chart-item {
  flex: 1 0 auto;
  border-radius: 5px;
  min-width: 350px;
  margin: 1%;
  width: 30%;
  height: 48%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.16);
}
.chart-item .item {
  width: 100%;
  height: 100%;
}
</style>