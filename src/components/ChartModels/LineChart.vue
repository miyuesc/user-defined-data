<template>
  <div class="line-chart" ref="line" :style="styles"></div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import echarts from "echarts";

@Component({})
export default class LineChart extends Vue {
  @Prop({ type: Number, default: 280 })
  height!: number;
  @Prop({ type: Number, default: 420 })
  width!: number;
  @Prop({ type: Array })
  colors!: string[];
  @Prop({ type: String })
  backgroundStyle!: string;
  @Prop({ type: Number })
  backgroundOpacity!: number;
  @Prop({ type: Number, default: 4 })
  borderRadius!: number;
  @Prop({ type: String })
  title!: string;
  @Prop({ type: Object })
  data!: any;
  @Prop({ type: String })
  url!: string;

  lineChart: any = null;
  defaultData: any = {
    legend: ["选项一", "选项二"],
    label: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    value: [[7, 10, 6, 3, 15, 8, 6], [12, 17, 9, 5, 11, 9, 10]]
  };

  get styles() {
    let style: { width?: string; height?: string } = {};
    style.width = `${this.width}px`;
    style.height = `${this.height}px`;
    if (this.lineChart) this.lineChart.resize();
    return style;
  }

  mounted() {
    this.lineChart = echarts.init(this.$refs["line"] as any);
  }
  setOptions(data: any) {
    this.$nextTick(() => {
      this.lineChart.setOption({
        legend: {
          data: data.legend
        },
        xAxis: {
          data: data.label
        },
        yAxis: {
          show: true
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

<style scoped lang="less"></style>
