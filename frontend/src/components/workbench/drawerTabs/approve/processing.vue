<template>
  <div class="processing">
    <div class="item" v-for="item in data" :key="item._id">
      <div class="top">
        <div class="item-type">
          {{ item._type }}
          <span class="sub" v-if="item.type =='qingjia'">({{item._type_}})</span>
        </div>
        <div class="item-status">
        </div>
        <div class="item-status" v-if="item.disabled">
          <a-tag color='#595959' size='large'>已撤销</a-tag>
        </div>
        <div class="item-status" v-else>
          <a-tag color='#FF4D4F' @click="setStatus(item._id)">撤销</a-tag>
          <a-tag :color='statusType[item.status].color'>{{ statusType[item.status].title }}</a-tag>
        </div>
      </div>
      <div class="content">
        <div class="item-time" v-if="item.type == 'qingjia' || item.type == 'jiaban' || item.type == 'waichu' || item.type == 'zhuanzheng'">
          <div class="title">时间：</div>
          <div class="item-time-start">
            <span class="startDate">{{item._startDate}}</span>
            <span class="startTime" v-if="item.type != 'zhuanzheng'">{{item._startTime}}</span>
          </div>
          <span class="dot"> ~ </span>
          <div class="item-time-end">
            <span class="endDate">{{item._endDate}}</span>
            <span class="endTime" v-if="item.type != 'zhuanzheng'">{{item._endTime}}</span>
          </div>
        </div>
        <div class="item-caigou" v-if="item.type == 'caigou'">
          <div class="key item-info-name">
            <span class="title">名称：</span>
            {{item.extra.name}}
          </div>
          <div class="key item-info-price">
            <span class="title">价格：</span>
            {{item.extra.price}} 元
          </div>
          <div class="key item-info-number">
            <div class="title">数量：</div>
            {{item.extra.number}}
            </div>
          <div class="key item-info-link">
            <span class="title">链接：</span>
            <a :href="item.extra.link" target="_black">链接</a>
          </div>
        </div>
        <div class="item-zhaopin" v-if="item.type == 'zhaopin'">
          <div class="key item-info-department">
            <div class="title">部门：</div>
            {{item.extra.department? item.extra.department.name : ''}}
          </div>
          <div class="key item-info-job">
            <div class="title">职位：</div>
            {{item.extra.job}}
          </div>
          <div class="key item-info-number">
            <div class="title">人数：</div>
            {{item.extra.number}}
          </div>
        </div>
        <div class="item-notice">
          <div class="title">备注：</div>
          {{item.notice || '无备注'}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { getLeaveType } from '@/lib/type'
import { getApproveType, statusType } from "./tabs";
export default {
  name: "processing",
  props: ["activeTab"],
  data() {
    return {
      data: [],
      statusType: statusType
    };
  },
  watch: {
    activeTab: function() {
      if (this.activeTab == 3) {
        this.getApprovers();
      }
    }
  },
  mounted(){
    this.getApprovers();
  },
  methods: {
    getApprovers: function() {
      this.$get('/approve/posts').then(res => {
        const data = res.data.map(item => {
          item._type_ = getLeaveType(item.extra.type);
          item._type = getApproveType(item.type);
          item._startDate = moment(item.extra.startDate).format('YYYY-MM-DD');
          item._endDate = moment(item.extra.endDate).format('YYYY-MM-DD');
          item._startTime = moment(item.extra.startTime).format('HH:mm');
          item._endTime = moment(item.extra.endTime).format('HH:mm');
          return item;
        });
        this.data = data
      })
    },
    setStatus: function(id) {
      this.$put('/approve/status',{
        status: 'disabled',
        id: id
      }).then(res => {
        if(res.status == 200 ) {
          this.$message.success('撤销成功');
          this.getApprovers();
        }
      })
    }
  }
};
</script>

<style scoped>
.processing{
  height: 100%;
  width: 100%;
}
.item {
  border: 1px solid #eee;
  margin-bottom: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
}
.item .top {
  height: 26px;
  line-height: 26px;
  display: flex;
  box-sizing: content-box;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
.item .top .item-type {
  font-size: 20px;
  font-weight: bold;
}
.item .top .sub {
  font-weight: normal;
  font-size: 12px;
  color: #722ed1;
}
.title {
  display: inline;
  color: #333;
  font-weight: 500;
}
.dot {
  display: inline-block;
  text-align: center;
  padding: 0px 10px;
}
.item .content {
  padding: 0px 10px;
}
.item .content .item-time {
  height: 24px;
  display: flex;
}
</style>
