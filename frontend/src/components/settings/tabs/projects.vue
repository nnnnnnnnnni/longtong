<template>
  <div class="projects">
    <div class="filters">
      <div class="filter-item">
        <a-button type="primary" @click="openAddModal">添加部门</a-button>
      </div>
    </div>
    <div class="list">
      <a-table align="center" :columns="columns" :data-source="projectsData">
        <span slot="logo" slot-scope="text">
          <img :src="text" alt="">
        </span>
        <span slot="admins" slot-scope="text">
          <span>{{text.length}}</span>
        </span>
        <span slot="members" slot-scope="text">
          <span>{{text.length}}</span>
        </span>
        <span slot="uppers" slot-scope="text">
          <span v-if="text.upper">
            <a-button type="link">{{text.upper.name}}</a-button>
          </span>
          <span v-else>暂无</span>
        </span>
        <span slot="action" slot-scope="text">
          <span>
            <a-popconfirm title="删除后无法恢复，确定要删除嘛?" ok-text="是" cancel-text="否" @confirm="deleteProject(text)">
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
            <a-button type="primary" size="small">编辑</a-button>
          </span>
        </span>
      </a-table>
    </div>

    <!-- add / edit model -->
    <a-modal :title="openType == 1? '新增': '编辑'" :visible="modalVisible" okText='确定' @ok="modalMethodOk" @cancel="modalVisible = false" >
      <a-form-model :model="projectForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 14,offset: 1 }">
        <a-form-model-item label="LOGO" required>
          <a-upload accept='.jpg,.png' name="file" class="avatar-uploader" :before-upload="beforeUpload" :show-upload-list="false" >
            <a-button> <a-icon type="upload" /> Select File </a-button>
            <span style="padding-left: 20px" v-if="avatorFile.name && avatorFile.name.length < 12">
              {{avatorFile.name}}
            </span>
            <span style="padding-left: 20px" v-else-if="avatorFile.name">
              {{avatorFile.name.slice(0, 8)}}......{{avatorFile.name.slice(-3)}}
            </span>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="名称" required>
          <a-input v-model="projectForm.name" placeholder="请输入..."></a-input>
        </a-form-model-item>
        <a-form-model-item label="隶属部门" required>
          <a-select v-model="projectForm.department" style="width: 100%" :allowClear='true' placeholder="下拉选择..." >
            <a-select-option v-for="department in departmentData" :key="department.name" :value='department._id'>
              {{department.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="管理员" required>
          <a-select
            mode="multiple"
            show-search
            v-model="projectForm.admins"
            placeholder='搜索（姓名、昵称、邮箱、手机号）'
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
          >
            <a-select-option v-for="d in users" :value="d._id" :key="d.name">
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
  data() {
    return {
      avatorFile: {},
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
          scopedSlots: { customRender: "logo" },
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
          scopedSlots: { customRender: "admins" },
        },
        {
          title: "成员数",
          className: "_center",
          dataIndex: "members",
          scopedSlots: { customRender: "members" },
        },
        {
          title: "上级部门",
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
      projectsData: [
        {
          _id: 1,
          name: '项目1',
          logo: 'http://qh27o5obv.hd-bkt.clouddn.com/QQ%E6%88%AA%E5%9B%BE20200925160741_1601274307293.png',
          admins: [1,2,3],
          members: [1,2,3,4],
          projects: ''
        }
      ]
    };
  },
  methods: {
    // 文件上传前处理
    beforeUpload(file) {
      if(file.type.indexOf('png') == -1 && file.type.indexOf('jpeg') == -1 && file.type.indexOf('jpg') == -1){
        this.$message.error('文件格式不正确');
        return false;
      }
      this.avatorFile = file;
      return false;
    },
    // 下拉框搜索
    handleSearch: function(value) {
      this.$get('/user/users', {
        options: {
          info: value
        }
      }).then(res=> {
        this.users = res.data.users;
      })
    },
    modalMethodOk: function() {
      console.log(this.projectForm)
    },
    deleteProject: function(text) {

    },
    openAddModal: function() {
      this.openType = 1;
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
