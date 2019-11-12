<template>
  <div class="demo-type-menu">
    <ul>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-View"></use>
        </svg>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-keshihua"></use>
        </svg>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-desktop"></use>
        </svg>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-View"></use>
        </svg>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-View"></use>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
/**
 * @Description: -
 * @Author: -
 * @Date: -
 **/

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class DemoTypeMenu extends Vue {}
</script>

<style scoped lang="less">
.demo-type-menu {
  display: flex;
  height: calc(100vh - 42px);
  position: fixed;
  top: 42px;
  ul {
    display: flex;
    width: 40px;
    height: 100%;
    background: #1f1f1f;
    list-style: none;
    flex-direction: column;
    li {
      display: block;
      width: 40px;
      height: 40px;
      color: darkgray;
      &:hover {
        cursor: pointer;
      }
      .icon {
        width: 24px;
        height: 24px;
        margin: 8px auto;
      }
    }
  }
}
</style>
