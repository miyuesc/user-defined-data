<template>
  <div class="control-option-item">
    <p class="control-option-item-title">位置</p>
    <div class="control-position">
      <p>X轴</p>
      <m-input size="mini" m-style="dark" v-model="selfPosition.x" @change="returnChangeOptions" :clearable="false" />
      <p>Y轴</p>
      <m-input size="mini" m-style="dark" v-model="selfPosition.y" @change="returnChangeOptions" :clearable="false" />
    </div>
    <div class="control-size">
      <p>高</p>
      <m-input size="mini" m-style="dark" disabled v-model="selfSize.height" @change="returnChangeOptions" />
      <p>宽</p>
      <m-input size="mini" m-style="dark" disabled v-model="selfSize.width" @change="returnChangeOptions" />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class SizeAndPosition extends Vue {
  @Prop({ type: Object, default: () => [200, 200] })
  position!: { x?: number; y?: number };
  @Prop({ type: Object, default: () => [520, 380] })
  size!: { width?: number; height?: number };

  selfPosition: { x?: number; y?: number } = {};
  selfSize: { width?: number; height?: number } = {};

  returnChangeOptions() {
    this.$emit("input", {
      position: this.selfPosition,
      size: this.selfSize
    });
    this.$emit("change", {
      position: this.selfPosition,
      size: this.selfSize
    });
  }

  @Watch("position", { immediate: true, deep: true })
  handleChangePosition() {
    this.selfPosition = this.position;
  }

  @Watch("size", { immediate: true, deep: true })
  handleChangeSize() {
    this.selfSize = this.size;
  }
}
</script>

<style scoped lang="less">
@import "../../../src/assets/styles/control-penal.less";
.control-position,
.control-size {
  display: inline-flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 6px 0;
  p {
    display: block;
    width: 80px;
    padding: 0 8px;
    text-align: right;
    line-height: 28px;
  }
  input {
    width: 100px;
  }
}
input {
  text-align: left;
  background: black;
  border: 1px solid #2c3e50;
  &:focus {
    border: 1px solid #419cd6;
  }
  &:disabled {
    color: #bfbfbf;
  }
}
</style>
