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
        v-if="clearable && currentValue && isFocus"
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
    // this.isFocus = false;
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
