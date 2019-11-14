<template>
  <div class="home-page">
    <div class="header">
      <div class="m-ico">
        <img class="m-ico__img" src="../../assets/logo.png" alt="ico" />
        <!--        <p>MData</p>-->
      </div>
      <div class="m-tabs">
        <p class="m-collect" :class="selected === 0 ? 'selected' : ''" @click="selected = 0">
          我的项目
        </p>
        <p class="m-collect" :class="selected === 1 ? 'selected' : ''" @click="selected = 1">
          收藏列表
        </p>
        <p class="m-collect" :class="selected === 2 ? 'selected' : ''" @click="selected = 2">
          我发布的
        </p>
      </div>
      <div class="m-user">
        <div>欢迎您：{{ getUserInfo.name }}</div>
        <div class="m-user-icon">
          <img :src="getUserInfo.userIcon" alt="user" />
        </div>
      </div>
    </div>
    <div class="body">
      <template v-if="getProjects.length > 0">
        <div>全部项目</div>
      </template>
      <template v-else>
        <div class="empty">
          <img class="empty-image" src="../../assets/svg/data-empty.svg" alt="no-project" />
          <div class="new-project" @click="addProject = true">+ 新建项目</div>
        </div>
      </template>
    </div>
    <m-dialog title="选择模板" width="800px" :visible="addProject" @cancel="addProject = false">
      <div class="dialog-body">
        <div class="template-item" v-for="(i, k) in templates" :key="k">
          <p class="template-name">{{ i.name }}</p>
          <div class="template-img" @click="buildNewProject(i)">
            <img :src="i.src" :alt="i.name" />
          </div>
        </div>
      </div>
    </m-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component({})
export default class Home extends Vue {
  @Getter("getUserInfo")
  getUserInfo!: any;
  @Getter("getProjects")
  getProjects!: any;

  selected: number = 0;
  addProject: boolean = false;

  templates: any[] = [
    {
      name: "模板一",
      src: require("@/assets/favicon_64x64.png")
    },
    {
      name: "模板二",
      src: require("@/assets/favicon_64x64.png")
    },
    {
      name: "模板三",
      src: require("@/assets/favicon_64x64.png")
    }
  ];

  hasCheck() {
    this.addProject = false;
  }

  buildNewProject(item: any) {
    this.$router.push({
      path: "build"
    });
  }

  created() {}
}
</script>

<style scoped lang="less">
.home-page {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  color: #e3e3e3;
  align-items: center;
  width: 100%;
  height: 100%;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 16px 32px;
    background: black;
    .m-ico {
      width: 80px;
      height: 32px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 20px;
      line-height: 32px;
      text-indent: 12px;
      .m-ico__img {
        max-height: 32px;
        /*max-width: 32px;*/
      }
    }
    .m-tabs {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      p {
        line-height: 32px;
        margin: 0 24px;
        position: relative;
        box-sizing: border-box;
        &::before {
          content: "";
          width: 0;
          position: absolute;
          bottom: -2px;
          box-sizing: border-box;
          transition: all ease 0.3s;
        }
        &:hover {
          cursor: pointer;
          &::before {
            content: "";
            width: 100%;
            border: #fc2f70 1px solid;
          }
        }
      }
      .selected {
        border-bottom: 2px solid #fc2f70;
      }
    }
    .m-user {
      width: 200px;
      display: flex;
      flex-direction: row;
      line-height: 32px;
      justify-content: space-around;
      position: relative;
      .m-user-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        img {
          max-height: 32px;
          max-width: 32px;
        }
      }
    }
  }
  .body {
    width: 1200px;
    /*height: 640px;*/
    /*margin: 0 auto;*/
    /*transform: translateX(-50%);*/
    margin: 24px 0 auto;
    overflow: auto;
    .empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .empty-image {
        height: 320px;
        margin: 150px 0;
      }
    }
    .new-project {
      display: block;
      padding: 6px 18px;
      font-size: 18px;
      width: 140px;
      font-family: "Avenir", Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      letter-spacing: 1px;
      background: linear-gradient(143deg, #335ae9, #6f6ff5);
      border-radius: 2px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
/deep/ .m-dialog__header {
  color: black;
}
.dialog-body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 360px;
  color: #000000;
  .template-name {
    font-size: 18px;
    line-height: 42px;
    padding-bottom: 12px;
  }
  img {
    width: 100px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
