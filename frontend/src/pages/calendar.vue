<template>
  <div class="calendar">
    <div class="add" @click="openAddModal">
      <a-icon type="plus" />
    </div>
    <div class="btn-group">
      <a-calendar
        :fullscreen="false"
        v-model="defaultDate"
        @change="dateChange"
      >
        <template slot="headerRender">
          <div>
            <div class="calendar-header">
              <a-button
                class="header-item header-btn"
                size="small"
                :type="viewMode == 'timeGridDay' ? 'primary' : ''"
                @click="changeView('timeGridDay')"
                >日</a-button
              >
              <a-button
                class="header-item header-btn"
                size="small"
                :type="viewMode == 'timeGridWeek' ? 'primary' : ''"
                @click="changeView('timeGridWeek')"
                >周</a-button
              >
              <a-button
                class="header-item header-btn"
                size="small"
                :type="viewMode == 'dayGridMonth' ? 'primary' : ''"
                @click="changeView('dayGridMonth')"
                >月</a-button
              >
            </div>
            <div class="calendar-header">
              <div class="header-item header-time">{{ defaultDateFormat }}</div>
              <div class="header-item">
                <a-button type="link" @click="today"> today </a-button>
              </div>
              <div class="header-item">
                <div class="header-item-span">
                  <a-icon type="left" @click="jumpDate('prev')" />
                </div>
                <div class="header-item-span">
                  <a-icon type="right" @click="jumpDate('next')" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </a-calendar>
    </div>
    <FullCalendar
      ref="calendarRef"
      class="fullCalendar"
      :options="calendarOptions"
    />

    <!-- modal add or edit -->
    <a-modal
      title="新建任务"
      :visible="modalVisible"
      @ok="handleOk"
      @cancel="handleCancel"
      width="90%"
    >
      <div class="content">
        <div class="form flex-item">
          <a-form-model
            :model="missionForm"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 14, offset: 1 }"
          >
            <a-form-model-item label="标题">
              <a-input v-model="missionForm.title" />
            </a-form-model-item>
            <a-form-model-item label="开始/截止时间">
              <a-range-picker
                style="width: calc(100% - 80px);margin-right: 20px"
                format="YYYY-MM-DD HH:mm"
                v-model="missionForm.time"
                :show-time="{
                  minuteStep: 30,
                  hideDisabledOptions: true,
                  defaultValue: [
                    moment('09:00', 'HH:mm'),
                    moment('18:00', 'HH:mm')
                  ]
                }"
              />
              <a-checkbox v-model="missionForm.isAllDay">全天</a-checkbox>
            </a-form-model-item>
            <a-form-model-item label="优先级">
              <a-select v-model="missionForm.priority">
                <a-select-option
                  v-for="item in prioritys"
                  :key="item.name"
                  :value="item.val"
                >
                  <span
                    :style="{ 'background-color': item.color }"
                    class="option option-dot"
                  ></span>
                  <span
                    :style="{ color: item.color }"
                    class="option option-name"
                    >{{ item.name }}</span
                  >
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="类型">
              <a-select v-model="missionForm.type">
                <a-select-option
                  v-for="item in missionTypes"
                  :key="item.name"
                  :value="item.val"
                >
                  <span
                    :style="{ 'background-color': item.color }"
                    class="option option-dot"
                  ></span>
                  <span
                    :style="{ color: item.color }"
                    class="option option-name"
                    >{{ item.name }}</span
                  >
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="参与者">
              <a-select
                mode="multiple"
                show-search
                v-model="missionForm.handler"
                placeholder="搜索（姓名、昵称、邮箱、手机号）"
                :default-active-first-option="false"
                :show-arrow="false"
                :filter-option="false"
                :not-found-content="null"
                @search="handleSearch"
              >
                <a-select-option v-for="d in users" :value="d._id" :key="d._id">
                  {{ d.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div class="msg flex-item">
          <div style="margin-bottom: 10px">备注：</div>
          <editer
            :val="editerVal"
            mode="ir"
            ref="refEditer"
            v-model="missionForm.remark"
          />
        </div>
      </div>
    </a-modal>

    <!-- drawer -->
    <a-drawer
      placement="right"
      width="600"
      :visible="drawerVisible"
      :body-style="{ paddingBottom: '80px', 'z-dinex': '1000' }"
      @close="drawerVisible = false"
    >
      <template slot="title">{{ currentEvent.title }}</template>
      <div class="drawer-container">
        <div class="time">
          <div class="icon"><a-icon type="clock-circle" /> 时间 :</div>
          <div class="field">
            <div class="startTime">
              {{
                currentEvent.isAllDay
                  ? moment(currentEvent.startTime).format("YYYY-MM-DD")
                  : moment(currentEvent.startTime).format("YYYY-MM-DD HH:mm")
              }}
            </div>
            <div>~</div>
            <div class="endTime">
              {{
                currentEvent.isAllDay
                  ? moment(currentEvent.endTime).format("YYYY-MM-DD")
                  : moment(currentEvent.endTime).format("YYYY-MM-DD HH:mm")
              }}
            </div>
            <div class="isAllDay" v-if="currentEvent.isAllDay">
              <a-tooltip>
                <template slot="title">
                  全天
                </template>
                <a-icon type="fire" theme="twoTone" two-tone-color="#eb2f96" />
              </a-tooltip>
            </div>
          </div>
        </div>
        <div class="handler">
          <div class="icon"><a-icon type="user" /> 参与者 :</div>
          <div class="field" v-if="currentEvent.handler && currentEvent.handler.length!=0">
            <img
              v-for="handler in currentEvent.handler"
              :src="handler.user.avator"
              :key="handler._id"
              alt=""
            />
          </div>
          <div class="field" v-else>
            <a-tag color="rgb(230, 36, 18)">暂未分配</a-tag>
          </div>
        </div>
        <div class="priority">
          <div class="icon"><a-icon type="warning" /> 优先级 :</div>
          <div class="field">
            <a-tag :color='currentEvent.priorityColor'>{{currentEvent.priority}}</a-tag>
          </div>
        </div>
        <div class="type">
          <div class="icon"><a-icon type="share-alt" /> 类型 :</div>
          <div class="field">
            <a-tag :color='currentEvent.typeColor'>{{currentEvent.type}}</a-tag>
          </div>
        </div>
        <div class="body">
          <div class="icon"><a-icon type="border" style="margin-top: 4px"/> 备注 :</div>
          <div class="body-field" v-html="currentEvent.remarkBody">
          </div>
        </div>
        <div class="comment">
          <div class="icon"><a-icon type="profile" style="margin-top: 4px"/> 记录 :</div>
          <div class="comment-field">
            <div class="comment-item" v-for="item in currentEvent.comment" :key="item._id">
              <div class="name">{{item.user.userName}}</div>
              <div class="action" v-if="item.action == 'create'">创建了此任务</div>
              <div class="action" v-else-if="item.action == 'update'">更新了此任务</div>
              <div class="action" v-else-if="item.action == 'finish'">完成了此任务</div>
              <div class="time">{{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}}</div>
            </div>
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
// https://fullcalendar.io/docs/headerToolbar
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import editer from "../components/common/editer";
import VditorPreview from 'vditor/dist/method.min'  
import moment, { locale } from "moment";
import {
  missionType as missionTypes,
  priority as prioritys
} from "../lib/type";
export default {
  name: "calendar",
  data() {
    return {
      calendar: null,
      missionTypes,
      prioritys,
      moment,
      editerVal: " ",
      users: [],
      modalVisible: false,
      drawerVisible: false,
      missionForm: {
        isAllDay: false,
        priority: "3",
        type: "mission"
      },
      defaultDate: moment(),
      viewMode: "timeGridWeek",
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        initialView: "timeGridWeek",
        initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventChange: this.handleChange,
        eventDragStop: this.handleDragStop
      },
      currentEvent: {}
    };
  },
  components: {
    editer,
    FullCalendar
  },
  computed: {
    defaultDateFormat: function() {
      return moment(this.defaultDate).format("YYYY-MM-DD");
    }
  },
  mounted() {
    this.getMissions();
  },
  methods: {
    // 下拉框搜索
    handleSearch: function(value) {
      this.$get("/user/users", {
        options: {
          info: value
        }
      }).then(res => {
        this.users = res.data.users;
      });
    },
    // modal - cancel
    handleCancel: function() {
      this.missionForm = {
        isAllDay: false,
        priority: "3",
        type: "mission"
      };
      this.modalVisible = false;
      this.editerVal = new Date();
    },
    // modal- ok
    handleOk: function() {
      if (!this.missionForm.title) return this.$message.error("必须：标题");
      if (!this.missionForm.time || this.missionForm.time.length == 0)
        return this.$message.error("必须：时间");
      this.$post("/mission/create", this.missionForm).then(res => {
        if (res.status == 200) {
          res.data.isOwn = true;
          this.addEvent(res.data);
          this.$message.success("添加成功");
          this.handleCancel();
        }
      });
    },
    // 插入新event
    addEvent: function(e) {
      const calendarApi = this.$refs.calendarRef.getApi();
      if (!e.isOwn) {
        calendarApi.addEvent({
          id: e._id,
          title: e.title,
          start: e.startTime,
          end: e.endTime,
          allDay: e.isAllDay,
          extendedProps: e,
          constraint: "nowMine",
          backgroundColor: prioritys[e.priority - 1].color,
          borderColor: prioritys[e.priority - 1].color
        });
        calendarApi.addEvent({
          groupId: "nowMine",
          start: e.startTime,
          end: e.endTime,
          display: "background",
          backgroundColor: prioritys[e.priority - 1].color
        });
      } else {
        calendarApi.addEvent({
          id: e._id,
          title: e.title,
          start: e.startTime,
          end: e.endTime,
          allDay: e.isAllDay,
          extendedProps: e,
          backgroundColor: prioritys[e.priority - 1].color,
          borderColor: prioritys[e.priority - 1].color
        });
      }
    },
    // 获取所有mission
    getMissions: function() {
      this.$get("/mission/missions").then(res => {
        res.data.forEach(e => {
          this.addEvent(e);
        });
      });
    },
    // 打开新建model
    openAddModal: function() {
      this.modalVisible = true;
    },
    // 日历时间切换
    dateChange: function(date) {
      this.$refs.calendarRef.getApi().gotoDate(new Date(date));
    },
    // 切换视图显示单位
    changeView: function(mode) {
      this.viewMode = mode;
      this.$refs.calendarRef.getApi().changeView(
        mode,
        new Date(this.defaultDate)
      );
    },
    // 跳到今日
    today: function() {
      this.defaultDate = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
      this.$refs.calendarRef.getApi().today();
    },
    // 切换视图并跳到指定时间
    jumpDate: function(type) {
      if (type == "prev") {
        if (this.viewMode == "timeGridDay") {
          this.defaultDate = moment(this.defaultDate).add("-1", "days");
        } else if (this.viewMode == "timeGridWeek") {
          this.defaultDate = moment(this.defaultDate).add("-1", "week");
        } else if (this.viewMode == "dayGridMonth") {
          this.defaultDate = moment(this.defaultDate).add("-1", "month");
        }
        this.$refs.calendarRef.getApi().prev();
      } else {
        if (this.viewMode == "timeGridDay") {
          this.defaultDate = moment(this.defaultDate).add("+1", "days");
        } else if (this.viewMode == "timeGridWeek") {
          this.defaultDate = moment(this.defaultDate).add("+1", "week");
        } else if (this.viewMode == "dayGridMonth") {
          this.defaultDate = moment(this.defaultDate).add("+1", "month");
        }
        this.$refs.calendarRef.getApi().next();
      }
    },
    // 选择日期则弹出新增框
    handleDateSelect: function(selectInfo) {
      console.log(selectInfo);
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      this.missionForm.time = [selectInfo.startStr, selectInfo.endStr];
      this.missionForm.isAllDay = selectInfo.allDay;
      this.modalVisible = true;
    },
    // 点击事件
    handleEventClick: async function(clickInfo) {
      this.$get('/mission/missionById', {
        _id: clickInfo.event.id
      }).then(async res => {
        let body = '无备注'
        if(res.data.remark) {
          body = await VditorPreview.md2html(res.data.remark);
        }
        this.currentEvent = Object.assign(res.data, {
          priority: prioritys[res.data.priority - 1].name,
          priorityColor: prioritys[res.data.priority - 1].color,
          remarkBody: body
        });
        missionTypes.forEach(type => {
          if(type.val == res.data.type) {
            this.currentEvent.type = type.name,
            this.currentEvent.typeColor = type.color
          }
        })
        this.drawerVisible = true;
      })
      // if (
      //   confirm(
      //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
      //   )
      // ) {
      //   clickInfo.event.remove();
      // }
    },
    // 事件变更更新
    handleChange(info) {
      const newEvent = info.event;
      console.log(info)
      this.$put("/mission/update", {
        _id: newEvent.id,
        isAllDay: newEvent.allDay,
        startTime: moment(moment(newEvent.start).format("YYYY-MM-DD HH:mm:ss")),
        endTime: newEvent.end
          ? moment(moment(newEvent.end).format("YYYY-MM-DD HH:mm:ss"))
          : moment(moment(newEvent.start).format("YYYY-MM-DD HH:mm:ss"))
      }).then(res => {
        if (res.status == 200) {
          this.$message.success("更新成功");
        }
      });
    }
  }
};
</script>

<style scoped>
.calendar {
  font-family: 'Montserrat', sans-serif;
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
  transition: all 0.3s;
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
  z-index: 10;
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

.content {
  display: flex;
}
.flex-item {
  height: 100%;
  width: 50%;
  flex: 1 0 auto;
}
.option-dot {
  margin-right: 5px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.fullCalendar {
  width: 100%;
  height: 100%;
  color: #333;
}
.time,
.handler,
.priority,
.type {
  line-height: 40px;
  display: flex;
}
.drawer-container .icon {
  padding: 0px 10px;
  width: 90px;
  display: flex;
  float: left;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.drawer-container .isAllDay {
  margin-left: 10px;
  cursor: pointer;
}
.field {
  display: flex;
  flex: 1 0 auto;
  box-sizing: border-box;
  padding-left: 20px;
  align-items: center;
}
.body {
  display: flex;
  margin-top: 8px;
}
.body .icon {
  width: 90px;
  display: flex;
  align-items: flex-start;
}
.body-field {
  overflow-y: scroll;
  flex: 1;
  height: 400px;
  box-sizing: border-box;
  background-color:#f2f4f5;
  padding: 10px;
}
.comment {
  display: flex;
  margin-top: 8px;
}
.comment .icon {
  width: 90px;
  display: flex;
  align-items: flex-start;
}
.comment-field {
  overflow-y: scroll;
  flex: 1;
  height: 200px;
  box-sizing: border-box;
  background-color:#f2f4f5;
  padding: 10px;
}
.comment-field .comment-item {
  height: 40px;
  display: flex;
  line-height: 40px;
}
.comment-field .comment-item .name {
  padding-right: 20px;
}
.comment-field .comment-item .action {
  color: #000000;
  padding-right: 20px;
}
.drawer-container .handler img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 20px;
  cursor: pointer;
}
</style>
