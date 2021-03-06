# react like

一个 react 劣质版。

已实现功能：

- 函数组件
    - `h(tag, props, children)` 生成 vnode
    - `mount(FunctionalComponent, container)` 将组件挂载到 DOM
- hooks
    - `const [val, setVal] = useState(initValue)` 手感类似于 react 的 [state hook][1]
- JSX 支持
    - 配置构建工具的 [jsxFactory][2] 为 h，可以支持 JSX


## 体验

```sh
$ npm i
$ npm run dev # then open to http://localhost:3000
```

## LICENSE

[WTFPL](LICENSE)

[1]: https://reactjs.bootcss.com/docs/hooks-state.html
[2]: https://vitejs.dev/guide/features.html#vue