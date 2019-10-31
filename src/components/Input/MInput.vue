<template>
  <div class="m-input">
    <slot name="prefix"></slot>
    <div
      class="m-input__content"
      :class="disabled ? 'm-input-is-disabled' : ''"
    >
      <input
        :type="type"
        ref="MInput"
        :value="currentValue"
        :required="required"
        :maxlength="maxLength"
        :disabled="disabled"
        :readonly="readonly"
        @blur="blurFn"
        @click="clickFn"
        @focus="focusFn"
        @keyup.enter="enterFn"
        @keyup="keyupFn"
        @input="changeFn"
      />
      <span class="bottom"></span>
      <span class="right"></span>
      <span class="top"></span>
      <span class="left"></span>
      <span
        class="m-input__clear"
        v-if="clearable && currentValue"
        @click="handleClear"
      >
      </span>
    </div>
    <slot name="suffix"></slot>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";

@Component
export default class MInput extends Vue {
  @Prop({ type: String, default: "text" })
  type!: string;
  @Prop({ type: Boolean, default: false })
  required!: boolean;
  @Prop({ type: Number })
  maxLength!: number;
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;
  @Prop({ type: Boolean, default: false })
  readonly!: boolean;
  @Prop({ type: Boolean, default: false })
  clearable!: boolean;
  @Model("input")
  value!: string;
  currentValue: string = this.value;
  isFocus: boolean = false;

  blurFn(el: any) {
    this.isFocus = false;
    this.$emit("blur", el);
  }
  clickFn(el: any) {
    this.isFocus = true;
    this.$emit("click", el);
  }
  focusFn(el: any) {
    this.isFocus = true;
    this.$emit("focus", el);
  }
  enterFn(el: any) {
    this.$emit("enter", el);
  }
  keyupFn(el: any) {
    this.$emit("keyup", el);
  }
  changeFn(el: any) {
    this.$emit("input", el.target.value);
  }

  handleClear() {
    const e = { target: { value: "" } };
    this.$emit("input", "");
    this.setCurrentValue("");
    this.$emit("on-change", e);
    this.$emit("on-clear");
  }

  @Watch("value", { immediate: true, deep: true })
  changeValue(newValue: string) {
    this.setCurrentValue(newValue);
  }
  @Watch("currentValue", { immediate: true, deep: true })
  changeCurrentValue(newValue: string) {
    this.currentValue = newValue;
  }

  setCurrentValue(value: string) {
    if (value === this.currentValue) return;
    this.currentValue = value;
  }
}
</script>

<style scoped>
.m-input {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  box-sizing: border-box;
  padding: 4px 8px;
}

.m-input__content {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #fc2f70;
  display: inline-flex;
}

.m-input-is-disabled::before {
  content: "\1F6C7";
  color: #fc2f70;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
}

input:focus ~ .m-input__content {
  border-bottom: none;
}

input {
  /*width: 100%;*/
  width: inherit;
  height: 100%;
  color: white;
  font-family: inherit;
  background: rgba(255, 255, 255, 0);
  border: 1px solid transparent;
  transition: background-color 0.3s ease-in-out;
  position: relative;
  font-size: inherit;
  /*line-height: 1rem;*/
  padding: 6px;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

input:focus {
  outline: none;
}

input::placeholder {
  color: hsla(0, 0%, 100%, 0.6);
}

input:disabled {
  cursor: not-allowed;
  padding-right: 2.4rem !important;
  background: hsla(0, 0%, 90%, 0.1);
}
input:read-only {
  cursor: not-allowed;
  background: hsla(0, 0%, 90%, 0.1);
}

span {
  position: absolute;
  background-color: #fc2f70;
  transition: transform 0.1s ease;
}

.bottom,
.top {
  height: 1px;
  left: 0;
  right: 0;
  transform: scaleX(0);
}

.left,
.right {
  width: 1px;
  top: 0;
  bottom: 0;
  transform: scaleY(0);
}

.bottom {
  bottom: 0;
  transform-origin: bottom right;
  transition-delay: -0.05s;
}

input:focus ~ .bottom {
  transform-origin: bottom left;
  transform: scaleX(1);
}

.right {
  right: 0;
  transform-origin: top right;
  /*transition-delay: 0.05s;*/
}

input:focus ~ .right {
  transform-origin: bottom right;
  transform: scaleY(1);
}

.top {
  top: 0;
  transform-origin: top left;
  transition-delay: 0.05s;
}

input:focus ~ .top {
  transform-origin: top right;
  transform: scaleX(1);
}

.left {
  left: 0;
  transform-origin: bottom left;
  transition-delay: 0.15s;
}

input:focus ~ .left {
  transform-origin: top left;
  transform: scaleY(1);
}

.m-input__clear {
  width: 2rem;
  height: 100%;
  position: relative;
  background: none;
}
.m-input__clear:hover {
  cursor: pointer;
}
.m-input__clear::before,
.m-input__clear::after {
  content: "";
  position: absolute; /*方便进行定位*/
  height: 1.4rem;
  width: 0.2rem;
  top: 1rem;
  left: 0.4rem;
  transform: translateY(-50%);
  background: #fc2f70;
}
.m-input__clear::before {
  transform: rotate(45deg); /*进行旋转*/
}
.m-input__clear::after {
  transform: rotate(-45deg);
}
</style>
