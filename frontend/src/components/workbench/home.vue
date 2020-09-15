<template>
  <div class="home">
    <div class="chart-item">
      <div id="projectChart"></div>
    </div>
  </div>
</template>

<script>
import highchart from "highcharts";
export default {
  name: "home",
  data() {
    return {
      projectChatData: [
        {
          name: "Chrome",
          data: 80,
          y: 80,
        },
        {
          name: "Internet Explorer",
          data: 20,
          y: 20,
        },
      ],
    };
  },
  mounted() {
    highchart.chart("projectChart", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "项目概况",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%, {ponit.data}</b>",
      },
      credits: {
        enabled: false
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          name: "占比",
          data: this.projectChatData,
        },
      ],
    });
  },
};
</script>


<style scoped>
.home {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>