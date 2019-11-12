<template>
  <div class="pre-page-container" :style="styles"></div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class PrePage extends Vue {
  @Prop({ type: Number, default: 0.7 })
  scale!: number;

  get styles() {
    return {
      transform: `translateX(-50%) translateY(-50%) scale(${this.scale})`
    };
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
  background: #2c1b47;
  /*transform: translateX(-50%) translateY(-50%);*/
  transition: all ease 0.2s;
  z-index: -1;
}
</style>
