<template>
  <div class="all">
    <a-table :columns="columns" :data-source="data">
      <template slot="action" slot-scope="text">
        <span @click="action(text, 1)" class="action red">
          <a-icon type="close"/>
        </span>
        <span @click="action(text, 2)" class="action green">
          <a-icon type="check"/>
        </span>
      </template>
      <template slot="priority" slot-scope="val, text">
        <a-tag :color="text.priorityColor">{{ text.priority }}</a-tag>
      </template>
      <template slot="type" slot-scope="val, text">
        <a-tag :color="text.typeColor">{{ text.type }}</a-tag>
      </template>
      <template slot="handler" slot-scope="text">
        <div class="handlers">
          <div class="handler" v-for="(hander) in text" :key="hander._id">
            <img :src="hander.user.avator" alt="" />
          </div>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import moment from "moment";
import { getMissionType, getPriority, getStatusType } from "../../../lib/type";
export default {
  name: "all",
  props: ["activeTab"],
  data() {
    return {
      columns: [
        {
          title: "操作",
          dataIndex: "_id",
          scopedSlots: { customRender: "action" }
        },
        {
          title: "名称",
          dataIndex: "title",
          key: "title"
        },
        {
          title: "发布者",
          dataIndex: "organizer",
          key: "organizer"
        },
        {
          title: "时间",
          dataIndex: "time"
        },
        {
          title: "优先级",
          dataIndex: "priority",
          scopedSlots: { customRender: "priority" }
        },
        {
          title: "类型",
          dataIndex: "type",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "参与者",
          dataIndex: "handler",
          scopedSlots: { customRender: "handler" }
        }
      ],
      data: []
    };
  },
  created() {
    this.getInfos();
  },
  watch: {
    activeTab: function() {
      if (this.activeTab == 1) {
        this.getInfos();
      }
    }
  },
  methods: {
    getInfos: function() {
      this.$get("/mission/missions").then(res => {
        this.data = res.data.map(item => {
          item.time = `${moment(item.startTime).format(
            "MM-DD HH:mm"
          )} - ${moment(item.endTime).format("MM-DD HH:mm")}`;
          item.priorityColor = getPriority(item.priority, "color");
          item.priority = getPriority(item.priority, "name");
          item.typeColor = getMissionType(item.type, "color");
          item.type = getMissionType(item.type, "name");
          item.organizer = item.organizer.name;
          return item;
        });
        console.log(this.data);
      });
    },
    action: function(data) {
      console.log(data);
    }
  }
};
</script>

<style scoped>
.handlers {
  display: flex;
}
.handlers .handler {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  overflow: hidden;
}
.handlers .handler img {
  height: inherit;
  width: inherit;
}
.action {
  cursor: pointer;
  user-select: none;
  padding: 2px;
  display: inline-block;
  text-align: center;
  border-radius: 4px;
  line-height: 20px;
  height: 24px;
  width: 24px;
  transition: all 0.3s;
}
.red {
  color: #f5222d;
  border: 1px solid #f5222d;
  margin-right: 10px;
}
.red:hover {
  background-color: #f5222d;
  color: #ffffff;
}
.green:hover {
  background-color: #52c41a;
  color: #ffffff;
}
.green {
  color: #52c41a;
  border: 1px solid #52c41a;
}
</style>
