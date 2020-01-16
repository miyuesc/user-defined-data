<template>
  <div class="control-option-item">
    <p class="control-option-item-title">图表</p>
    <div class="chart-control control-children">
      <div class="control-children-item">
        <p>单位</p>
        <m-switch v-model="optionSelf.showUnit" @change="returnOptions"></m-switch>
        <transition name="move">
          <m-input v-show="optionSelf.showUnit" m-style="dark" :clearable="false" size="mini" v-model="optionSelf.unit" @change="returnOptions" />
        </transition>
      </div>
      <template v-if="optionSelf.type === 'line'">
        <div class="control-children-item">
          <p>曲线</p>
          <m-switch v-model="optionSelf.smooth" @change="returnOptions"></m-switch>
        </div>
      </template>
      <template v-if="optionSelf.type === 'bar'">
        <div class="control-children-item">
          <p>堆叠</p>
          <m-switch v-model="optionSelf.stacked" @change="returnOptions"></m-switch>
        </div>
        <div class="control-children-item">
          <p>渐变</p>
          <m-switch v-model="optionSelf.shadow" @change="returnOptions"></m-switch>
        </div>
      </template>
      <div class="control-children-item">
        <p>坐标轴</p>
        <m-switch v-model="optionSelf.axis" @change="returnOptions"></m-switch>
      </div>
      <div class="control-children-item">
        <p>分割线</p>
        <m-switch v-model="optionSelf.split" @change="returnOptions"></m-switch>
      </div>
      <div class="control-children-item">
        <p>动画</p>
        <m-switch v-model="optionSelf.animation" @change="returnOptions"></m-switch>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Model, Watch } from "vue-property-decorator";
import { ChartOptions } from "@/interface/chartOptions";

@Component({})
export default class ChartOptionConfig extends Vue {
  @Model("input")
  chartOptions!: ChartOptions;

  optionSelf: ChartOptions = this.chartOptions;

  @Watch("chartOptions", { immediate: true, deep: true })
  changeChart(val: ChartOptions) {
    this.optionSelf = val;
  }

  returnOptions() {
    this.$emit("input", this.optionSelf);
    this.$emit("change", this.optionSelf);
  }
}
</script>

<style scoped lang="less">
@import "../../../src/assets/styles/control-penal.less";
.control-children-item {
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
  height: 40px;
  align-items: center;
  p {
    width: 60px;
    padding: 0 8px;
    line-height: 28px;
    text-align: right;
    display: inline-block;
    font-size: 12px;
  }
}
/deep/ .m-input {
  width: calc(100% - 120px);
}
/deep/ .m-input__content {
  font-size: 12px;
}
/deep/ .m-switch__background {
  background: #2c3e50;
}
/deep/ input[type="checkbox"].m-switch__inner:checked + .m-switch__background {
  background: #506e8a;
}
.switch {
  transform: scale(0.8);
}
</style>
