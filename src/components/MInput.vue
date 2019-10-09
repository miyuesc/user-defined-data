<template>
  <div class="m-input">
    <input
      :type="type"
      class="m-input__content"
      ref="MInput"
      v-model="value"
      required="required"
      @blur="blurFn()"
      @keyup.enter.native="changed()"
    />
    <label :for="label" class="m-input__label">{{ label }}</label>
    <div class="m-input__bar"></div>
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

  @Model("input")
  value!: string;

  blurFn() {
    this.$emit("blur", this.value);
    this.returnValue();
  }
  changed() {
    this.$emit("enter", this.value);
    this.returnValue();
  }
  returnValue() {
    this.$emit("input", this.value);
  }
}
</script>

<style scoped lang="less"></style>
