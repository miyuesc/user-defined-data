<template>
  <div class="build-main-page">
    <div class="build-page-header">
      <div class="icon-and-back">
        <div class="back"></div>
        <p class="icon-main">MData</p>
      </div>
      <p class="project-name">
        {{ `测试项目  ${new Date().toLocaleString()}` }}
      </p>
      <div class="control-button-group">
        <p class="control-button preview-button">分享</p>
        <p class="control-button preview-button">发布</p>
        <p class="control-button preview-button">预览</p>
        <p class="control-button save-button">保存</p>
      </div>
    </div>
    <tool-bar :scale="pageScale" @amplification="amplificationPage" @narrow="narrowPage"></tool-bar>
    <pre-page :scale="pageScale / 100"></pre-page>
  </div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component } from "vue-property-decorator";
import ToolBar from "@/components/ToolBar.vue";
import PrePage from "@/components/PrePage.vue";

@Component({
  components: { PrePage, ToolBar }
})
export default class Index extends Vue {
  pageScale: number = 70;

  amplificationPage() {
    this.pageScale += 10;
  }
  narrowPage() {
    this.pageScale -= 10;
  }
}
</script>

<style scoped lang="less">
.build-main-page {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgb(0, 0, 0);
  .build-page-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    justify-content: space-between;
    background: rgb(31, 31, 31);
    .icon-and-back {
      display: flex;
      flex-direction: row;
      width: 200px;
      .back {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #2c3e50;
        color: #6f6ff5;
        font-size: 32px;
        border-radius: 0 2px 2px 0;
        &:before {
          content: "\276C";
        }
      }
      .icon-main {
        line-height: 40px;
        font-size: 24px;
        color: #dfdfdf;
        margin: 0 12px;
        font-weight: bolder;
        font-style: italic;
      }
    }
    .project-name {
      line-height: 40px;
      font-size: 16px;
      color: #dfdfdf;
    }
    .control-button-group {
      width: 400px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      color: lightgrey;
      .control-button {
        margin: 6px;
        height: 24px;
        padding: 4px;
        font-size: 12px;
        display: block;
        border-radius: 2px;
        background: #263540;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
