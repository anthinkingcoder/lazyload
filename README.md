//懒加载模式
const LAZY_MODE = {
    'NORMAL': 0, //不优化
    'THROTTLE': 1,//节流
    'DEBOUNCE': 2 //去抖
};
//可见区域触发加载条件
const SEE_MODE = {
    'CONTENT_SEE': 0, //内容可见(包括顶部可见和底部可见)
    'TOP_SEE': 1, //顶部可见
    'BOTTOM_SEE': 2//底部可见
};
//默认delay是500ms,LAZY_MODE是DEBOUNCE,SEE_MODE是CONTENT_SEE
//example:
//Lazyload.setMode(Lazyload.LAZY_MODE.THROTTLE, 500, Lazyload.SEE_MODE.TOP_SEE);
  Lazyload.setMode(Lazyload.LAZY_MODE.DEBOUNCE, 500);