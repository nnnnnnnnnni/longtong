<template>
  <div class="pan-list">
    <div class="upload">
      <a-upload-dragger
        name="file"
        :action="upload"
        @change="handleChange"
        :showUploadList="false"
        :before-upload="beforeUpload"
        :headers="headers"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">
          点击或拖拽文件到此处上传（500MB）
        </p>
      </a-upload-dragger>
    </div>
    <div class="list">
      <div class="item" v-for="item in data" :key="item._id">
        <div class="file">{{ item.name }}</div>
        <div class="other">
          <div class="user">
            <div class="avator">
              <img :src="item.user.avator" alt="" />
            </div>
            <div class="name">{{ item.user.name }}</div>
          </div>
          <div class="action">
            <div class="size">
              {{item.size}}
            </div>
            <span v-if="$store.state.user._id == item.user._id">
              <a-button size="small" shape="circle" type="danger" icon="delete" @click="deleteFile(item._id)"/>
            </span>
            <a-button size="small" shape="circle" type="primary" icon="download" @click="download(item.url)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parse } from 'querystring';
import { host } from "@/lib/config";
export default {
  name: "list",
  data() {
    return {
      upload: `${host}/generic/panUpload`,
      headers: {
        Authorization: localStorage.getItem("token")
      },
      data: []
    };
  },
  mounted() {
    this.getPans();
  },
  methods: {
    getPans: function() {
      this.$get("/generic/pans").then(res => {
        res.data.map(item => {
          const kb = item.size / 1024
          if(kb < 1000) {
            item.size = `${(kb).toFixed(2)}KB`
          } else {
            item.size = `${(kb /1000).toFixed(2)}MB`
          }
          return item
        })
        this.data = res.data;
      });
    },
    beforeUpload: function(file) {
      if (file.size > 1024 * 1024 * 500) {
        this.$message.error("文件大小超出");
        return false;
      }
    },
    handleChange: function(info) {
      if (info.file.status === "uploading") {
        this.$message.info("上传中......");
        return;
      }
      if (info.file.status === "done") {
        this.$message.success("上传成功");
        this.getPans();
      }
    },
    deleteFile: function(id) {
      this.$delete('/generic/deleteFile', {
        id: id
      }).then(res=> {
        if(res.status == 200) {
          this.getPans();
          this.$message.success('成功删除');
        }
      })
    },
    download: function (res) {
      const ele = document.createElement('a')
      ele.setAttribute('href', res)
      ele.setAttribute('target', '_black')
      ele.setAttribute('download', 'download')
      ele.click()
    }
  }
};
</script>

<style scoped>
.pan-list {
  width: 60%;
  min-width: 1000px;
  margin: 0 auto;
  overflow-y: auto;
  padding: 20px;
}
.list {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
}
.list .item {
  width: 32%;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 10px 0.5%;
  padding: 10px 20px;
  height: 112px;
  transition: all 0.3s;
}
.list .item:hover {
  border-color: #40a9ff;
  cursor: pointer;
}
.list .item .file {
  font-size: 14px;
  height: 40px;
  line-height: 20px;
  word-break: break-all;
  color: #40a9ff;
  margin-bottom: 1;
   overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.list .item .other {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
}
.list .item .size {
  width: 100%;
  height: 10px;
  line-height: 10px;
  text-align: right;
  font-size: 12px;
  margin-bottom: 5px;
}
.list .item .user {
  height: 40px;
  display: flex;
}
.list .item .user .avator {
  width: 30px;
  height: 30px;
  margin: 5px 5px 5px 0px;
}
.list .item .user .name {
  line-height: 40px;
  font-size: 12px;
}
.list .item .user .avator img {
  width: inherit;
  height: inherit;
  border-radius: 50%;
}
</style>
