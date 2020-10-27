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
      <a-empty description='暂未参与'></a-empty>
    </div>
  </div>
</template>

<script>
export default {
  name: "projects",
  data() {
    return {
      projects: [],
      userId: this.$route.params.id
    };
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    getProjects: function() {
      this.$get("/project/projectByUser",{
        userId: this.userId
      }).then(res => {
        this.projects = res.data;
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
.info img {
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
</style>
