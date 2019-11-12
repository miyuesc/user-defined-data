<template>
  <div class="tool-bar">
    <ul>
      <li @click="$emit('delete')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-delete"></use>
        </svg>
      </li>
      <li class="cut-off-line ">|</li>
      <li @click="$emit('undo')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-undo1"></use>
        </svg>
      </li>
      <li @click="$emit('redo')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-redo1"></use>
        </svg>
      </li>
      <li class="cut-off-line ">|</li>
      <li @click="$emit('top')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-zhiding3"></use>
        </svg>
      </li>
      <li @click="$emit('bottom')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-zhidi1"></use>
        </svg>
      </li>
      <li @click="$emit('up')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-shangyi"></use>
        </svg>
      </li>
      <li @click="$emit('down')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-xiayi"></use>
        </svg>
      </li>
      <li class="cut-off-line ">|</li>
      <li @click="$emit('narrow')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-minus-circle"></use>
        </svg>
      </li>
      <li>{{ scale }} %</li>
      <li @click="$emit('amplification')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#m-icon-plus-circle"></use>
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

import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ToolBar extends Vue {
  @Prop({ type: Number, default: 70 })
  scale!: number;
}
</script>

<style scoped lang="less">
.tool-bar {
  background: #20212b;
  color: #b6b8cc;
  width: fit-content;
  margin: 20px auto;
  height: 40px;
  box-sizing: border-box;
  padding: 6px 12px;
  line-height: 24px;
  font-size: 18px;
  border-radius: 4px;
  ul {
    list-style: none;
    display: inline-flex;
    li {
      margin: 0 8px;
      color: #802cad;
      &:hover {
        cursor: pointer;
        color: #c836ff;
      }
    }
    .cut-off-line {
      font-weight: lighter;
      color: #454651;
      &:hover {
        cursor: default;
        color: #454651;
      }
    }
  }
  .icon {
    width: 24px;
    height: 24px;
  }
}
</style>
