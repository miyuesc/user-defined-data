<template>
  <div class="build-main-page">
    <div class="build-page-header">
      <div class="icon-and-back">
        <div class="back" @click="$router.push({ path: '/root' })"></div>
        <img src="../../assets/logo.png" class="icon-main" alt="mydata-logo" />
      </div>
      <p class="project-name">
        测试项目
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
        :isActive="active === i.title"
        :w="i.size.width"
        :h="i.size.height"
        :x="i.position.x"
        :y="i.position.y"
        :z="i.zIndex"
        :parent-scale-x="pageScale / 100"
        :parent-scale-y="pageScale / 100"
        :minw="160"
        :minh="90"
        :parentLimitation="true"
        @dragging="configDragging(i, $event)"
        @resizing="configResize(i, $event)"
        @resizestop="configResizeEnd(i, $event)"
        @activated="configChartOption(i, index)"
      >
        <template v-if="i.chartOptions.type === 'line'">
          <line-chart
            v-model="i.chartEntity"
            :background-opacity="0.5"
            :title="i.title"
            :unit="i.unit"
            :width="i.size.width"
            :height="i.size.height"
            :border-radius="0"
            background-style="black"
          ></line-chart>
        </template>
        <template v-if="i.chartOptions.type === 'bar'">
          <bar-chart
            v-model="i.chartEntity"
            :title="i.title"
            :chart-size="i.size"
            :chart-options="i.chartOptions"
            :chart-style="i.style"
            :background="i.background"
            :font-size="i.fontSize"
          ></bar-chart>
        </template>
      </drag-resize>
    </pre-page>
    <demo-type-menu></demo-type-menu>
    <control-panel :options="checkedChartOption"></control-panel>
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
import ControlPanel from "@/components/ControlPanel.vue";
import BarChart from "@/components/ChartModels/BarChart.vue";

@Component({
  components: { BarChart, ControlPanel, LineChart, DemoTypeMenu, DragResize, PrePage, ToolBar }
})
export default class Index extends Vue {
  pageScale: number = 70;
  charts: any[] = [
    {
      type: "chart",
      title: "线性图",
      size: {
        width: 400,
        height: 320
      },
      position: {
        x: 200,
        y: 111
      },
      zIndex: 10,
      fontSize: 12,
      background: {
        opacity: 0.8,
        borderRadius: 8
      },
      style: {
        id: "test-line-style-1",
        name: "black"
      },
      chartOptions: {
        type: "line",
        unit: "Pa",
        axis: true,
        split: false,
        animation: true,
        smooth: false,
        userDefined: {}
      }
    },
    {
      type: "chart",
      title: "柱状图",
      size: {
        width: 520,
        height: 380
      },
      position: {
        x: 900,
        y: 400
      },
      zIndex: 11,
      fontSize: 12,
      background: {
        opacity: 0.8,
        borderRadius: 8
      },
      style: {
        id: "test-bar-style-1",
        name: "black"
      },
      chartOptions: {
        type: "bar",
        unit: "万元",
        axis: true,
        split: false,
        animation: true,
        smooth: false,
        userDefined: {}
      }
    }
  ];
  active: string = "";
  checkedChartOption: any = { type: "background" };

  amplificationPage() {
    this.pageScale += 10;
  }
  narrowPage() {
    this.pageScale -= 10;
  }
  configChartOption(chart: any, index: number) {
    this.checkedChartOption = chart;
    this.active = chart.title;
  }
  configDragging(chart: any, data: any) {
    this.active = chart.title;
    chart.size = data.size;
    chart.position = data.position;
    this.checkedChartOption = chart;
  }
  configResize(chart: any, data: any) {
    chart.size = data.size;
    chart.position = data.position;
    this.checkedChartOption = chart;
  }
  configResizeEnd(chart: any, data: any) {}
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
      /*width: 400px;*/
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
