<template>
  <div class="myStart">
    <div class="tab-contaner">
      <div
        class="tab-item"
        v-for="item in tabs"
        :key="item.icon"
        @click="action(item.val)"
      >
        <div class="item-icon">
          <a-icon :type="item.icon" />
        </div>
        <div class="item-title">{{ item.title }}</div>
      </div>
    </div>
    <caigou :visible='caigouVisible' @cancel="cancel('caigou')" />
    <waichu :visible='waichuVisible' @cancel="cancel('waichu')" />
    <qingjia :visible='qingjiaVisible' @cancel="cancel('qingjia')" />
    <jiaban :visible='jiabanVisible' @cancel="cancel('jiaban')" />
    <zhaopin :visible='zhaopinVisible' @cancel="cancel('zhaopin')" />
    <zhuanzheng :visible='zhuanzhengVisible' @cancel="cancel('zhuanzheng')" />
  </div>
</template>

<script>
import caigou from './tabModals/caigou';
import waichu from './tabModals/waichu';
import qingjia from './tabModals/qingjia';
import jiaban from './tabModals/caigou';
import zhaopin from './tabModals/zhaopin';
import zhuanzheng from './tabModals/zhuanzheng';
import tabs from "./tabs";
export default {
  name: "myStart",
  data() {
    return {
      tabs: tabs,
      caigouVisible: false,
      waichuVisible: false,
      qingjiaVisible: false,
      jiabanVisible: false,
      zhaopinVisible: false,
      zhuanzhengVisible: false,
      tabsVisible: false,
    };
  },
  components: {
    caigou,
    waichu,
    qingjia,
    jiaban,
    zhaopin,
    zhuanzheng,
    tabs,
  },
  methods: {
    action: function(val) {
      this[`${val}Visible`] = true;
    },
    cancel: function(val) {
      this[`${val}Visible`] = false;
    }
  }
};
</script>

<style scoped>
.tab-contaner {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 20px;
}
.tab-contaner .tab-item {
  width: 33%;
  height: 116px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
}
.tab-item .item-icon {
  font-size: 18px;
}
.tab-item .item-title {
  margin-top: 5px;
  font-size: 14px;
}
.tab-contaner .tab-item:hover {
  color: #40a9ff;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.03);
}
</style>
