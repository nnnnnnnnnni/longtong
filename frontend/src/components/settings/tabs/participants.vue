<template>
  <div class="participants">
    <div class="filters">
      <div class="filter-item">
        <a-button type="primary" size="small">添加成员</a-button>
      </div>
      <div class="filter-item">
        <span class="item-title">角色:</span>
        <a-select default-value="lucy" size="small" style="width: 120px">
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <span class="item-title">部门:</span>
        <a-select default-value="lucy" size="small" style="width: 120px">
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
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
        <span slot="_id" slot-scope="text">
          <span v-if="text.length == 0">暂无加入</span>
          <span v-else>
            <span><a-button type='primary' size='small'>任命</a-button></span>
            <span><a-button type='danger' size='small'>编辑</a-button></span>
          </span>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "participantsTab",
  data() {
    return {
      columns: [
        {
          title: "头像",
          dataIndex: "avator",
          rowKey: "avator",
          scopedSlots: { customRender: "avator" },
        },
        {
          title: "姓名",
          dataIndex: "name",
          rowKey: "name"
        },
        {
          title: "职位",
          dataIndex: "job",
          rowKey: "job",
        },
        {
          title: "部门",
          dataIndex: "department",
          rowKey: "department",
        },
        {
          title: "联系方式",
          dataIndex: "mail",
          rowKey: "mail",
          scopedSlots: { customRender: "contact" }
        },
        {
          title: "公司角色",
          dataIndex: "company",
          rowKey: "company",
          scopedSlots: { customRender: "company" }
        },
        {
          title: "参与项目",
          dataIndex: "projects",
          rowKey: "projects",
          scopedSlots: { customRender: "projects" }
        },
        {
          title: "参与项目",
          dataIndex: "_id",
          rowKey: "_id",
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
        }
      ]
    };
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
  justify-content: space-between;
  border-bottom: 1px solid #e3e3e3;
  padding: 0px 15px 15px 15px;
}
.filter-item .item-title {
  font-size: 12px;
}
img {
  height: 30px;
  width: 30px;
}
.contact {
  font-size: 14px;
}
</style>
