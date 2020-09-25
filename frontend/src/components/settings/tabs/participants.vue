<template>
  <div class="participants">
    <div class="filters">
      <div class="filter-item">
        <a-button type="primary" @click="openAddModal">添加成员</a-button>
      </div>
      <div class="filter-item">
        <span class="item-title">角色:</span>
        <a-select v-model="searchOptions.role" placeholder='请选择...' style="width: 120px">
          <a-select-option value='creater'>创建者</a-select-option>
          <a-select-option value='admin'>管理员</a-select-option>
          <a-select-option value='user'>成员</a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <span class="item-title">岗位:</span>
        <a-select v-model="searchOptions.job" placeholder='请选择...' style="width: 120px">
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <span class="item-title">部门:</span>
        <a-select v-model="searchOptions.department" placeholder='请选择...' style="width: 120px">
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <span class="item-title">搜索:</span>
        <a-input style="width: 150px" placeholder='请输入...'></a-input>
      </div>
      <div class="filter-item">
        <a-button-group>
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>重置</span>
            </template>
            <a-button type='primary' icon='reload' @click="reset"></a-button>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>搜索</span>
            </template>
            <a-button type='primary' icon='search'></a-button>
          </a-tooltip>
        </a-button-group>
      </div>
    </div>
    <div class="list">
      <a-table align='center' :columns="columns" :data-source="userData">
        <span slot="avator" slot-scope="text">
          <img :src="text" alt="" />
        </span>
        <span slot="contact" slot-scope="text, record">
          <div class="contact">
            <div class="contact-item">
              <a-icon type='mail'></a-icon>
              {{ record.mail }}
            </div>
            <div class="contact-item">
              <a-icon type='phone'></a-icon>
              {{ record.phone }}
            </div>
          </div>
        </span>
        <span slot="company" slot-scope="text">
          <span v-if="text.role == 'user'">
            <a-tag color="blue">成员</a-tag>
          </span>
          <span v-else-if="text.role == 'admin'">
            <a-tag color="green">管理员</a-tag>
          </span>
          <span v-else>
            <a-tag color="red">创建者</a-tag>
          </span>
        </span>
        <span slot="projects" slot-scope="text">
          <span v-if="text.length == 0">暂无加入</span>
          <span v-else>
            <span><a-button size='small' type='link'>查看详情</a-button></span>
          </span>
        </span>
        <span slot="_id">
          <span><a-button type='danger' size='small'>编辑</a-button></span>
        </span>
      </a-table>
    </div>

    <!-- 新增 / 编辑 modal -->
    <a-modal title="Title" :visible="modalVisible" :confirm-loading="confirmLoading" @ok="modalMethodOk" @cancel="modalVisible = false" >
      <a-form-model :model="userForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 14,offset: 1 }">
        <a-form-model-item label="头像">
          <a-upload  name="file" list-type="picture-card" class="avatar-uploader" :before-upload="beforeUpload" :show-upload-list="false" >
            <img v-if="userForm.avator" :src="userForm.avator" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text"> Upload </div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="邮箱">
          <a-input v-model="userForm.mail"></a-input>
        </a-form-model-item>
        <a-form-model-item label="密码">
          <a-input v-model="userForm.password"></a-input>
        </a-form-model-item>
        <a-form-model-item label="姓名">
          <a-input v-model="userForm.name"></a-input>
        </a-form-model-item>
        <a-form-model-item label="昵称">
          <a-input v-model="userForm.userName"></a-input>
        </a-form-model-item>
        <a-form-model-item label="岗位">
          <a-input v-model="userForm.job"></a-input>
        </a-form-model-item>
        <a-form-model-item label="部门">
          <a-select v-model="userForm.department" style="width: 100%" :allowClear='true' placeholder="下拉选择..." >
            <a-select-option v-for="department in departments" :key="department.name" :value='department._id'>
              {{department.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "participantsTab",
  data() {
    return {
      modalVisible: true,
      confirmLoading: false,
      openType: 1,
      searchOptions: {},
      userForm: {},
      departments: [],
      columns: [
        {
          title: "头像",
          dataIndex: "avator",
          key: "avator",
          className: '_center',
          scopedSlots: { customRender: "avator" },
        },
        {
          title: "姓名",
          className: '_center',
          dataIndex: "name",
          key: "name"
        },
        {
          title: "岗位",
          dataIndex: "job",
          className: '_center',
          key: "job",
        },
        {
          title: "部门",
          className: '_center',
          dataIndex: "department",
          key: "department",
        },
        {
          title: "联系方式",
          className: '_center',
          dataIndex: "mail",
          key: "mail",
          scopedSlots: { customRender: "contact" }
        },
        {
          title: "公司角色",
          className: '_center',
          dataIndex: "company",
          key: "company",
          scopedSlots: { customRender: "company" }
        },
        {
          title: "参与项目",
          className: '_center',
          dataIndex: "projects",
          key: "projects",
          scopedSlots: { customRender: "projects" }
        },
        {
          title: "操作",
          className: '_center',
          dataIndex: "_id",
          key: "_id",
          scopedSlots: { customRender: "_id" },
          fixed: 'right'
        }
      ],
      userData: [
        {
          _id: 1,
          avator: "http://qh27o5obv.hd-bkt.clouddn.com/logo_1600831787696.png",
          name: "NIyongsheng",
          userName: "shenger",
          job: "web",
          department: "web group 2",
          mail: "714275326@qq.com",
          phone: "1234567890",
          company: { info: {}, role: "user" },
          projects: [1]
        },
      ]
    };
  },
  methods: {
    beforeUpload(file) {
      console.log(file)
      return false;
    },
    // 重置条件选择
    reset: function() {
      Object.keys(this.searchOptions).forEach(key => {
        delete this.searchOptions[key];
      })
      this.$forceUpdate();
    },
    // 打开新增modal
    openAddModal: function() {
      this.openType =1;
      this.modalVisible = true;
    },
    // modal-ok
    modalMethodOk: function() {

    }
  }
};
</script>

<style scoped>
.participants {
  width: 100%;
  height: 100%;
  overflow-y: auto;
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
.filter-item .item-title {
  font-size: 12px;
  margin-right: 5px;
}
img {
  height: 30px;
  width: 30px;
}
.contact {
  font-size: 14px;
}
</style>
