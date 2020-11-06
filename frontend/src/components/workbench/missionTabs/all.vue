<template>
  <div class="all">
    <a-table :columns="columns" :data-source="data"> </a-table>
  </div>
</template>

<script>
export default {
  name: "all",
  data() {
    return {
      columns: [
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        },
        {
          title: "名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "发布者",
          dataIndex: "organizer",
          key: "organizer"
        },
        {
          title: "时间",
          dataIndex: "time",
          scopedSlots: { customRender: "time" }
        },
        {
          title: "优先级",
          dataIndex: "priority",
          key: "priority"
        },
        {
          title: "类型",
          dataIndex: "type",
          key: "type"
        },
        {
          title: "参与者",
          dataIndex: "handler",
          key: "handler"
        },
      ],
      data: []
    };
  }
};
</script>

<style scoped></style>
