<template>
  <div class="m-input">
    <div class="m-input__label">{{ label }}</div>
    <div class="m-input__content">
      <input
        :type="type"
        ref="MInput"
        v-model="value"
        :required="required"
        :maxlength="maxLength"
        :disabled="disabled"
        @blur="blurFn()"
        @click="clickFn()"
        @focus="focusFn()"
        @keyup.enter="enterFn()"
        @input="changeFn()"
      />
      <span class="bottom"></span>
      <span class="right"></span>
      <span class="top"></span>
      <span class="left"></span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";

@Component
export default class MInput extends Vue {
  @Prop({ type: String, default: "" })
  label!: string;
  @Prop({ type: String, default: "text" })
  type!: string;
  @Prop({ type: Boolean, default: false })
  required!: boolean;
  @Prop({ type: Number })
  maxLength!: number;
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Model("input")
  modelValue!: string;

  value: string = this.modelValue;

  focusFn() {
    this.$emit("focus", this.value);
    this.returnValue();
  }
  blurFn() {
    this.$emit("blur", this.value);
    this.returnValue();
  }
  clickFn() {
    this.$emit("click", this.value);
    this.returnValue();
  }
  enterFn() {
    this.$emit("enter", this.value);
    this.returnValue();
  }
  changeFn() {
    this.$emit("change", this.value);
    this.returnValue();
  }
  returnValue() {
    this.$emit("input", this.value);
  }
}
</script>

<style scoped>
.m-input {
  display: flex;
  width: 100%;
  flex-direction: row;
  box-sizing: border-box;
  padding: 4px 8px;
}

.m-input__label {
  font-family: "PingFang SC0", "Microsoft YaHei UI", sans-serif;
  color: white;
  box-sizing: border-box;
  padding: 6px;
  /*line-height: 1rem;*/
  /*font-size: 1rem;*/
}

.m-input__content {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #fc2f70;
}

input:focus ~ .m-input__content {
  border-bottom: none;
}

input {
  width: 100%;
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
}

input:focus {
  outline: none;
}

input::placeholder {
  color: hsla(0, 0%, 100%, 0.6);
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
</style>
