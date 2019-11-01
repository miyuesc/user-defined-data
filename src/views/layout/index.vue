<template>
  <router-view />
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
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    height: 80px;
  }
}
</style>
