<template>
  <div class="setting-menu">
    <div class="avator">
      <img :src="this.$store.state.user.avator" alt />
    </div>
    <div class="name info-item">{{this.$store.state.user.name}}</div>
    <div class="item-group">
      <div class="edit info-item" :class="{edit_active: mode == 'edit'}">
        <lt-btutton circle="true" title="Edit Profile" @click="changeMode"/>
      </div>
      <div class="info-item _edit quit" :class="{quit_active: mode == 'edit'}">
        <lt-btutton circle="true" title="Exit Editing" @click="changeMode"/>
      </div>
    </div>
    <!-- <div class="division info-item" :class="{division_active: mode == 'edit'}">
      <i class="line"></i>
    </div>-->
    <div class="item-group">
      <div class="job info-item" :class="{job_active: mode == 'edit'}" :title="this.$store.state.user.job">
        <svg
        t="1598858510807"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="8495"
        width="200"
        height="200"
        >
          <path
          d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136V232h752v560z"
          p-id="8496"
          />
          <path
          d="M610.3 476h123.4c1.3 0 2.3-3.6 2.3-8v-48c0-4.4-1-8-2.3-8H610.3c-1.3 0-2.3 3.6-2.3 8v48c0 4.4 1 8 2.3 8zM615.1 620h185.7c3.9 0 7.1-3.6 7.1-8v-48c0-4.4-3.2-8-7.1-8H615.1c-3.9 0-7.1 3.6-7.1 8v48c0 4.4 3.2 8 7.1 8zM224 673h43.9c4.2 0 7.6-3.3 7.9-7.5 3.8-50.5 46-90.5 97.2-90.5s93.4 40 97.2 90.5c0.3 4.2 3.7 7.5 7.9 7.5H522c4.6 0 8.2-3.8 8-8.4-2.8-53.3-32-99.7-74.6-126.1 18.1-19.9 29.1-46.4 29.1-75.5 0-61.9-49.9-112-111.4-112s-111.4 50.1-111.4 112c0 29.1 11 55.5 29.1 75.5-42.7 26.5-71.8 72.8-74.6 126.1-0.4 4.6 3.2 8.4 7.8 8.4z m149-262c28.5 0 51.7 23.3 51.7 52s-23.2 52-51.7 52-51.7-23.3-51.7-52 23.2-52 51.7-52z"
          p-id="8497"
          />
        </svg>
        <span class="info-item-text">{{this.$store.state.user.job}}</span>
      </div>
      <div class="info-item _edit base" :class="{base_active: mode == 'edit', checked_active: editActive == 'base'}" @click="changeTab('base')">
        <div class="info-item-text">基本设置</div>
      </div>
    </div>
    <div class="item-group">
      <div class="department info-item" :class="{department_active: mode == 'edit'}" :title="this.$store.state.user.department">
        <svg
          t="1598858673672"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8641"
          width="200"
          height="200"
        >
          <path
            d="M888 680h-54V540H546v-92h238c8.8 0 16-7.2 16-16V168c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16v264c0 8.8 7.2 16 16 16h238v92H190v140h-54c-4.4 0-8 3.6-8 8v176c0 4.4 3.6 8 8 8h176c4.4 0 8-3.6 8-8V688c0-4.4-3.6-8-8-8h-54v-72h220v72h-54c-4.4 0-8 3.6-8 8v176c0 4.4 3.6 8 8 8h176c4.4 0 8-3.6 8-8V688c0-4.4-3.6-8-8-8h-54v-72h220v72h-54c-4.4 0-8 3.6-8 8v176c0 4.4 3.6 8 8 8h176c4.4 0 8-3.6 8-8V688c0-4.4-3.6-8-8-8zM256 805.3c0 1.5-1.2 2.7-2.7 2.7h-58.7c-1.5 0-2.7-1.2-2.7-2.7v-58.7c0-1.5 1.2-2.7 2.7-2.7h58.7c1.5 0 2.7 1.2 2.7 2.7v58.7z m288 0c0 1.5-1.2 2.7-2.7 2.7h-58.7c-1.5 0-2.7-1.2-2.7-2.7v-58.7c0-1.5 1.2-2.7 2.7-2.7h58.7c1.5 0 2.7 1.2 2.7 2.7v58.7zM288 384V216h448v168H288z m544 421.3c0 1.5-1.2 2.7-2.7 2.7h-58.7c-1.5 0-2.7-1.2-2.7-2.7v-58.7c0-1.5 1.2-2.7 2.7-2.7h58.7c1.5 0 2.7 1.2 2.7 2.7v58.7z"
            p-id="8642"
          />
          <path d="M400 300m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z" p-id="8643" />
        </svg>
        <span class="info-item-text">{{this.$store.state.user.department}}</span>
      </div>
      <div class="info-item _edit safe" :class="{safe_active: mode == 'edit', checked_active: editActive == 'safe'}" @click="changeTab('safe')">
        <div class="info-item-text">安全设置</div>
      </div>
    </div>
    <div class="item-group">
      <div class="mail info-item" :class="{mail_active: mode == 'edit'}" :title="this.$store.state.user.mail">
        <svg
          t="1598861818041"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8394"
          width="200"
          height="200"
        >
          <path
            d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5z"
            p-id="8395"
          />
          <path
            d="M833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6c20.2 15.7 48.5 15.7 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"
            p-id="8396"
          />
        </svg>
        <div class="info-item-text">{{this.$store.state.user.mail}}</div>
      </div>
      <div class="info-item _edit bind" :class="{bind_active: mode == 'edit', checked_active: editActive == 'bind'}" @click="changeTab('bind')">
        <div class="info-item-text">绑定设置</div>
      </div>
    </div>
    <div class="item-group">
      <div class="phone info-item" :class="{phone_active: mode == 'edit'}" :title="this.$store.state.user.phone">
        <svg
          t="1598864906173"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8186"
          width="200"
          height="200"
        >
          <path
            d="M877.1 238.7L770.6 132.3c-13-13-30.4-20.3-48.8-20.3s-35.8 7.2-48.8 20.3L558.3 246.8c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l89.6 89.7c-20.6 47.8-49.6 90.6-86.4 127.3-36.7 36.9-79.6 66-127.2 86.6l-89.6-89.7c-13-13-30.4-20.3-48.8-20.3-18.5 0-35.8 7.2-48.8 20.3L132.3 673c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9 6.5 0 12.8-0.5 19.2-1.6 132.4-21.8 263.8-92.3 369.9-198.3C818 606 888.4 474.6 910.4 342.1c6.3-37.6-6.3-76.3-33.3-103.4z m-37.6 91.5c-19.5 117.9-82.9 235.5-178.4 331s-213 158.9-330.9 178.4c-14.8 2.5-30-2.5-40.8-13.2L184.9 721.9 295.7 611l119.8 120 0.9 0.9 21.6-8C570.7 675 674.9 570.8 723.7 438.1l8-21.6-120.8-120.7 110.8-110.9 104.5 104.5c10.8 10.8 15.8 26 13.3 40.8z"
            p-id="8187"
          />
        </svg>
        <div class="info-item-text">{{this.$store.state.user.phone}}</div>
      </div>
    </div>
    <div class="item-group">
      <div class="line info-item" :class="{line_active: mode == 'edit'}" :title="this.$store.state.user.timeLine">
        <svg
          t="1598866908771"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8041"
          width="200"
          height="200"
        >
          <path
            d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
            p-id="8042"
          />
          <path
            d="M305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6c-3.1-3.1-8.2-3.1-11.3 0l-230 229.9L461.4 404c-3.1-3.1-8.2-3.1-11.3 0L266.3 586.7c-3.1 3.1-3.1 8.2 0 11.3l39.5 39.7z"
            p-id="8043"
          />
        </svg>
        <div class="info-item-text">{{this.$store.state.user.timeLine}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ltBtutton from "@/components/common/button.vue";
export default {
  name: "setting-menu",
  data() {
    return {
      mode: "profile", //profile or edit
      editActive: ''
    };
  },
  components: {
    ltBtutton,
  },
  methods: {
    changeMode: function(){
      if(this.mode == 'edit'){
        this.editActive = '';
      }
      this.mode = this.mode == 'edit'? 'profile' : 'edit'
    },
    changeTab: function(tab){
      if(this.editActive == tab){
        return;
      } else {
        this.editActive = tab;
        this.$router.push({name: tab})
      }
    }
  }
};
</script>


<style scoped>
.setting-menu {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 15px;
  position: relative;
}
.setting-menu .avator {
  cursor: pointer;
  margin: 20px auto 10px auto;
  width: 260px;
  height: 260px;
}
.avator img {
  width: inherit;
  height: inherit;
}
.item-group{
  position: relative;
  overflow: hidden;
}
.info-item {
  position: relative;
  text-align: left;
  left: 0;
  padding: 10px 0px;
  font-size: 14px;
  margin: 0 auto;
  left: 0;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #666;
  height: 24px;
  width: 90%;
  cursor: default;
  user-select: none;
  transition: all 1s;
}
.info-item .info-item-text {
  width: calc(100% - 28px);
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  letter-spacing: 2px;
}
.info-item svg {
  display: block;
  width: 18px;
  height: 18px;
  float: left;
}
.division .line {
  display: block;
  width: 100%;
  border-top: 1px solid #cccccc;
}
.name {
  font-size: 20px;
  justify-content: center;
}
.edit {
  font-size: 16px;
  height: 34px;
}
.edit_active, .job_active, .division_active, .department_active, .mail_active, .phone_active, .line_active  {
  left: -100%;
}
._edit {
  position: absolute;
  top: 0;
  left: 100%;
  width: 90%;
  margin: 0 5%;
  text-align: center;
  height: 24px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 5px;
}
.quit{
  font-size: 16px;
  height: 34px;
  width: 95% !important;
}
.quit_active, .base_active, .safe_active, .bind_active {
  left: 0;
  top: 0;
}
.checked_active{
  background-color: rgba(0, 0, 0, 0.12);
}
</style>