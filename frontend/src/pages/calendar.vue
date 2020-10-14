<template>
  <div class="calendar">
    <div class="add" @click="openAddModal">
      <a-icon type="plus" />
    </div>
    <div class="btn-group">
      <a-calendar :fullscreen="false" v-model="defaultDate">
        <template slot="headerRender">
          <div>
            <div class="calendar-header">
              <a-button class="header-item header-btn" size='small' :type="calendar_settings.view_type == 'day'? 'primary':''" @click="changeView('day')">日</a-button>
              <a-button class="header-item header-btn" size='small' :type="calendar_settings.view_type == 'week'? 'primary':''" @click="changeView('week')">周</a-button>
            </div>
            <div class="calendar-header">
              <div class="header-item header-time">{{ defaultDateFormat }}</div>
              <div class="header-item">
                <a-button type="link" @click="today"> today </a-button>
              </div>
              <div class="header-item">
                <div class="header-item-span">
                  <a-icon type="left" />
                </div>
                <div class="header-item-span">
                  <a-icon type="right" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </a-calendar>
    </div>
    <Kalendar class="kalendar" :configuration="_calendar_settings" :events.sync="calendar_events" />

    <!-- modal add or edit -->
    <a-modal :title="openType== 1? '新建': '编辑'" :visible="visible" @ok="handleOk" @cancel="handleCancel" width='90%'>
      <div class="content">
        <div class="form flex-item">
          <a-form-model :model="missionForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 14,offset: 1 }">
            <a-form-model-item label="标题">
              <a-input v-model="missionForm.title" />
            </a-form-model-item>
            <a-form-model-item label="开始/截止时间">
              <a-range-picker 
                style="width: calc(100% - 80px);margin-right: 20px" 
                format="YYYY-MM-DD HH:mm"
                v-model="missionForm.time" 
                :show-time="{
                  hideDisabledOptions: true,
                  defaultValue: [moment('09:00', 'HH:mm'), moment('18:00', 'HH:mm')]}"
              />
              <a-checkbox @change="changeAllDay">全天</a-checkbox>
            </a-form-model-item>
            <a-form-model-item label="优先级">
              <a-select v-model="missionForm.priority">
                <a-select-option v-for="item in prioritys" :key="item.name" :value="item.val">
                  <span :style="{'background-color': item.color}" class="option option-dot"></span>
                  <span :style="{'color': item.color}" class="option option-name">{{item.name}}</span>
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="类型">
              <a-select v-model="missionForm.type">
                <a-select-option v-for="item in missionTypes" :key="item.name" :value="item.val">
                  <span :style="{'background-color': item.color}" class="option option-dot"></span>
                  <span :style="{'color': item.color}" class="option option-name">{{item.name}}</span>
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label='参与者'>
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
            <editer :val='editerVal' mode='ir' ref='refEditer' v-model="missionForm.remark" />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { Kalendar } from 'kalendar-vue'
import editer from '../components/common/editer';
import moment, { locale } from "moment";
import "moment/locale/zh-cn";
locale("zh-cn", {
  weekdaysMin: ["日", "一", "二", "三", "四", "五", "六"]
});
import { missionType as missionTypes, priority as prioritys } from '../lib/type'
export default {
  name: "calendar",
  data() {
    return {
      missionTypes,
      prioritys,
      moment,
      editerVal: ' ',
      users: [],
      openType: 1,
      visible: false,
      calendar_events: [],
      calendar_settings: {
        view_type: 'week',
        style: 'material_design',
        cell_height: 15,
        scrollToNow: true,
        read_only: false,
        current_day: new Date().toISOString(),
        day_starts_at: 0,
        day_ends_at: 24,
        overlap: true,
        hide_dates: [], // Spooky
        hide_days: [],
        past_event_creation: true
      },
      kalendarKey: '',
      missionForm: {
        isAllDay: false,
        priority: '4',
        type: 'mission'
      },
      defaultDate: '',
    };
  },
  components: {
    editer,
    Kalendar
  },
  computed: {
    defaultDateFormat: function() {
      return moment(this.defaultDate).format("YYYY-MM-DD");
    },
    _calendar_settings: {
      get() {
        return this.calendar_settings;
      },
      set(value) {
        console.log('New se=====t:', value);
        this.calendar_settings.view_type = value;
      },
    },
  },
  watch: {
    calendar_settings: {
        handler(newValue) {
            this.kalendarKey = new Date().valueOf();
        },
        deep: true,
    },
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
    // 切换是否全天
    changeAllDay: function(value) {
      this.missionForm.isAllDay = value.target.checked;
    },
    // modal - cancel
    handleCancel: function() {
      this.visible=  false;
      this.editerVal = new Date();
    },
    // modal- ok
    handleOk: function() {
      if(!this.missionForm.title) return this.$message.error('必须：标题');
      if(!this.missionForm.time || this.missionForm.time.length == 0) return this.$message.error('必须：时间');
      this.$post('/mission/create', this.missionForm).then(res=> {
        if(res.status == 200) {
          this.missionForm = {
            isAllDay: false,
            priority: '4',
            type: 'mission',
          }
          this.$message.success('添加成功');
          this.handleCancel();
        }
      })
    },
    // 获取所有mission
    getMissions: function() {
      this.$get('/mission/missions').then(res=> {
        this.calendar_events = res.data.map(item => {
          return Object.assign({}, {
            key: item._id,
            kalendar_id: item._id,
            data: item,
            start_time: item.startTime,
            end_time: item.endTime
          })
        });
      })
    },
    // 打开新建model
    openAddModal: function(){
      this.openType = 1;
      this.visible = true;
    },
    // 切换视图显示单位
    changeView: function(mode) {
      this._calendar_settings = mode
    },
    // 改变时间选择框
    onChange: function(date) {
      this.calendar.setDate(new Date(moment(date)));
    },
    // 跳到今日
    today: function() {
      this.defaultDate = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
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
  width: 40%;
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

.content{
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
.kalendar{
  width: 100%;
  height: 100%;
  overflow: scroll;
}
</style>
