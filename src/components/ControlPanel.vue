<template>
  <div class="control-panel">
    <div class="panel-title">{{ panelTitle }}</div>
    <div class="control-option-item chart-style">
      <p class="control-option-item-title">样式</p>
      <div class="chart-style-item checked"></div>
    </div>
    <div class="control-option-item" v-if="selfData.divConfig">
      <p class="control-option-item-title">位置</p>
      <div class="control-position">
        <p>X轴</p>
        <input v-model="selfData.divConfig.left" @change="returnChangeOptions" />
        <p>Y轴</p>
        <input v-model="selfData.divConfig.top" @change="returnChangeOptions" />
      </div>
      <div class="control-size">
        <p>高</p>
        <input disabled v-model="selfData.divConfig.height" @change="returnChangeOptions" />
        <p>宽</p>
        <input disabled v-model="selfData.divConfig.width" @change="returnChangeOptions" />
      </div>
    </div>
    <div class="control-option-item">
      <p class="control-option-item-title">标题</p>
      <input type="textarea" />
    </div>
    <div class="control-option-item">
      <p class="control-option-item-title">字体</p>
    </div>
    <div class="control-option-item">
      <p class="control-option-item-title">背景</p>
      <div class="background-control control-children">
        <p>透明度</p>
        <p>圆角</p>
      </div>
    </div>
    <div class="control-option-item">
      <p class="control-option-item-title">图表</p>
      <div class="chart-control control-children">
        <div>
          <p>单位</p>
          <input style="width: 100px" />
        </div>
        <div>
          <p>曲线</p>
          <m-switch type="cool"></m-switch>
        </div>
        <div>
          <p>坐标轴</p>
          <m-switch type="cool"></m-switch>
        </div>
        <div>
          <p>分割线</p>
          <m-switch type="cool"></m-switch>
        </div>
        <div>
          <p>动画</p>
          <m-switch type="cool"></m-switch>
        </div>
      </div>
    </div>
    <div class="control-option-item">
      <p class="control-option-item-title">自定义</p>
    </div>
    <div class="control-option-item">
      <p class="control-option-item-title">数据</p>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class ControlPanel extends Vue {
  @Prop({ type: Object })
  options!: any;

  selfData: any = this.options;

  get panelTitle() {
    if (this.options && this.options.type === "chart") return "图表配置";
    if (this.options && this.options.type === "background") return "场景配置";
    if (this.options && this.options.type === "table") return "表格配置";
    return "背景配置";
  }

  returnChangeOptions() {
    this.$emit("input", this.selfData);
    this.$emit("change", this.selfData);
  }

  @Watch("options", { immediate: true, deep: true })
  handle(val: any) {
    this.selfData = val;
  }
}
</script>

<style scoped lang="less">
.control-panel {
  position: fixed;
  top: 42px;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: calc(100vh - 40px);
  overflow-y: auto;
  background: #201f2d;
  color: #b0b0b0;
  font-weight: lighter;
  .panel-title {
    width: 100%;
    height: 40px;
    color: #e3e3e3;
    font-size: 16px;
    line-height: 40px;
    background: #272727;
  }
  .control-option-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 12px 20px;
    align-items: flex-start;
    .control-option-item-title {
      font-size: 14px;
    }
  }
  .chart-style-item {
    width: 280px;
    height: 180px;
    background: #000000;
    border-radius: 4px;
    align-self: center;
    margin: 6px 0;
  }
  .control-children {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .control-position,
  .control-size {
    display: inline-flex;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 6px 0;
    p {
      display: block;
      width: 40px;
      padding: 0 8px;
      text-align: right;
      line-height: 28px;
    }
    input {
      width: 100px;
    }
  }
  input {
    text-align: left;
    background: black;
    border: 1px solid #2c3e50;
    &:focus {
      border: 1px solid #419cd6;
    }
    &:disabled {
      color: #bfbfbf;
    }
  }
  .chart-control {
    div {
      width: 100%;
      display: inline-flex;
    }
    p {
      display: block;
      width: 80px;
      padding: 0 8px;
      box-sizing: content-box;
      text-align: right;
    }
  }
}
</style>
