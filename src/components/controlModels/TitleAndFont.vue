<template>
  <div>
    <div class="control-option-item">
      <p class="control-option-item-title">标题</p>
      <m-input m-style="dark" size="small" v-model="selfTitle" @change="returnConfig" />
    </div>
    <div class="control-option-item">
      <p class="control-option-item-title">字体</p>
      <m-input m-style="dark" size="mini" v-model="selfFontSize" @change="returnConfig" />
    </div>
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
export default class TitleAndFont extends Vue {
  @Prop({ type: String, default: "请输入标题" })
  title!: string;
  @Prop({ type: Number, default: 16 })
  fontSize!: number;

  selfTitle: string = "";
  selfFontSize: number = 16;

  returnConfig() {
    this.$emit("input", {
      title: this.selfTitle,
      fontSize: this.selfFontSize
    });
    this.$emit("change", {
      title: this.selfTitle,
      fontSize: this.selfFontSize
    });
  }

  @Watch("title", { immediate: true })
  handleChangeTitle() {
    this.selfTitle = this.title;
  }

  @Watch("fontSize", { immediate: true })
  handleChangeSize() {
    this.selfFontSize = this.fontSize;
  }
}
</script>

<style scoped lang="less"></style>
