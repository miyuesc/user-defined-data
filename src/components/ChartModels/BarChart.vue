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
    return {
      legend: {
        data: ["FT101", "FT102", "总和"],
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
        left: 20,
        bottom: 20,
        right: 20,
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["2019 6-10", "2019 6-11", "2019 6-12", "2019 6-13", "2019 6-14", "2019 6-15"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid"
            }
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#00c7ff"
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#0F55B9"
            }
          }
        }
      ],
      series: [
        {
          name: "FT101",
          type: "bar",
          data: [220, 120, 240, 266, 210, 246],
          barWidth: 16, //柱子宽度
          barGap: 1, //柱子之间间距
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00C7E1"
                },
                {
                  offset: 1,
                  color: "#005193"
                }
              ]),
              opacity: 1,
              barBorderRadius: 12
            }
          }
        },
        {
          name: "FT102",
          type: "bar",
          data: [130, 150, 220, 245, 136, 256],
          barWidth: 16,
          barGap: 1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00da9c"
                },
                {
                  offset: 1,
                  color: "#007a55"
                }
              ]),
              opacity: 1,
              barBorderRadius: 12
            }
          }
        },
        {
          name: "总和",
          type: "bar",
          data: [350, 270, 460, 511, 346, 502, 50],
          barWidth: 16,
          barGap: 1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#7CB8F8"
                },
                {
                  offset: 1,
                  color: "#051B8F"
                }
              ]),
              opacity: 1,
              barBorderRadius: 12
            }
          }
        }
      ]
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
  handleChange() {
    this.setOptions();
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
  padding: 6px 24px;
  overflow: hidden;
  opacity: 1;
  position: relative;
}
.bar-chart {
  overflow: hidden;
  opacity: 1;
  position: relative;
}
</style>
