<template>
  <div class="participants">
    <div class="filters">
      <div class="filter-item">
        <span class="item-title">角色:</span>
        <a-select v-model="searchOptions.role" placeholder='请选择...' style="width: 100px">
          <a-select-option value='admin'>管理员</a-select-option>
          <a-select-option value='user'>成员</a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <span class="item-title">岗位:</span>
        <a-select showSearch optionFilterProp='children' v-model="searchOptions.job" placeholder='请选择...' style="width: 100px">
          <a-select-option v-for="job in jobs" :key="job" :value='job'>
            {{job}}
          </a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <span class="item-title">部门:</span>
        <a-select showSearch optionFilterProp='children' v-model="searchOptions.department" placeholder='请选择...' style="width: 100px">
          <a-select-option v-for="department in departments" :key="department.name" :value='department._id'>
            {{department.name}}
          </a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <span class="item-title">关键字:</span>
        <a-input style="width: 190px" v-model="searchOptions.info" placeholder='姓名/昵称/岗位/邮箱/电话'></a-input>
      </div>
      <div class="filter-item">
        <a-button-group>
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>新增</span>
            </template>
            <a-button type="primary" icon='plus' @click="openAddModal"></a-button>
          </a-tooltip>
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
            <a-button type='primary' icon='search' @click="getInfo(false)"></a-button>
          </a-tooltip>
        </a-button-group>
      </div>
    </div>
    <div class="list">
      <a-table align='center' :columns="columns" :data-source="userData">
        <span slot="avator" slot-scope="text">
          <img :src="text" alt="" />
        </span>
        <span slot="name" slot-scope="_, record">
          <span style="display:block;font-size: 1rem">{{record.userName}}</span>
          <span style="display:block;font-size: 0.5rem">({{record.name}})</span>
        </span>
        <span slot="department" slot-scope="text,record">
          <span v-if="record.department">
            <div>{{record.department.info.name}}</div>
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
          <span v-else><a-icon type="stop" theme="twoTone" two-tone-color="red" /></span>
        </span>
        <span slot="contact" slot-scope="text, record">
          <div class="contact">
            <div class="contact-item">
              <a-icon type='mail'></a-icon>
              <span v-if="record.mail">{{record.mail}}</span>
              <span v-else><a-icon type="stop" theme="twoTone" two-tone-color="red" /></span>
            </div>
            <div class="contact-item">
              <a-icon type='phone'></a-icon>
              <span v-if="record.phone">{{record.phone}}</span>
              <span v-else><a-icon type="stop" theme="twoTone" two-tone-color="red" /></span>
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
          <span v-if="!text">
            <a-icon type="stop" theme="twoTone" two-tone-color="red" />
          </span>
          <span v-else>
            <span><a-button size='small' type='link'>{{text}}</a-button></span>
          </span>
        </span>
        <span slot="_id" slot-scope="_, record">
          <span><a-button type='danger' size='small' @click="openEditModal(record)" :disabled="record.company.role == 'creater'">编辑</a-button></span>
        </span>
      </a-table>
    </div>

    <!-- 新增 / 编辑 modal -->
    <a-modal :title="openType == 1 ? '新增':'编辑'" :visible="modalVisible" @ok="modalMethodOk" @cancel="modalMtehodCancel" >
      <a-form-model ref='userModal' :model="userForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 14,offset: 1 }">
        <a-form-model-item label="头像" required>
          <a-upload accept='image/*' name="file" class="avatar-uploader" :before-upload="beforeUpload" :show-upload-list="false" >
            <a-button> <a-icon type="upload" /> Select File </a-button>
            <span style="padding-left: 20px" v-if="avatorFile.name && avatorFile.name.length < 12">
              {{avatorFile.name}}
            </span>
            <span style="padding-left: 20px" v-else-if="avatorFile.name">
              {{avatorFile.name.slice(0, 8)}}......{{avatorFile.name.slice(-3)}}
            </span>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="邮箱" required>
          <a-input v-model="userForm.mail" :disabled='openType == 2'></a-input>
        </a-form-model-item>
        <a-form-model-item label="密码" v-if="openType == 1" required>
          <a-input v-model="userForm.password"></a-input>
        </a-form-model-item>
        <a-form-model-item label="姓名" required>
          <a-input v-model="userForm.name"></a-input>
        </a-form-model-item>
        <a-form-model-item label="公司角色">
          <a-radio-group v-model="userForm.companyRole">
            <a-radio value="user">成员</a-radio>
            <a-radio value="admin">管理员</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="岗位" required>
          <a-input v-model="userForm.job"></a-input>
        </a-form-model-item>
        <a-form-model-item label="部门角色">
          <a-radio-group v-model="userForm.departmentRole">
            <a-radio value="user">成员</a-radio>
            <a-radio value="admin">管理员</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="部门" required>
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
import { participantsColumns } from './columns'
import {ismail} from '../../../lib/utils'
export default {
  name: "participantsTab",
  props: ['activeTab'],
  data() {
    return {
      avatorFile: {},
      loading: false,
      modalVisible: false,
      openType: 1,
      searchOptions: {},
      userForm: {
        companyRole: 'user',
        departmentRole: 'user',
      },
      departments: [],
      jobs: [],
      columns: participantsColumns,
      userData: []
    };
  },
  mounted() {
    this.getInfo(true);
  },
  watch: {
    activeTab: function() {
      if(this.activeTab == 2) {
        this.getInfo(true);
      }
    }
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
    // 获取用户信息
    getInfo: function(flush) {
      this.$get('/user/users', {
        options: flush? {}: this.searchOptions
      }).then(res=> {
        if(flush) {
          this.departments = res.data.departments;
          this.jobs = res.data.jobs;
        }
        this.userData = res.data.users;
      })
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
    // 打开编辑modal
    openEditModal: function(text) {
      this.openType = 2;
      this.userForm = {
        avator: Object.keys(this.avatorFile).length == 0? text.avator: '',
        mail: text.mail,
        name: text.name,
        companyRole: text.company.role,
        departmentRole: text.department? text.department.role: '',
        department: text.department? text.department.info._id : '',
        job: text.job,
        _id: text._id,
      }
      this.modalVisible = true;
    },
    // upload avator
    uploadAvator: function() {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', this.avatorFile);
        this.$post('/generic/upload', formData).then(res=> {
          if(res.status == 200) {
            this.userForm.avator = res.data.file;
            resolve()
          } else {
            reject(res.msg)
          }
        })
      })
    },
    // modal-cancel
    modalMtehodCancel: function() {
      this.modalVisible = false;
      this.userForm = {
        companyRole: 'user',
        departmentRole: 'user',
      }
    },
    // modal-ok
    modalMethodOk:async function() {
      if(!this.userForm.mail) return this.$message.error('必须：邮箱');
      if(!ismail(this.userForm.mail)) return this.$message.error('格式错误：邮箱');
      if(!this.userForm.name) return this.$message.error('必须：姓名');
      if(!this.userForm.job) return this.$message.error('必须：岗位');
      if(!this.userForm.department) return this.$message.error('必须：部门');
      if(this.openType == 1) {
        if(!this.userForm.password) return this.$message.error('必须：密码');
        if(Object.keys(this.avatorFile).length == 0) return this.$message.error('必须：头像');
        await this.uploadAvator();
        this.$post('user/addUser', this.userForm).then(res=> {
          if(res.status == 200) {
            this.userForm = {companyRole: 'user', departmentRole: 'user'},
            this.avatorFile = {};
            this.$message.success('创建成功');
            this.getInfo();
            this.modalVisible = false;
          }
        })
      } else if(this.openType == 2) {
        if(Object.keys(this.avatorFile).length != 0) await this.uploadAvator();
        this.$put('user/adminUpdate', this.userForm).then(res=> {
          if(res.status == 200) {
            this.userForm = {companyRole: 'user', departmentRole: 'user'},
            this.avatorFile = {};
            this.$message.success('更新成功');
            this.getInfo();
            this.modalVisible = false;
          }
        })
      }
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
  padding-bottom: 15px;
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
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.contact {
  font-size: 14px;
}
</style>
