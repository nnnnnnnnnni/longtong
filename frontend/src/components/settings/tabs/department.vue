<template>
  <div class="department">
    <div class="filters">
      <div class="filter-item">
        <a-button type="primary" @click="openAddModal">添加部门</a-button>
      </div>
    </div>
    <div class="list">
      <a-table align="center" :columns="columns" :data-source="departmentData">
        <span slot="attached" slot-scope="text">
          <span v-if="text.upper">
            <a-button type="link">{{text.upper.name}}</a-button>
          </span>
          <span v-else>暂无</span>
        </span>
        <span slot="action" slot-scope="text">
          <span>
            <a-popconfirm title="删除后无法恢复，确定要删除嘛?" ok-text="是" cancel-text="否" @confirm="deleteDep(text)">
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
            <a-button type="primary" size="small" @click="openEditModal(text)">编辑</a-button>
          </span>
        </span>
      </a-table>
    </div>

    <!-- 新增modal -->
    <a-modal :title="openType == 1? '新增': '编辑'" :visible="modalVisible" okText='确定' :confirm-loading="confirmLoading" @ok="modalMethodOk" @cancel="modalVisible = false" >
      <a-form-model :model="departmentForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 14,offset: 1 }">
        <a-form-model-item label="部门名称">
          <a-input v-model="departmentForm.name" placeholder='请输入...'></a-input>
        </a-form-model-item>
        <a-form-model-item label="上级部门">
          <a-select v-model="departmentForm.upper" style="width: 100%" :allowClear='true' placeholder="下拉选择..." >
            <a-select-option v-for="department in departmentData" :key="department.name" :value='department._id'>
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
  name: "department",
  props: ['activeTab'],
  data() {
    return {
      isOwn: true,
      openType: 1,
      modalVisible: false,
      confirmLoading: false,
      departmentForm: {},
      users: [],
      columns: [
        {
          title: "名称",
          className: "_center",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "管理数",
          className: "_center",
          dataIndex: "adminNum",
          key: "adminNum"
        },
        {
          title: "成员数",
          className: "_center",
          dataIndex: "userNum",
          key: "userNum"
        },
        {
          title: "上级部门",
          className: "_center",
          scopedSlots: { customRender: "attached" }
        },
        {
          title: "操作",
          className: "_center",
          scopedSlots: { customRender: "action" },
          fixed: "right"
        }
      ],
      departmentData: []
    };
  },
  mounted() {
    this.getInfo();
  },
  watch: {
    activeTab: function() {
      if(this.activeTab == 4) {
        this.getInfo();
      }
    }
  },
  methods: {
    // 获取所有部门
    getInfo: function() {
      this.$get('/department/departments', {}).then(res=> {
        this.departmentData = res.data;
      })
    },
    // 删除部门
    deleteDep: function(text) {
      this.$delete('/department/deleteDep', {
        departmentId: text._id
      }).then(res=> {
        if(res.status == 200 ){
          this.$message.success('删除成功');
          this.getInfo();
        }
      })
    },
    // 打开新增窗口
    openAddModal: function() {
      this.openType = 1;
      this.modalVisible = true;
    },
    // add-modal OK-button 
    modalMethodOk: function() {
      if(this.openType == 1) {
        if(!this.departmentForm.name) return this.$message.error("必填：名称");
        this.confirmLoading = true;
        this.$post('/department/create', {
          _id: this.departmentForm._id,
          name: this.departmentForm.name,
          upper: this.departmentForm.upper
        }).then(res=> {
          if(res.status == 200) {
            this.confirmLoading = false;
            this.departmentForm = {};
            this.getInfo();
            this.modalVisible = false;
            this.$message.success('创建成功');
          } else {
            this.confirmLoading = false;
          }
        })
      } else {
        if(!this.departmentForm.name) return this.$message.error("必填：名称");
        if(this.departmentForm.upper == this.departmentForm._id) return this.$message.error("上级部门不可设置为自己");
        this.confirmLoading = true;
        this.$put('/department/update', this.departmentForm).then(res=> {
          if(res.status == 200) {
            this.confirmLoading = false;
            this.departmentForm = {};
            this.getInfo();
            this.modalVisible = false;
            this.$message.success('更新成功');
          } else {
            this.confirmLoading = false;
          }
        })
      }
    },
    // 打开编辑窗口
    openEditModal: function(text) {
      this.openType = 2;
      const _text = Object.assign({}, text)
      if(_text.upper) {
        _text.upper = _text.upper._id;
      } else {
        delete _text.upper;
      }
      this.departmentForm = _text;
      this.modalVisible = true;
    }
  }
};
</script>

<style scoped>
.department {
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
</style>
