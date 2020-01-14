<template>
  <div class="control-panel">
    <div class="panel-title">{{ panelTitle }}</div>
    <div class="control-option-item chart-style">
      <p class="control-option-item-title">样式</p>
      <div class="chart-style-item checked"></div>
    </div>
    <template v-if="selfData.type !== 'background'">
      <div class="control-option-item">
        <p class="control-option-item-title">位置</p>
        <div class="control-position">
          <p>X轴</p>
          <m-input size="mini" m-style="dark" v-model="selfData.position.x" @change="returnChangeOptions" :clearable="false" />
          <p>Y轴</p>
          <m-input size="mini" m-style="dark" v-model="selfData.position.y" @change="returnChangeOptions" :clearable="false" />
        </div>
        <div class="control-size">
          <p>高</p>
          <m-input size="mini" m-style="dark" disabled v-model="selfData.size.height" @change="returnChangeOptions" />
          <p>宽</p>
          <m-input size="mini" m-style="dark" disabled v-model="selfData.size.width" @change="returnChangeOptions" />
        </div>
      </div>
      <div class="control-option-item">
        <p class="control-option-item-title">标题</p>
        <m-input m-style="dark" size="small" v-model="selfData.title" />
      </div>
      <div class="control-option-item">
        <p class="control-option-item-title">字体</p>
        <m-input m-style="dark" size="mini" v-model="selfData.fontSize"></m-input>
      </div>
      <div class="control-option-item">
        <p class="control-option-item-title">背景</p>
        <div class="background-control control-children">
          <p>透明度</p>
          <m-input size="mini" m-style="dark"></m-input>
          <p>圆角</p>
          <m-input size="mini" m-style="dark"></m-input>
        </div>
      </div>
      <chart-option-config :chart-options="options.chartOptions" v-model="selfData.chartOptions"></chart-option-config>
      <div class="control-option-item">
        <p class="control-option-item-title">自定义</p>
        <m-input size="mini" m-style="dark"></m-input>
      </div>
      <div class="control-option-item">
        <p class="control-option-item-title">数据</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";
import ChartOptionConfig from "@/components/controlModels/ChartOptionConfig.vue";

@Component({
  components: { ChartOptionConfig }
})
export default class ControlPanel extends Vue {
  // @Prop({ type: Object })
  // options!: any;
  @Model("input")
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
@import "../../src/assets/styles/control-penal.less";
</style>
