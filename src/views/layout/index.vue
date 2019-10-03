<template>
  <div class="layout">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";

@Component
export default class Layout extends Vue {}
</script>

<style scoped lang="less">
.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
