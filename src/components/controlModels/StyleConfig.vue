<template>
  <div class="control-option-item chart-style">
    <p class="control-option-item-title">样式</p>
    <div class="chart-style-item checked"></div>
  </div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class StyleConfig extends Vue {}
</script>

<style scoped lang="less">
@import "../../../src/assets/styles/control-penal.less";
</style>
