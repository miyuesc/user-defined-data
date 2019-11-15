<template>
  <div :style="styles">
    <div class="header">
      <p class="chart-title" :style="{ fontSize: `${fontSize + 6}px` }">{{ title }}</p>
      <p class="chart-unit" v-show="showUnit">单位：{{ unit }}</p>
    </div>
    <div class="line-chart" ref="line" :style="chartStyles"></div>
  </div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import echarts from "echarts";
import { colors } from "@/utils/background";

@Component({})
export default class LineChart extends Vue {
  @Prop({ type: Number, default: 280 })
  height!: number;
  @Prop({ type: Number, default: 420 })
  width!: number;
  @Prop({ type: String, default: "lightblue" })
  backgroundStyle!: string;
  @Prop({ type: Number, default: 1 })
  backgroundOpacity!: number;
  @Prop({ type: Number, default: 8 })
  borderRadius!: number;
  @Prop({ type: Number, default: 12 })
  fontSize!: number;
  @Prop({ type: String })
  title!: string;
  @Prop({ type: String })
  unit!: string;
  @Prop({ type: Boolean, default: false })
  smooth!: boolean;
  @Prop({ type: Boolean, default: false })
  showLine!: boolean;
  @Prop({ type: Boolean, default: true })
  showAxis!: boolean;
  @Prop({ type: Boolean, default: true })
  showUnit!: boolean;
  @Prop({ type: Boolean, default: true })
  animation!: boolean;
  @Prop({ type: Object })
  data!: any;
  @Prop({ type: String })
  url!: string;

  @Prop({ type: Object })
  legendRich!: any;
  @Prop({ type: Object })
  itemRich!: any;
  @Prop({ type: Object })
  emphasisRich!: any;

  lineChart: any = null;
  defaultData: any = {
    legend: ["选项一", "选项二"],
    label: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    value: [[7, 10, 6, 3, 15, 8, 6], [12, 17, 9, 5, 11, 9, 10]]
  };

  get styles() {
    let style: any = {};
    style.width = `${this.width}px`;
    style.height = `${this.height}px`;
    style.borderRadius = `${this.borderRadius}px`;
    if (this.backgroundOpacity !== 1) {
      let opacity: string[] = colors[this.backgroundStyle].background.split(",");
      opacity[3] = `${this.backgroundOpacity})`;
      style.background = opacity.join(",");
    } else {
      style.background = colors[this.backgroundStyle].background;
    }

    if (this.lineChart)
      setTimeout(() => {
        this.lineChart.resize();
        this.setOptions();
      }, 1);
    return style;
  }

  get chartStyles() {
    let style: any = {};
    style.width = `${this.width}px`;
    style.height = `${this.height - 40}px`;
    return style;
  }

  get chartOptions() {
    let color: string[] = colors[this.backgroundStyle].chart;
    let legendRich: any = this.legendRich ? this.legendRich : {};
    let fontSize: number = this.fontSize;
    let axisStatus: boolean = this.showAxis;
    let chartAnimation: boolean = this.animation;
    return {
      color: color,
      animation: chartAnimation,
      animationDelayUpdate: function(idx: number) {
        return idx * 5;
      },
      legend: {
        data: this.defaultData.legend,
        top: 16,
        icon: "circle",
        textStyle: {
          fontSize: fontSize,
          color: "#ffffff",
          rich: legendRich
        }
      },
      grid: {
        top: 60,
        left: 20,
        bottom: 20,
        right: 20,
        containLabel: true
      },
      xAxis: {
        data: this.defaultData.label,
        show: axisStatus,
        axisLabel: {
          color: "#ffffff"
        },
        axisLine: {
          lineStyle: {
            color: "#ffffff"
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        show: axisStatus,
        axisLabel: {
          color: "#ffffff"
        },
        axisLine: {
          lineStyle: {
            color: "#ffffff"
          }
        },
        splitLine: {
          show: false
        }
      },
      series: this.defaultData.value.map((i: number[], k: number) => {
        return {
          data: i,
          type: "line",
          name: this.defaultData.legend[k]
        };
      })
    };
  }

  mounted() {
    this.lineChart = echarts.init(this.$refs["line"] as any);
  }
  setOptions() {
    this.$nextTick(() => {
      this.lineChart.setOption(this.chartOptions);
    });
  }
  @Watch("data", { immediate: true, deep: true })
  handleData(val: any) {
    if (val && this.lineChart) {
      this.setOptions();
    } else {
      this.setOptions();
    }
  }
}
</script>

<style scoped lang="less">
.header {
  height: 40px;
  max-height: 40px;
  width: 100%;
  color: #ffffff;
  display: inline-flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 6px 24px;
  overflow: hidden;
  opacity: 1;
  position: relative;
}
.line-chart {
  overflow: hidden;
  opacity: 1;
  position: relative;
}
</style>
