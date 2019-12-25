- refs 是一个特殊的属性，可以让你直接去操作 DOM 或者 component instance
- refs 应用场景

1. 直接操作 DOM(或者 component instance) 或者快速定位 (或用 findDOMNode)
2. 不期望组件被重新渲染的情况，比如 video，可以通过 refs 提供 play, pause 等接口对其直接进行操作

PS: refs 的使用最好不要超过当前组件，否则不清楚其什么时候被创建和销毁，如果子组件需要使用父组件的 refs，可以考虑从父组件提供一个 get 方法传递下去

[React Refs](https://reactjs.org/docs/glossary.html#refs)
