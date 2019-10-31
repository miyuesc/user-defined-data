<template>
  <div class="m-form-item">
    <slot></slot>
  </div>
</template>
<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement } from "vue";

@Component({})
export default class MFormItem extends Vue {
  @Prop({ type: String })
  label!: string;
}
</script>

<style scoped lang="less"></style>
