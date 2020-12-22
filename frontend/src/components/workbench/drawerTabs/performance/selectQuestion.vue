<template>
  <div ref="container" class="select-question" v-if="visible" @click="_visible">
    <div class="container">
      <div class="input">
        <input type="text" placeholder="请输入标题" @input="change" />
        <a-icon type="search"></a-icon>
      </div>
      <div class="list">
        <div class="select">
          <div class="title">候选列表</div>
          <div class="item-container">
            <div class="item" v-for="item in dataSource" :key="item._id" :class="{disabled: ids.indexOf(item._id) != -1}" @click="select(item)">
              <div class="top">
                <div class="item-name">{{ item.title }}</div>
                <div class="item-score">{{item.score}}</div>
              </div>
              <div class="description">{{item.description}}</div>
            </div>
          </div>
        </div>
        <div class="selected">
          <div class="title">已选列表 {{selected.length}}</div>
          <div class="item-container">
            <div class="item" v-for="(item, index) in selected" :key="item._id" @click="remove(item, index)">
              <div class="item-name">{{ item.title }}</div>
              <div class="item-score">{{item.score}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="button">
        <a-button @click="okButton">ok</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectQuestion",
  props: ["visible", "dataSource", 'selected'],
  model: {
    prop: "visible",
    event: "change"
  },
  model: {
    prop: "dataSource",
    event: "change"
  },
  model: {
    prop: "selected",
    event: "change"
  },
  data() {
    return {
      busy: false,
      timer: null,
      space: 500,
      ids: []
    };
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.keyCode == 27) {
        this.$emit("cancel", e);
      }
    });
  },
  watch: {
    selected: function() {
      this.ids = [];
      this.selected.forEach((item) => {this.ids.push(item._id)});
    }
  },
  methods: {
    _visible: function(e) {
      if (e.target.className == "select-question") {
        this.$emit("cancel", e);
      }
    },
    change: function(e) {
      if(e.target.value == '') {
        this.timer = setTimeout(() => {
          this.dataSource = [];
        }, this.space);
      } else if (!this.busy) {
        this.busy = true;
        this.timer = setTimeout(() => {
          this.$emit("change", e);
          this.busy = false;
        }, this.space);
      }
    },
    select: function(item) {
      if(this.ids.indexOf(item._id) != -1) {
        return;
      } else {
        this.selected.unshift(item);
        this.ids.push(item._id)
      }
    },
    remove: function(data, index) {
      this.selected.splice(index, 1);
      this.ids.splice(index, 1)
    },
    okButton: function(e) {
      this.$emit("cancel", e);
    }
  }
};
</script>

<style scoped>
.disabled {
  background-color: #a6a6a6 !important;
  border: #e6e6e6 !important;
  cursor: no-drop !important;
}
.select-question {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.45);
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 1000px;
  height: 630px;
  animation: showContainer 0.5s;
  overflow: hidden;
}
@keyframes showContainer {
  0% {
    width: 0;
    height: 0;
  }
  100% {
    width: 1000px;
    height: 630px;
  }
}
.container .input {
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-radius: 30px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 20px;
  color: #333;
  line-height: 40px;
}
.container .input input {
  border: none;
  outline: none;
  height: 40px;
  font-size: 20px;
  width: 920px;
  letter-spacing: 2px;
}
.container .input i {
  font-size: 30px;
  cursor: pointer;
  color: #aaa;
}
.container .list {
  display: flex;
}
.container .list .item-container {
  max-height: 490px;
  overflow-y: scroll;
  padding: 0px 10px;
  box-sizing: border-box;
}
.container .list .select {
  width: 70%;
  padding: 10px;
  overflow: hidden;
}
.container .list .select .item {
  width: 100%;
  overflow: hidden;
  height: 70px;
  margin: 10px 0px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.container .list .select .item:hover {
  border: 1px solid #1890ff;
}
.container .list .select .item .top {
  display: flex;
  height: 30px;
  line-height: 30px;
  justify-content: space-between;
}
.container .list .select .item .description {
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.container .list .selected {
  flex: 1;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.container .list .selected .item {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin: 10px 0px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.container .list .selected .item:hover {
  border: 1px solid #1890ff;
}
.button {
  width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button button {
  width: 100px;
  color: #1890ff;
  font-weight: 500;
}
</style>
