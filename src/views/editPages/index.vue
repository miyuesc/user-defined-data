<template>
  <div class="build-main-page">
    <div class="build-page-header">
      <div class="icon-and-back">
        <div class="back" @click="$router.push({ path: '/root' })"></div>
        <img src="../../assets/logo.png" class="icon-main" alt="mydata-logo" />
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
    <pre-page :scale="pageScale / 100" @click="active = 'prePage'">
      <drag-resize
        v-for="(i, index) in charts"
        :key="index"
        :isActive="active === i.chartName"
        :w="i.divConfig.width"
        :h="i.divConfig.height"
        :x="i.divConfig.left"
        :y="i.divConfig.top"
        :z="i.zIndex"
        :minw="160"
        :minh="90"
        :parentLimitation="true"
        @dragging="configDragging(i, $event)"
        @resizing="configResize(i, $event)"
        @activated="configChartOption(i, index)"
      >
        <line-chart
          :background-opacity="0.5"
          title="请输入标题"
          unit="单位"
          :width="i.divConfig.width"
          :height="i.divConfig.height"
          background-style="black"
        ></line-chart>
      </drag-resize>
    </pre-page>
    <demo-type-menu></demo-type-menu>
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
import DragResize from "@/components/DragResize.vue";
import DemoTypeMenu from "@/components/DemoTypeMenu.vue";
import LineChart from "@/components/ChartModels/LineChart.vue";

@Component({
  components: { LineChart, DemoTypeMenu, DragResize, PrePage, ToolBar }
})
export default class Index extends Vue {
  pageScale: number = 70;
  charts: any[] = [
    {
      chartName: "div1",
      divConfig: {
        width: 200,
        height: 120,
        left: 200,
        top: 111
      },
      zIndex: 10
    },
    {
      chartName: "div2",
      divConfig: {
        width: 530,
        height: 420,
        left: 590,
        top: 251
      },
      zIndex: 11
    }
  ];
  active: string = "";

  amplificationPage() {
    this.pageScale += 10;
  }
  narrowPage() {
    this.pageScale -= 10;
  }
  configChartOption(chart: any, index: number) {
    // this.active = chart.chartName;
  }
  configDragging(chart: any, data: any) {
    this.active = chart.chartName;
  }
  configResize(chart: any, data: any) {
    chart.divConfig = data;
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
        max-height: 32px;
        font-size: 24px;
        color: #dfdfdf;
        margin: 4px 12px;
        font-weight: bolder;
        font-style: italic;
      }
    }
    .project-name {
      line-height: 40px;
      font-size: 14px;
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
  .inner-charts-zone {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
