<template>
  <button
    ref="MButton"
    class="m-button"
    :class="[
      `m-button__${size}`,
      `${active && !disabled ? 'm-button-active' : ''}`,
      `${disabled ? 'm-button-disabled' : ''}`,
      { 'is-circle': circle, 'is-round': round }
    ]"
    :style="{
      background: bgColor[`${this.type}`],
      color: this.type === 'normal' ? '#000' : '#fff',
      borderRadius: this.circle ? '50%' : ''
    }"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
/**
 * @Description:
 * @Author:
 * @Date: ${Date.date()}
 **/

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class MButton extends Vue {
  @Prop({ type: String, default: "middle" })
  size!: string;
  @Prop({ type: String, default: "primary" })
  type!: string;
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;
  @Prop({ type: Boolean, default: false })
  round!: boolean;
  @Prop({ type: Boolean, default: false })
  circle!: boolean;
  @Prop({ type: Boolean, default: true })
  active!: boolean;

  bgColor: any = {
    normal: "rgba(255, 255, 255, 1)",
    primary: "rgba(83,129,255, 1)",
    warning: "rgb(255,90,20)",
    error: "rgba(255,60,58, 1)",
    disable: "rgba(181,181,181, 1)",
    cool: "rgba(252, 47, 112, 1)"
  };

  handleClick(ev: any) {
    this.$emit("click", ev);
  }
}
</script>
