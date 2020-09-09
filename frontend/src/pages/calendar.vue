<template>
  <div class="calendar">
    <div class="add">
      <a-icon type="plus" />
    </div>
    <div class="btn-group">
      <a-button-group>
        <a-button size='small' @click="changeView('day')">日</a-button>
        <a-button size='small' @click="changeView('week')">周</a-button>
        <a-button size='small' @click="changeView('month')">月</a-button>
      </a-button-group>
      <a-button-group>
        <a-button size='small' icon="arrow-left" @click="changeShow('prev')"></a-button>
        <a-date-picker
          size='small'
          v-model="defaultDate"
          :allowClear="false"
          v-if="defaultView == 'day'"
          placeholder="Select day"
          @change="onChange"
        />
        <a-week-picker
          size='small'
          v-model="defaultDate"
          :allowClear="false"
          v-if="defaultView == 'week'"
          placeholder="Select week"
          @change="onChange"
        />
        <a-month-picker
          size='small'
          v-model="defaultDate"
          :allowClear="false"
          v-if="defaultView == 'month'"
          placeholder="Select month"
          @change="onChange"
        />
        <a-button size='small' icon="arrow-right" @click="changeShow('next')"></a-button>
      </a-button-group>
    </div>
    <div id="calendar" style="height: 100%; width: 100%"></div>
  </div>
</template>

<script>
// https://nhn.github.io/tui.calendar/latest/Calendar
import { themeConfig } from "../lib/calendar";
import moment from "moment";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import Calendar from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import { fail } from 'assert';
export default {
  name: "calendar",
  data() {
    return {
      moment,
      calendar: null,
      defaultView: "week",
      defaultDate: moment(new Date(), "YYYY-MM-DD HH:mm:ss"),
      schedules: [
        {
          id: "1",
          calendarId: "1",
          title: "my schedule",
          category: "allday",
          dueDateClass: "",
          start: "2020-09-05T22:30:00+09:00",
          end: "2020-09-08T12:30:00+09:00",
        },
        {
          id: "2",
          calendarId: "2",
          title: "second schedule",
          category: "allday",
          dueDateClass: "",
          start: "2020-09-07T16:30:00+09:00",
          end: "2020-09-08T22:31:00+09:00",
        },
        {
          id: "3",
          calendarId: "3",
          title: "second schedule",
          category: "time",
          dueDateClass: "",
          start: "2020-09-07T16:30:00+09:00",
          end: "2020-09-07T22:31:00+09:00",
        },
        {
          id: "4",
          calendarId: "4",
          title: "second schedule",
          category: "time",
          dueDateClass: "",
          start: "2020-09-07T18:30:00+09:00",
          end: "2020-09-07T22:31:00+09:00",
        },
      ],
    };
  },
  mounted() {
    // 初始化日历组件
    this.calendar = new Calendar("#calendar", {
      defaultView: this.defaultView,
      taskView: false, // Can be also ['milestone', 'task']
      scheduleView: true, // Can be also ['allday', 'time']
      template: {},
      theme: this.themeConfig,
      useCreationPopup: true,
      useDetailPopup: false,
      month: {
        daynames: ["日", "一", "二", "三", "四", "五", "六"],
        startDayOfWeek: 0,
        narrowWeekend: true,
      },
      week: {
        daynames: ["日", "一", "二", "三", "四", "五", "六"],
        startDayOfWeek: 0,
        narrowWeekend: true,
      },
    });
    // 注册 活动
    this.calendar.createSchedules(this.schedules, false);
    // 设置活动颜色
    // this.calendar.setCalendarColor("1", {
    //   color: "#e8e8e8",
    //   bgColor: "#585858",
    //   borderColor: "#a1b56c",
    //   dragBgColor: "#585858",
    // });
    // 点击日程
    this.calendar.on("clickSchedule", (event) => {
      console.log(event.schedule);
    });
    // 拖动修改
    this.calendar.on("beforeUpdateSchedule", (event) => {
      var schedule = event.schedule;
      var changes = event.changes;

      this.calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
      console.log(event);
    });
  },
  methods: {
    // 切换视图显示单位
    changeView: function (mode) {
      this.defaultView = mode;
      this.calendar.changeView(mode, true);
    },
    // 切换显示日期
    changeShow: function (type) {
      if (type == "prev") {
        if (this.defaultView == "day") {
          this.defaultDate = moment(this.defaultDate).add("-1", "days");
        } else if (this.defaultView == "week") {
          this.defaultDate = moment(this.defaultDate).add("-1", "week");
        } else if (this.defaultView == "month") {
          this.defaultDate = moment(this.defaultDate).add("-1", "month");
        }
        this.calendar.prev();
      } else {
        if (this.defaultView == "day") {
          this.defaultDate = moment(this.defaultDate).add("+1", "days");
        } else if (this.defaultView == "week") {
          this.defaultDate = moment(this.defaultDate).add("+1", "week");
        } else if (this.defaultView == "month") {
          this.defaultDate = moment(this.defaultDate).add("+1", "month");
        }
        this.calendar.next();
      }
    },
    // 改变时间选择框
    onChange: function (date) {
      console.log(this.defaultDate);
      this.calendar.setDate(new Date(moment(date)));
    },
  },
};
</script>


<style scoped>
.calendar {
  height: 100%;
  width: 100%;
}
.btn-group {
  position: absolute;
  z-index: 9999;
  top: 0px;
  height: 60px;
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.add {
  position: absolute;
  bottom: 60px;
  right: 60px;
  background-color: rgb(24,144,255);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 26px;
  cursor: pointer;
  transition: all 0.3s;
}
.add:hover {
  transform: rotate(120deg);
}
</style>