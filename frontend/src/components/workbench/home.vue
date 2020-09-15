<template>
  <div class="home">
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
  </div>
</template>

<script>
import highchart from "highcharts";
export default {
  name: "home",
  data() {
    return {
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
    this.drawChart("projectChart", "项目概况", this.projectchartData);
    this.drawChart('problemChart', '类型概况', this.problemChartData);
    this.drawChart('typeChart', '状态概况', this.typeChartData);
    this.drawChart('priorityChart', '优先级概况', this.priorityChartData);
  },
  methods: {
    drawChart: function (container, title, data) {
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
  },
};
</script>


<style scoped>
.home {
  padding-top: 20px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  overflow-y: auto;
  flex-wrap: wrap;
}
.home .chart-item {
  min-width: 350px;
  margin: 5px;
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.16);
}
.chart-item .item {
  width: 100%;
  height: 100%;
}
</style>