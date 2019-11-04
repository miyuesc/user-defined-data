<template>
  <form :class="classes"><slot></slot></form>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop, Provide, Watch } from "vue-property-decorator";
import { oneOf } from "@/utils/utils";

@Component({})
export default class MForm extends Vue {
  @Prop({ type: Object })
  model!: any;
  @Prop({ type: Object })
  rules!: any;
  @Prop({ type: Number })
  labelWidth!: number;
  @Prop({ type: Boolean })
  inline!: boolean;
  @Prop({ type: Boolean, default: true })
  showMessage!: boolean;
  @Prop({
    type: String,
    default: "right",
    validator(value: string): boolean {
      return oneOf(value, ["left", "right", "top"]);
    }
  })
  labelPosition!: string;

  // form: any = this;
  prefixCls: string = "m-form";
  fields: any[] = [];

  get classes() {
    return [
      `${this.prefixCls}`,
      `${this.prefixCls}-label-${this.labelPosition}`,
      {
        [`${this.prefixCls}-inline`]: this.inline
      }
    ];
  }

  resetFields() {
    this.fields.forEach((field: any) => {
      field.resetField();
    });
  }
  validate(callback?: Function) {
    return new Promise(resolve => {
      let valid: boolean = true;
      let count: number = 0;
      this.fields.forEach(field => {
        field.validate((e: string = "", errors: any) => {
          if (errors) {
            valid = false;
          }
          if (++count === this.fields.length) {
            // all finish
            resolve(valid);
            if (typeof callback === "function") {
              callback(valid);
            }
          }
        });
      });
    });
  }
  validateField(prop: any, cb: any) {
    const field = this.fields.filter(field => field.prop === prop)[0];
    if (!field) {
      throw new Error("[iView warn]: must call validateField with valid prop string!");
    }
    field.validate("", cb);
  }

  @Watch("rules", { deep: true })
  handleRules() {
    this.validate();
  }
  created() {
    this.$on("on-form-item-add", (field: any) => {
      if (field) this.fields.push(field);
      return false;
    });
    this.$on("on-form-item-remove", (field: any) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
      return false;
    });
  }

  @Provide("form")
  form: any = this;
}
</script>

<style scoped lang="less"></style>
