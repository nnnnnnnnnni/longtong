<template>
  <div class="projects">
    <div class="filters">
      <div class="filter-item">
        <a-button type="primary" @click="openAddModal">添加项目</a-button>
      </div>
    </div>
    <div class="list">
      <a-table align="center" :columns="columns" :data-source="projectsData">
        <span slot="logo" slot-scope="text">
          <img :src="text" alt="" />
        </span>
        <span slot="admins" slot-scope="text">
          <span>{{ text.length }}</span>
        </span>
        <span slot="members" slot-scope="text">
          <span>{{ text.length }}</span>
        </span>
        <span slot="uppers" slot-scope="text">
          <span v-if="text.department">
            <a-button type="link">{{ text.department.name }}</a-button>
          </span>
          <span v-else>暂无</span>
        </span>
        <span slot="action" slot-scope="text">
          <span>
            <a-popconfirm title="删除后无法恢复，确定要删除嘛?" ok-text="是" cancel-text="否" @confirm="deleteProject(text)" >
              <a-button type="danger" size="small">{{text.admins && text.admins.length != 0 ? '解散': '删除'}}</a-button>
            </a-popconfirm>
            <a-button type="primary" size="small" @click="openEditModal(text)">编辑</a-button>
          </span>
        </span>
      </a-table>
    </div>

    <!-- add / edit model -->
    <a-modal :title="openType == 1 ? '新增' : '编辑'" :visible="modalVisible" okText="确定" @ok="modalMethodOk" @cancel="modalVisible = false" >
      <a-form-model :model="projectForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 14, offset: 1 }">
        <a-form-model-item label="LOGO" required>
          <a-upload
            accept=".jpg,.png"
            name="file"
            class="avatar-uploader"
            :before-upload="beforeUpload"
            :show-upload-list="false"
          >
            <a-button> <a-icon type="upload" /> Select File </a-button>
            <span style="padding-left: 20px" v-if="logoFile.name && logoFile.name.length < 12" >
              {{ logoFile.name }}
            </span>
            <span style="padding-left: 20px" v-else-if="logoFile.name">
              {{ logoFile.name.slice(0, 8) }}......{{logoFile.name.slice(-3)}}
            </span>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="名称" required>
          <a-input v-model="projectForm.name" placeholder="请输入..."></a-input>
        </a-form-model-item>
        <a-form-model-item label="隶属部门" required>
          <a-select
            v-model="projectForm.department"
            style="width: 100%"
            :allowClear="true"
            placeholder="下拉选择..."
          >
            <a-select-option v-for="department in departmentData" :key="department.name" :value="department._id" >
              {{ department.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="管理员" required>
          <a-select
            mode="multiple"
            show-search
            v-model="projectForm.admins"
            placeholder="搜索（姓名、昵称、邮箱、手机号）"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
          >
            <a-select-option v-for="d in users" :value="d._id" :key="d._id">
              {{ d.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="简介">
          <a-textarea v-model="projectForm.introduction" placeholder="请输入..."></a-textarea>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "projectsTab",
  props: ['activeTab'],
  data() {
    return {
      logoFile: {},
      modalVisible: false,
      openType: 1,
      projectForm: {},
      departmentData: [],
      users: [],
      columns: [
        {
          title: "LOGO",
          className: "_center",
          dataIndex: "logo",
          scopedSlots: { customRender: "logo" }
        },
        {
          title: "名称",
          className: "_center",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "管理数",
          className: "_center",
          dataIndex: "admins",
          scopedSlots: { customRender: "admins" }
        },
        {
          title: "成员数",
          className: "_center",
          dataIndex: "members",
          scopedSlots: { customRender: "members" }
        },
        {
          title: "隶属部门",
          className: "_center",
          scopedSlots: { customRender: "uppers" }
        },
        {
          title: "操作",
          className: "_center",
          scopedSlots: { customRender: "action" },
          fixed: "right"
        }
      ],
      projectsData: []
    };
  },
  mounted() {
    this.getDepartments();
    this.getProjects();
  },
  watch: {
    activeTab: function() {
      if(this.activeTab == 3) {
        this.getProjects();
      }
    }
  },
  methods: {
    // 文件上传前处理
    beforeUpload(file) {
      if (
        file.type.indexOf("png") == -1 &&
        file.type.indexOf("jpeg") == -1 &&
        file.type.indexOf("jpg") == -1
      ) {
        this.$message.error("文件格式不正确");
        return false;
      }
      this.logoFile = file;
      return false;
    },
    // 下拉框搜索
    handleSearch: function(value) {
      this.$get("/user/users", {
        options: {
          info: value
        }
      }).then(res => {
        this.users = res.data.users;
      });
    },
    // 上传logo
    uploadLogo: function() {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", this.logoFile);
        this.$post("/generic/upload", formData).then(res => {
          if (res.status == 200) {
            this.projectForm.logo = res.data.file;
            resolve();
          } else {
            reject(res.msg);
          }
        });
      });
    },
    // 获取项目
    getProjects: function() {
      this.$get("/project/projects").then(res => {
        this.projectsData = res.data;
      });
    },
    // 获取所有的部门
    getDepartments: function() {
      this.$get("/department/departments").then(res => {
        this.departmentData = res.data;
      });
    },
    // modal-ok button
    modalMethodOk: async function() {
      if (!this.projectForm.name) return this.$message.error("必须：名称");
      if (!this.projectForm.department) return this.$message.error("必须：部门");
      if (!this.projectForm.admins || this.projectForm.admins.length == 0) return this.$message.error("必须：管理员");
      if (this.openType == 1) {
        if (Object.keys(this.logoFile).length == 0) return this.$message.error("必须：头像");
        await this.uploadLogo();
        this.$post('/project/create', this.projectForm).then(res=> {
          if(res.status == 200 ){
            this.projectForm = {};
            this.logoFile = {}
            this.$message.success("新增成功");
            this.getProjects();
            this.modalVisible = false;
          }
        })
      } else {
        if(Object.keys(this.logoFile).length != 0) await this.uploadLogo();
        this.$put('/project/update', this.projectForm).then(res=> {
          if(res.status == 200 ){
            this.projectForm = {};
            this.logoFile = {}
            this.$message.success("更新成功");
            this.getProjects();
            this.modalVisible = false;
          }
        })
      }
    },
    // 删除项目
    deleteProject: function(text) {
      const length = text.admins.length + text.members.length;
      if(length == 0) {
        this.$delete('/project/deletePro', {
          projectId: text._id
        }).then(res=> {
          if(res.status == 200 ){
            this.$message.success('删除成功');
            this.getProjects();
          }
        })
      } else {
        this.$delete('/project/deleteProF', {
          projectId: text._id
        }).then(res=> {
          if(res.status == 200 ){
            this.$message.success('删除成功');
            this.getProjects();
          }
        })
      }
    },
    // 打开新增model
    openAddModal: function() {
      this.openType = 1;
      this.modalVisible = true;
    },
    openEditModal: function(text) {
      this.openType = 2;
      this.users = text.admins;
      const _admins = text.admins.map(item => item._id)
      this.projectForm = {
        _id: text._id,
        logo: text.logo,
        name: text.name,
        department: text.department._id,
        admins: _admins,
        introduction: text.introduction
      };
      this.modalVisible = true;
    }
  }
};
</script>

<style scoped>
.projects {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.filters {
  display: flex;
  border-bottom: 1px solid #e3e3e3;
  padding: 0px 15px 15px 15px;
}
.filter-item {
  display: flex;
  align-items: center;
  flex: 1 0 auto;
}
img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>
