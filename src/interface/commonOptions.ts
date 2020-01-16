export interface CommonOptions {
    type: String; // 组件大类：chart/table/number/text/image
    title: String; // 标题
    size: {
        width: Number;
        height: Number;
    }; // 组件大小
    position: {
        x: Number;
        y: Number;
    }; // 组件位置
    zIndex: Number; // 显示层级
    fontSize: Number; // 字体大小
    background: {
        opacity: Number;
        borderRadius: Number;
    }; // 背景设置
}
