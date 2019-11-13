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
  @Prop({ type: Array })
  colors!: string[];
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
    if (this.backgroundOpacity !== 0) {
      style.background = `linear-gradient(45deg, ${colors[this.backgroundStyle].background.join(",")})`;
    }

    if (this.lineChart) this.lineChart.resize();
    return style;
  }

  get chartStyles() {
    let style: any = {};
    style.width = `${this.width}px`;
    style.height = `${this.height - 40}px`;
    return style;
  }

  mounted() {
    this.lineChart = echarts.init(this.$refs["line"] as any);
  }
  setOptions(data: any) {
    this.$nextTick(() => {
      this.lineChart.setOption({
        color: colors[this.backgroundStyle].chart,
        animation: this.animation,
        animationDelayUpdate: function(idx: number) {
          return idx * 5;
        },
        legend: {
          data: data.legend,
          top: 16,
          textStyle: {
            fontSize: this.fontSize,
            color: "#ffffff",
            rich: this.legendRich ? this.legendRich : {}
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
          data: data.label,
          show: this.showAxis,
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
          show: this.showAxis,
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
        series: data.value.map((i: number[], k: number) => {
          return {
            data: i,
            type: "line",
            name: data.legend[k]
          };
        })
      });
    });
  }
  @Watch("data", { immediate: true, deep: true })
  handleData(val: any) {
    if (val && this.lineChart) {
      this.setOptions(val);
    } else {
      this.setOptions(this.defaultData);
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
}
.line-chart {
  overflow: hidden;
}
</style>
