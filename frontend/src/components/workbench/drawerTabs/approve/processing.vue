<template>
  <div class="processing">
    <div class="list" v-if='data.length'>
      <div class="item" v-for="item in data" :key="item._id">
        <div class="top">
          <div class="item-type">
            {{ item._type }}
            <span class="sub" v-if="item.type =='qingjia'">({{item._type_}})</span>
          </div>
          <div class="item-process">
            <div
              class="process"
              :class="{
                'pass': item.agree.approve.user && item.agree.approve.isAgree,
                'reject': item.agree.approve.user && !item.agree.approve.isAgree
              }"
              v-if="item.approvers && item.approvers.length != 0"
            >1</div>
            <div
              class="process" 
              :class="{
                'pass': item.agree.key && item.agree.key.user && item.agree.key.isAgree,
                'reject': item.agree.key && item.agree.key.user && !item.agree.key.isAgree
              }"
              v-if="item.keys && item.keys.length != 0"
            >2</div>
            <div 
              class="process"
              :class="{'pass': item.status == 'passed'}"
              v-if="item.cc && item.cc.length != 0"
            >cc</div>
          </div>
          <div class="item-status" v-if="item.disabled">
            <a-tag color='#595959' size='large'>已撤销</a-tag>
          </div>
          <div class="item-status" v-else>
            <a-tag color='#FF4D4F' @click="setStatus(item._id)"  v-if="item.status == 'posted'">撤销</a-tag>
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
    <div class="processing" v-else>
      <div class="list-empty">
        <a-empty description="你还没有提交过审批"></a-empty>
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
      this.$post('/approve/status',{
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
  width: 100px;
  text-align: left;
}
.item .top .item-type .sub {
  font-weight: normal;
  font-size: 12px;
  color: #722ed1;
}
.item .top .item-process {
  height: inherit;
  display: flex;
}
.item .top .item-process .process {
  width: 26px;
  height: inherit;
  text-align: center;
  line-height: 26px;
  margin: 0px 10px;
  border-radius: 50%;
  background-color: #bfbfbf;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
}
.item .top .item-process .pass {
  background-color: #73d13d;
}
.item .top .item-process .reject {
  background-color: #f5222d;
}
.item .top .item-status {
  width: 120px;
  display: flex;
  justify-content: flex-end;
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
