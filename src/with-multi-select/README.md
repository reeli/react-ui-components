### controlled MultiSelect and uncontrolled MultiSelect (由内向外还是由外向内，理解数据的流向)

1. controlled MultiSelect: selectedValue, updateSelectedValue 状态全部由外部去维护，可以通过改变 selectedValue 和直接调用 updateSelectedValue 两种方式去更新
2. uncontrolled MultiSelect: selectedValue, onSelectedValuesChange 状态由内部维护，但是当内部状态发生变化时，需要将内部状态通知给外部，然后再通过外部的 state 更新 value
3. options 可能发生变化，当 options 发生变化时，要将不存在于 options 里面但是却存在于 selected 里的值清除

tips:

1. 划清组件和组件之间的边界

## 主要作用

缓存 selected 状态，并且让 selected 状态正确更新

- 传入 options，方便取值，不然 selectAll 实现。
