<template>
  <div class="drawer">
    <a-drawer
      placement="right"
      width="600"
      :visible="drawerVisible"
      :body-style="{ paddingBottom: '80px' }"
      @close="closeDrawer"
    >
      <template slot="title" class="drawer-title">
        <span class="title-content" :title="currentEvent.title">{{ currentEvent.title }}</span>
        <div class="organizer">
          <span class="title-span">发布者:</span>
          <img class="title-img" :src="currentEvent.organizer.avator" alt="" />
          {{ currentEvent.organizer.userName }}
        </div>
        <div class="button-edit">
          <a-button-group>
            <a-button size="small" type="primary">完成</a-button>
            <a-button
              size="small"
              type="primary"
              :disabled="!currentEvent.isOwn"
              @click="openEdit"
              >编辑</a-button
            >
            <a-button size="small" type="danger" :disabled="currentEvent.isOwn"
              >拒绝</a-button
            >
          </a-button-group>
        </div>
      </template>
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
          <div
            class="field"
            v-if="currentEvent.handler && currentEvent.handler.length != 0"
          >
            <a-tooltip
              v-for="handler in currentEvent.handler"
              :key="handler._id"
            >
              <template slot="title">
                <div style="text-align: center">{{handler.user.userName}}</div>
                <div style="text-align: center">{{handler.isFinish? '已完成': '未完成'}}</div>
              </template>
              <img :src="handler.user.avator" alt="" />
            </a-tooltip>
          </div>
          <div class="field" v-else>
            <a-tag color="rgb(230, 36, 18)">暂未分配</a-tag>
          </div>
        </div>
        <div class="priority">
          <div class="icon"><a-icon type="warning" /> 优先级 :</div>
          <div class="field">
            <a-tag :color="currentEvent._priorityColor">{{
              currentEvent._priority
            }}</a-tag>
          </div>
        </div>
        <div class="type">
          <div class="icon"><a-icon type="share-alt" /> 类型 :</div>
          <div class="field">
            <a-tag :color="currentEvent._typeColor">{{
              currentEvent._type
            }}</a-tag>
          </div>
        </div>
        <div class="body">
          <div class="icon">
            <a-icon type="border" style="margin-top: 4px" /> 备注 :
          </div>
          <div class="body-field" v-html="currentEvent.remarkBody"></div>
        </div>
        <div class="comment">
          <div class="icon">
            <a-icon type="profile" style="margin-top: 4px" /> 记录 :
          </div>
          <div class="comment-field">
            <div
              class="comment-item"
              v-for="item in currentEvent.comment"
              :key="item._id"
            >
              <div class="name">{{ item.user.userName }}</div>
              <div class="action" v-if="item.action == 'create'">
                创建了此任务
              </div>
              <div class="action" v-else-if="item.action == 'update'">
                更新了此任务
              </div>
              <div class="action" v-else-if="item.action == 'finish'">
                完成了此任务
              </div>
              <div class="action" v-else-if="item.action == 'reject'">
                拒绝了此任务
              </div>
              <div class="time">
                {{ moment(item.time).format("YYYY-MM-DD HH:mm:ss") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "drawer",
  props: ["drawerVisible", "currentEvent"],
  data() {
    return {
      moment,
      visible: false
    };
  },
  methods: {
    // 关闭drawer
    closeDrawer: function() {
      this.$emit("closeDrawer", false);
    },
    openEdit: function() {
      this.$emit("editMission", true);
    }
  }
};
</script>

<style scoped>
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
  background-color: #f2f4f5;
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
  background-color: #f2f4f5;
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
.title-img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
}
.title-span {
  font-size: 12px;
  margin-left: 20px;
  margin-right: 5px;
}
.button-edit {
  float: right;
  margin-right: 30px;
}
.title-content {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  line-height: 29px;
}
.drawer-title {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
</style>
