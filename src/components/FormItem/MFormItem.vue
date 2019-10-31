<template>
  <div :class="classes">
    <label
      :class="[prefixCls + `-label`]"
      :for="labelFor"
      :style="labelStyles"
      v-if="label || $slots.label"
    >
      <slot name="label">{{ label }}</slot>
    </label>
    <div :class="[prefixCls + '-content']" :style="contentStyles">
      <slot></slot>
      <transition name="fade">
        <div
          :class="[prefixCls + '-error-tip']"
          v-if="validateState === 'error' && showMessage && form.showMessage"
        >
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import AsyncValidator from "async-validator";
import { Vue, Component, Prop, Inject, Watch } from "vue-property-decorator";
import { getPropByPath } from "@/utils/utils";
import Emitter from "@/mixins/emitter";

@Component({})
export default class MFormItem extends Emitter {
  @Prop({ type: String })
  label!: string;
  @Prop({ type: Number })
  labelWidth!: number;
  @Prop({ type: String })
  prop!: string;
  @Prop({ type: Boolean, default: false })
  required!: boolean;
  @Prop({ type: [Array, Object], default: false })
  rules!: [any[], any];
  @Prop({ type: String })
  error!: string;
  @Prop({ type: Boolean, default: true })
  showMessage!: boolean;
  @Prop({ type: String })
  labelFor!: string;

  @Inject("form")
  form!: any;

  prefixCls: string = "m-form-item";

  isRequired: boolean = false;
  validateState: string = "";
  validateMessage: string = "";
  validateDisabled: boolean = false;
  validator: any = {};

  get classes() {
    return [
      `${this.prefixCls}`,
      {
        [`${this.prefixCls}-required`]: this.required || this.isRequired,
        [`${this.prefixCls}-error`]: this.validateState === "error",
        [`${this.prefixCls}-validating`]: this.validateState === "validating"
      }
    ];
  }
  get fieldValue() {
    const model = this.form.model;
    if (model && this.prop) {
      let path = this.prop;
      if (path.indexOf(":") !== -1) {
        path = path.replace(/:/, ".");
      }
      return getPropByPath(model, path).v;
    }
    return null;
  }
  get labelStyles() {
    let style: any = {};
    const labelWidth =
      this.labelWidth === 0 || this.labelWidth
        ? this.labelWidth
        : this.form.labelWidth;
    if (labelWidth || labelWidth === 0) {
      style.width = `${labelWidth}px`;
    }
    return style;
  }
  get contentStyles() {
    let style: any = {};
    const labelWidth =
      this.labelWidth === 0 || this.labelWidth
        ? this.labelWidth
        : this.form.labelWidth;
    if (labelWidth || labelWidth === 0) {
      style.marginLeft = `${labelWidth}px`;
    }
    return style;
  }
  @Watch("error", { immediate: true })
  handleForError(val: string) {
    this.validateMessage = val;
    this.validateState = val ? "error" : "";
  }
  @Watch("validateStatus")
  handleForStatus(val: string) {
    this.validateState = val;
  }
  @Watch("rules", { deep: true })
  handleForRules(val: [any[], any]) {
    this.setRules();
  }

  setRules() {
    let rules = this.getRules();
    if (rules.length && this.required) {
      return;
    } else if (rules.length) {
      rules.every((rule: any) => {
        this.isRequired = rule.required;
      });
    } else if (this.required) {
      this.isRequired = this.required;
    }
    this.$off("on-form-blur", this.onFieldBlur);
    this.$off("on-form-change", this.onFieldChange);
    this.$on("on-form-blur", this.onFieldBlur);
    this.$on("on-form-change", this.onFieldChange);
  }
  getRules() {
    let formRules = this.form.rules;
    const selfRules = this.rules;
    formRules = formRules ? formRules[this.prop] : [];
    return [].concat([] || formRules || selfRules);
  }
  getFilteredRule(trigger: any) {
    const rules = this.getRules();
    return rules.filter(
      rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
    );
  }
  validate(trigger: any, callback = function() {}) {
    let rules = this.getFilteredRule(trigger);
    if (!rules || rules.length === 0) {
      if (!this.required) {
        callback();
        return true;
      } else {
        rules = [{ required: true }];
      }
    }
    this.validateState = "validating";
    let descriptor: any = {};
    descriptor[this.prop] = rules;
    const validator = new AsyncValidator(descriptor);
    let model: any = {};
    model[this.prop] = this.fieldValue;
    validator.validate(model, { firstFields: true }, errors => {
      this.validateState = !errors ? "success" : "error";
      this.validateMessage = errors ? errors[0].message : "";
      callback(this.validateMessage);
    });
    this.validateDisabled = false;
  }
  resetField() {
    this.validateState = "";
    this.validateMessage = "";
    let model = this.form.model;
    let value = this.fieldValue;
    let path = this.prop;
    if (path.indexOf(":") !== -1) {
      path = path.replace(/:/, ".");
    }
    let prop = getPropByPath(model, path);
    if (Array.isArray(value)) {
      this.validateDisabled = true;
      prop.o[prop.k] = [].concat(this.initialValue);
    } else {
      this.validateDisabled = true;
      prop.o[prop.k] = this.initialValue;
    }
  }
  onFieldBlur() {
    this.validate("blur");
  }
  onFieldChange() {
    if (this.validateDisabled) {
      this.validateDisabled = false;
      return;
    }
    this.validate("change");
  }

  mounted() {
    if (this.prop) {
      this.dispatch("iForm", "on-form-item-add", this);
      Object.defineProperty(this, "initialValue", {
        value: this.fieldValue
      });
      this.setRules();
    }
  }
  beforeDestroy() {
    this.dispatch("iForm", "on-form-item-remove", this);
  }
}
</script>

<style scoped lang="less"></style>
