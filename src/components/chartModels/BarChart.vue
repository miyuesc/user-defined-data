<template>
  <div :style="styles">
    <div class="header">
      <p class="chart-title" :style="{ fontSize: `${fontSize + 6}px` }">{{ title }}</p>
      <p class="chart-unit" v-show="chartOptions.showUnit">单位：{{ chartOptions.unit }}</p>
    </div>
    <div class="bar-chart" ref="bar" :style="chartStyles"></div>
  </div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ChartOptions } from "@/interface/chartOptions";
import echarts from "echarts";
import { colors } from "@/utils/background";

@Component({})
export default class BarChart extends Vue {
  @Prop({ type: String })
  title!: string;
  @Prop({ type: Object })
  chartSize!: { width: number; height: number };
  @Prop({
    type: Object,
    default: () => {
      return { type: "bar", showUnit: true };
    }
  })
  chartOptions!: ChartOptions;
  @Prop({
    type: Object,
    default: () => {
      return { id: "jaskjdhajsgd", name: "lightblue" };
    }
  })
  chartStyle!: { id: string; name: string };
  @Prop({
    type: Object,
    default: () => {
      return { opacity: 1, borderRadius: 8 };
    }
  })
  background!: { opacity: number; borderRadius: number };
  @Prop({ type: Number, default: 12 })
  fontSize!: number;

  barChart: any = null;
  defaultData: any = {
    legend: ["选项一", "选项二"],
    label: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    value: [[7, 10, 6, 3, 15, 8, 6], [12, 17, 9, 5, 11, 9, 10]]
  };

  get styles() {
    let style: any = {};
    style.width = `${this.chartSize.width}px`;
    style.height = `${this.chartSize.height}px`;
    style.borderRadius = `${this.background.borderRadius}px`;
    if (this.background.opacity !== 1) {
      let opacity: string[] = colors[this.chartStyle.name].background.split(",");
      opacity[3] = `${this.background.opacity})`;
      style.background = opacity.join(",");
    } else {
      style.background = colors[this.chartStyle.name].background;
    }

    if (this.barChart)
      setTimeout(() => {
        this.barChart.resize();
        // this.setOptions();
      }, 1);
    return style;
  }
  get chartStyles() {
    let style: any = {};
    style.width = `${this.chartSize.width}px`;
    style.height = `${this.chartSize.height - 40}px`;
    return style;
  }
  get chartOption() {
    let fontSize = this.fontSize;
    let showAxis: boolean = this.chartOptions.axis || false;
    let showSplit: boolean = this.chartOptions.split || false;
    let animation: boolean = this.chartOptions.animation || false;
    let stacked: boolean = this.chartOptions.stacked || false;
    let shadow: boolean = this.chartOptions.shadow || false;
    let color: any = colors[this.chartStyle.name].chart;
    return {
      color: color,
      animation: animation,
      legend: {
        data: this.defaultData.legend,
        top: 16,
        icon: "circle",
        textStyle: {
          fontSize: fontSize,
          color: "#ffffff"
          // rich: legendRich
        }
      },
      grid: {
        top: 60,
        left: 40,
        bottom: 24,
        right: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: this.defaultData.label,
          axisLine: {
            show: showSplit ? false : showAxis,
            lineStyle: {
              color: ["rgba(227,202,255,0.6)"]
            }
          },
          axisTick: {
            show: showAxis || false
          },
          axisLabel: {
            show: showSplit ? true : showAxis,
            textStyle: {
              color: "#bfbfbf"
            }
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: {
        type: "value",
        axisTick: {
          show: false
        },
        axisLine: {
          show: showAxis || false,
          lineStyle: {
            color: ["rgba(227,202,255,0.6)"]
          }
        },
        splitLine: {
          show: showSplit,
          lineStyle: {
            color: ["rgba(227,202,255,0.6)"],
            type: "dashed"
          }
        },
        axisLabel: {
          show: showSplit ? true : showAxis,
          textStyle: {
            color: "#bfbfbf"
          }
        }
      },
      series: this.defaultData.value.map((i: number[], k: number) => {
        if (shadow) {
          return {
            data: i,
            type: "bar",
            name: this.defaultData.legend[k],
            barWidth: 16, //柱子宽度
            barGap: stacked ? `-${100 * k}%` : "0%",
            itemStyle: {
              normal: {
                barBorderRadius: [8, 8, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color[k]
                  },
                  {
                    offset: 1,
                    color: color[k] + "3f"
                  }
                ])
              }
            }
          };
        }
        return {
          data: i,
          type: "bar",
          name: this.defaultData.legend[k],
          barWidth: 16, //柱子宽度
          barGap: stacked ? `-${100 * k}%` : "0%"
        };
      })
    };
  }
  mounted() {
    this.barChart = echarts.init(this.$refs["bar"] as any);
  }
  setOptions() {
    this.$nextTick(() => {
      this.barChart.setOption(this.chartOption);
    });
  }
  @Watch("chartOption", { immediate: true, deep: true })
  handleChange(val: any) {
    if (val && this.barChart) {
      this.barChart.clear();
      this.setOptions();
    } else {
      this.setOptions();
    }
  }
  @Watch("chartSize", { immediate: true, deep: true })
  handleChangeSize() {
    if (this.barChart)
      setTimeout(() => {
        this.barChart.resize();
        // this.setOptions();
      }, 1);
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
  padding: 10px 40px 6px;
  overflow: hidden;
  opacity: 1;
  position: relative;
  p {
    line-height: 24px;
  }
}
.bar-chart {
  overflow: hidden;
  opacity: 1;
  position: relative;
}
</style>
