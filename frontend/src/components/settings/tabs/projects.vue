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
            <a-popconfirm title="删除后无法恢复，确定要删除嘛?" ok-text="是" cancel-text="否" @confirm="deleteDep(text)">
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
        <a-form-model-item label="隶属部门">
          <a-select v-model="projectForm.department" style="width: 100%" :allowClear='true' placeholder="下拉选择..." >
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
  name: "projectsTab",
  data() {
    return {
      modalVisible: false,
      openType: 1,
      projectForm: {},
      departmentData: [],
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
