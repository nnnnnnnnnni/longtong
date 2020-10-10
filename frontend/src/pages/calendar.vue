<template>
  <div class="calendar">
    <div class="add" @click="openAddModal">
      <a-icon type="plus" />
    </div>
    <div class="btn-group">
      <a-calendar :fullscreen="false" v-model="defaultDate" @change="onChange">
        <template slot="headerRender">
          <div>
            <div class="calendar-header">
              <a-button class="header-item header-btn" size='small' :type="defaultView == 'day'? 'primary' : ''" @click="changeView('day')">日</a-button>
              <a-button class="header-item header-btn" size='small' :type="defaultView == 'week'? 'primary' : ''" @click="changeView('week')">周</a-button>
              <a-button class="header-item header-btn" size='small' :type="defaultView == 'month'? 'primary' : ''" @click="changeView('month')">月</a-button>
            </div>
            <div class="calendar-header">
              <div class="header-item header-time">{{ defaultDateFormat }}</div>
              <div class="header-item">
                <a-button type="link" @click="today"> today </a-button>
              </div>
              <div class="header-item">
                <div class="header-item-span">
                  <a-icon type="left" @click="changeShow('prev')" />
                </div>
                <div class="header-item-span">
                  <a-icon type="right" @click="changeShow('next')" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </a-calendar>
    </div>
    <div id="calendar" style="height: 100%; flex: 1"></div>

    <!-- modal add or edit -->
    <a-modal :title="openType== 1? '新建': '编辑'" :visible="visible" @ok="handleOk" @cancel="visible = false" width='60%'>
      <div class="content">
        <div class="form flex-item">
          <a-form-model :model="missionForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 14,offset: 1 }">
            <a-form-model-item label="标题">
              <a-input v-model="missionForm.title" />
            </a-form-model-item>
            <a-form-model-item label="开始-截止时间">
              <a-range-picker 
                style="width: calc(100% - 80px);margin-right: 20px" 
                format="YYYY-MM-DD HH:mm:ss" 
                v-model="missionForm.time" 
                :show-time="{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],}"
              />
              <a-checkbox style="width: 50px" @change="changeAllDay">全天</a-checkbox>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div class="msg flex-item"></div>
      </div>
    </a-modal>
  </div>
</template>

<script>
// https://nhn.github.io/tui.calendar/latest/Calendar
import { themeConfig } from "../lib/calendar";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn", {
  weekdaysMin: ["日", "一", "二", "三", "四", "五", "六"]
});
import Calendar from "tui-calendar";
import "../assets/calendar.css";
export default {
  name: "calendar",
  data() {
    return {
      moment,
      openType: 1,
      visible: true,
      calendar: null,
      missionForm: {
        isAllDay: false,
      },
      defaultView: "week",
      defaultDate: moment(new Date(), "YYYY-MM-DD HH:mm:ss"),
      schedules: [
        {  id: "1",  calendarId: "1",  title: "my schedule1",  body: 'asdasdasdasdasd',  category: "allday",  dueDateClass: "",  start: "2020-10-05T22:30:00+09:00",  end: "2020-10-08T12:30:00+09:00" },
        { id: "2", calendarId: "2", title: "second schedule11", category: "allday", dueDateClass: "", start: "2020-10-07T16:30:00+09:00", end: "2020-10-08T22:31:00+09:00" },
        { id: "3", calendarId: "3", title: "second schedule111", category: "time", dueDateClass: "", start: "2020-10-07T16:30:00+09:00", end: "2020-10-07T22:31:00+09:00" },
        { id: "4", calendarId: "4", title: "second schedule1111", category: "time", body: 'asdasdasdasdasd', dueDateClass: "", start: "2020-10-07T18:30:00+09:00", end: "2020-10-07T22:31:00+09:00" }
      ]
    };
  },
  computed: {
    defaultDateFormat: function() {
      return moment(this.defaultDate).format("YYYY-MM-DD");
    }
  },
  created() {
    window.addEventListener("resize", () => {
      this.calendar.render();
    });
  },
  mounted() {
    // 初始化日历组件
    this.calendar = new Calendar("#calendar", {
      defaultView: this.defaultView,
      taskView: false, // Can be also ['milestone', 'task']
      scheduleView: true, // Can be also ['allday', 'time']
      template: {},
      theme: this.themeConfig,
      useCreationPopup: false,
      useDetailPopup: false,
      month: {
        daynames: ["日", "一", "二", "三", "四", "五", "六"],
        startDayOfWeek: 1,
        narrowWeekend: true
      },
      week: {
        daynames: ["日", "一", "二", "三", "四", "五", "六"],
        startDayOfWeek: 1,
        narrowWeekend: true
      },
    });
    // 注册 活动
    this.calendar.createSchedules(this.schedules, false);
    // 点击日程
    this.calendar.on("clickSchedule", event => {
      console.log(event.schedule);
    });
    // 拖动修改
    this.calendar.on("beforeUpdateSchedule", event => {
      var schedule = event.schedule;
      var changes = event.changes;

      this.calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
    });
  },
  methods: {
    // 切换是否全天
    changeAllDay: function(value) {
      this.missionForm.isAllDay = value.target.checked;
    },
    // modal- ok
    handleOk: function() {

    },
    // 打开新建model
    openAddModal: function(){
      this.openType = 1;
      this.visible = true;
    },
    // 切换视图显示单位
    changeView: function(mode) {
      this.defaultView = mode;
      this.calendar.changeView(mode, true);
    },
    // 切换显示日期
    changeShow: function(type) {
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
    onChange: function(date) {
      this.calendar.setDate(new Date(moment(date)));
    },
    // 跳到今日
    today: function() {
      this.defaultDate = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
      this.calendar.setDate(new Date(moment(new Date())));
    }
  }
};
</script>

<style scoped>
.calendar {
  height: 100%;
  width: 100%;
  display: flex;
  user-select: none;
}
.btn-group {
  height: 100%;
  width: 299px;
  border-right: 1px solid #e3e3e3;
}
.calendar-header {
  line-height: 35px;
  height: 35px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.calendar-header .header-item {
  text-align: center;
}
.header-item .header-item-span {
  text-align: center;
  margin: 0 10px;
  cursor: pointer;
  display: inline-block;
}
.calendar-header .header-btn {
  width: 25%;
}
.calendar-header .header-time {
  font-size: 16px;
  font-weight: 600;
}
.add {
  position: absolute;
  bottom: 60px;
  left: 125px;
  background-color: rgb(24, 144, 255);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 26px;
  cursor: pointer;
  transition: all 0.3s;
}
.add:hover {
  transform: rotate(90deg);
}

.content{
  display: flex;
}
.flex-item {
  height: 100%;
  width: 50%;
  flex: 1 0 auto;
}
</style>
