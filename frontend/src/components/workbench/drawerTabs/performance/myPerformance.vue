<template>
  <div class="myPerformance">
    <div class="container">
      <div
        class="item"
        v-for="item in data"
        :key="item._id"
      >
        <div class="title" :class="{ outTime: item.outTime, inTime: !item.outTime }">
          <div class="title-text">{{ item.title }}</div>
          <div class="title-time">
            {{ moment(item.startTime).format("YYYY-MM-DD") }} —
            {{ moment(item.endTime).format("YYYY-MM-DD") }}
          </div>
        </div>
        <div class="sums">
          <div class="sums-item">
            <span class="sums-item-text">总题数：</span
            >{{ item.questionNumber }}
          </div>
          <div class="sums-item">
            <span class="sums-item-text">总分：</span>{{ item.scoreSum }}
          </div>
          <div class="sums-item">
            <span class="sums-item-text">参与部门：</span
            >{{ item.departmentNumber }}
          </div>
        </div>
        <div class="bottom">
          <div class="tags">
            <img v-if="!item.outTime" :src="ing" alt="" />
            <img v-if="item.outTime" :src="end" alt="" />
            <img v-if="item.isAnswerd" :src="pass" alt="" />
            <img v-if="!item.isAnswerd" :src="nopass" alt="" />
          </div>
          <div class="button">
            <a-button
              type="primary"
              size="small"
              :disabled="item.outTime"
              @click="toDetail(item)"
              v-if="!item.outTime && !item.isAnswerd && !item.isAdmin"
              >参加评测</a-button
            >
            <a-button
              type="primary"
              size="small"
              @click="toInfo(item)"
              v-else
              >查看详情</a-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=18116
import pass from "@/assets/pass.png";
import nopass from "@/assets/nopass.png";
import end from "@/assets/end.png";
import ing from "@/assets/ing.png";
import moment from "moment";
export default {
  name: "myPerformance",
  data() {
    return {
      moment,
      data: {},
      pass: pass,
      nopass: nopass,
      end: end,
      ing: ing
    };
  },
  mounted() {
    this.getMyPerformance();
  },
  methods: {
    getMyPerformance: function() {
      this.$get("/performance/mine").then(res => {
        this.data = res.data;
      });
    },
    toInfo: function(data) {
      this.$router.push({ name: "performance_info", params: { id: data._id } });
    },
    toDetail: function(data) {
      this.$router.push({
        name: "performance_detail",
        params: { id: data._id }
      });
    }
  }
};
</script>

<style scoped>
.myPerformance {
  height: 100%;
  overflow: hidden;
}
.container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
.container .item {
  float: left;
  margin: 10px 0.5%;
  width: 49%;
  height: 130px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.container .inTime:hover {
  border: 1px solid #1890ff;
}
.container .outTime {
  filter: grayscale(100%) !important;
  cursor: no-drop !important;
  color: grey !important;
}
.container .item .title {
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
}
.container .item .title .title-text {
  font-size: 20px;
  font-weight: 600;
}
.container .item .title .title-time {
  color: #444;
  font-size: 12px;
}
.container .item .sums {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  display: flex;
  text-align: center;
}
.container .item .sums .sums-item {
  flex: 1;
  text-align: right;
}
.container .item .bottom {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container .item .bottom .tags {
  display: flex;
  filter: grayscale(0) !important;
}
.container .item .bottom .tags img {
  display: block;
  height: 40px;
  width: 40px;
  margin-right: 10px;
}
.container .item .bottom button {
  margin-left: 20px;
}
</style>
