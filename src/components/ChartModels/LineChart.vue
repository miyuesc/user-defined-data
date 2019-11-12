<template>
  <div ref="line"></div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class LineChart extends Vue {
  @Prop({ type: String, default: "" })
  height!: string;
  @Prop({ type: String, default: "" })
  width!: string;
  @Prop({ type: Array })
  colors!: string[];
  @Prop({ type: String })
  backgroundStyle!: string;
  @Prop({ type: Number })
  backgroundOpacity!: number;
  @Prop({ type: String })
  title!: string;
}
</script>

<style scoped lang="less"></style>
