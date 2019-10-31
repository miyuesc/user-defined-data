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

<style scoped>
.m-button {
  border: none;
  width: fit-content;
  border-radius: 4px;
  color: #ffffff;
  outline: none;
  overflow: hidden;
  transition: color 0.4s ease-in-out;
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  display: inline-block;
}
.m-button__middle {
  padding: 10px 18px;
}
.m-button__mini {
  padding: 4px 8px;
}
.m-button__small {
  padding: 6px 12px;
}
.m-button__big {
  padding: 12px 24px;
}

.m-button-active::before {
  content: "";
  z-index: -1;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: hsla(0, 0%, 100%, 0.2);
  transform-origin: center;
  transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 0);
  transition: transform 0.45s ease-in-out;
}

.m-button-active:hover {
  cursor: pointer;
}

.m-button-active:hover::before {
  transform: translate3d(-50%, -50%, 0) scale3d(15, 15, 15);
}

.m-button-disabled {
  cursor: not-allowed !important;
}

.m-button.is-round {
  border-radius: 25px;
}

.m-button.is-circle {
  border-radius: 50%;
}
</style>
