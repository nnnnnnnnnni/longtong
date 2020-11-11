<template>
  <div class="projects">
    <h2 class="title">负责项目</h2>
    <div class="list" v-if="projects.length != 0">
      <div v-for="item in projects" :key="item._id" class="item">
        <div class="info">
          <img :src="item.logo" alt="" />
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="introduction">{{ item.introduction }}</div>
        <div class="department">
          <a-icon type="cloud" />
          <span class="text">{{ item.department.name }}</span>
        </div>
      </div>
    </div>
    <div v-else class="list-empty">
      <a-empty description="暂未参与"></a-empty>
    </div>

    <h2 class="title">文章/文档</h2>
    <div class="list" v-if="documents.length != 0">
      <div v-for="item in documents" :key="item._id" class="doc">
        <div class="title">
          <router-link :to="'/document/' + item._id">{{
            item.title
          }}</router-link>
        </div>
        <div class="info">
          <div class="time">
            <a-icon type="calendar"></a-icon>
            {{ item.time }}
          </div>
          <div class="read">
            <a-icon type="eye"></a-icon>
            {{ item.visitors.length }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="list-empty">
      <a-empty description="暂无文章"></a-empty>
    </div>
  </div>
</template>

<script>
export default {
  name: "projects",
  data() {
    return {
      projects: [],
      documents: [],
      userId: this.$route.params.id
    };
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    getProjects: function() {
      this.$get("/profileInfos", {
        userId: this.userId
      }).then(res => {
        this.projects = res.data.projects;
        this.documents = res.data.documents;
      });
    }
  }
};
</script>

<style scoped>
.projects {
  width: 100%;
}
.projects .title {
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
}
.list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
}
.list .item {
  width: 49%;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  height: 142px;
  box-sizing: border-box;
  padding: 15px;
  overflow: hidden;
  margin-bottom: 15px;
  color: #586069;
}
.list .item .info {
  height: 30px;
  display: flex;
  line-height: 30px;
  color: #0366d6;
  font-weight: 600;
  margin-bottom: 10px;
}
.item .info img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 20px;
}
.list .item .introduction {
  height: 40px;
  overflow: hidden;
  font-size: 12px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.list .item .department {
  height: 30px;
  line-height: 40px;
}
.list .item .department .text {
  padding-left: 5px;
  font-size: 12px;
}
.list-empty {
  height: 214px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
}

.doc {
  width: 100%;
  display: flex;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #eee;
  line-height: 40px;
  margin-bottom: 10px;
}
.doc .title {
  margin: 0;
  font-size: 14px;
}
.doc a {
  display: inline-block;
}
.doc a:hover {
  text-decoration: underline;
}
.doc .info {
  display: flex;
}
.doc .info .time {
  margin: 0px 10px;
  width: 100px;
  text-align: center;
  font-size: 12px;
}
.doc .info .read {
  margin: 0px 10px;
  width: 40px;
  text-align: center;
  font-size: 12px;
}
</style>
