<template>
  <div class="chatlist">
    <div class="filter-input-container">
      <div class="filter-input">
        <a-input placeholder="输入即搜索" v-model="filterVal"></a-input>
      </div>
      <div class="filter-btn">
        <a-button icon="search" type="primary"></a-button>
      </div>
    </div>
    <div class="user-container">
      <div class="user-item" v-for="item in dataListFilter" :key="item._id">
        <div class="item-img">
          <img :src="item.avator" alt />
        </div>
        <div class="item-info">
          <div class="item-info-user">
            <div class="item-name">{{item.name}}</div>
            <div class="item-time">{{item.time}}</div>
          </div>
          <div class="item-msg">{{item.msg}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { data } from "./data";
export default {
  name: "chatlist",
  data() {
    return {
      filterVal: "",
      dataList: data,
    };
  },
  created() {},
  computed: {
    dataListFilter: function () {
      return this.dataList.filter(
        (item) =>
          item.name.indexOf(this.filterVal) != -1 ||
          item.msg.indexOf(this.filterVal) != -1
      );
    },
  },
  methods: {
    send: function () {
      this.$bus.$emit("get", "ok");
    },
  },
};
</script>


<style scoped>
.chatlist {
  height: 100%;
}
.filter-input-container {
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 8px #f0f1f2;
}
.filter-input {
  flex: 1;
  margin: 0 10px 0 20px;
}
.filter-btn {
  margin-right: 10px;
}
.user-container {
  padding-bottom: 10px;
  width: 100%;
  height: calc(100% - 70px);
  overflow-y: scroll;
}
.user-container .user-item {
  box-sizing: border-box;
  height: 66px;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  position: relative;
  padding: 5px;
  overflow: hidden;
  display: flex;
  cursor: pointer;
  transition: all 0.3s;
  animation: fly-in 0.6s;
}
.user-container .user-item:hover {
  background-color: #f5f5f5;
}
.user-container .user-item .item-img {
  width: 70px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-container .user-item .item-img img {
  display: block;
  height: 50px;
  width: 50px;
  border-radius: 10px;
}
.user-container .user-item .item-info {
  flex: 1;
  position: relative;
  height: 54px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 5px;
}
.user-container .user-item .item-info .item-info-user {
  height: 30px;
  overflow: hidden;
  display: flex;
  line-height: 30px;
  justify-content: space-between;
}
.item-info-user .item-name {
  font-size: 16px;
  color: #1f1f1f;
}
.item-info-user .item-time {
  font-size: 12px;
  color: #d9d9d9;
}
.user-container .user-item .item-info .item-msg {
  height: 24px;
  color: #8c8c8c;
  font-size: 14px;
  line-height: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: none;
}
@keyframes fly-in {
  0% { margin-bottom: 100%; }
  80% { margin-bottom: -10px; }
  100% { margin-bottom: 0px; }
}
</style>