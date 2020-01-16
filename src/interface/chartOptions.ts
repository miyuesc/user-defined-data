export interface ChartOptions {
  type: string; // 类型：bar/line/pie/radar/complex/scatter
  unit?: string; // 单位
  showUnit?: boolean; // 单位显示状态
  axis?: boolean; // 坐标轴显示状态
  split?: boolean; // 分割线显示状态
  animation?: boolean; // 图表动画
  smooth?: boolean; // 平滑曲线
  stacked?: boolean; // 堆叠
  shadow?: boolean; // 渐变
  userDefined?: any; // 默认数据
}
