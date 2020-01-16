<template>
  <div class="control-panel">
    <div class="panel-title">{{ panelTitle }}</div>
    <template v-if="selfData.type !== 'background'">
      <style-config />
      <size-and-position :position="selfData.position" :size="selfData.size" @change="returnChangeOptions" />
      <title-and-font :font-size="selfData.fontSize" :title="selfData.title" @change="returnChangeOptions" />
      <div class="control-option-item">
        <p class="control-option-item-title">背景</p>
        <div class="background-control control-children">
          <p>透明度</p>
          <m-input size="mini" m-style="dark" />
          <p>圆角</p>
          <m-input size="mini" m-style="dark" />
        </div>
      </div>
      <chart-option-config :chart-options="options.chartOptions" v-model="selfData.chartOptions" />
      <div class="control-option-item">
        <p class="control-option-item-title">自定义</p>
        <m-input size="mini" m-style="dark" />
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
import SizeAndPosition from "@/components/controlModels/SizeAndPosition.vue";
import StyleConfig from "@/components/controlModels/StyleConfig.vue";
import TitleAndFont from "@/components/controlModels/TitleAndFont.vue";

@Component({
  components: { TitleAndFont, StyleConfig, SizeAndPosition, ChartOptionConfig }
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
