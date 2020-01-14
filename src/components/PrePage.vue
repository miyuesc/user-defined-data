<template>
  <div class="pre-page-container" :style="styles">
    <slot></slot>
    <canvas id="demo-canvas" class="pre-page-background" @click.prevent="$emit('click')"></canvas>
  </div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { draw } from "@/utils/drawCanvas";

@Component({})
export default class PrePage extends Vue {
  @Prop({ type: Number, default: 0.7 })
  scale!: number;

  get styles() {
    return {
      transform: `translateX(-50%) translateY(-50%) scale(${this.scale})`
    };
  }

  mounted() {
    draw();
  }
}
</script>

<style scoped lang="less">
.pre-page-container {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 1920px;
  height: 1080px;
  /*background: #2c1b47;*/
  /*transform: translateX(-50%) translateY(-50%);*/
  background-image: linear-gradient(45deg, rgba(118, 194, 215, 0.8) 10%, rgba(136, 238, 194, 0.8) 92%);
  /*background: #363256 rgba(94, 110, 220, 0.5);*/
  transition: all ease 0.2s;
  z-index: -1;
  .pre-page-background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    left: 0;
    top: 0;
  }
}
</style>
