# react like

一个 react like MVP。

已实现功能：

- 函数组件
- jsx 支持（h 函数）
- useState hooks

API:

- `mount(RootComponent, htmlElement)` 将组件挂载到 DOM
- `h(tag, props, children)` h 函数，通过构建工具（需要配置 [jsxFactory][2]）也可以支持 jsx
- `const [val, setVal] = useState(initVal)` [state hook][1]

## 体验

```sh
$ npm i
$ npm run build:lib
$ npm run build:demo
$ npm run serve
```

## LICENSE

[WTFPL](LICENSE)

[1]: https://reactjs.org/docs/hooks-state.html
[2]: https://esbuild.github.io/api/#jsx-factory