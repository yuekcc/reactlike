import mitt from "mitt";

const isFunction = (x) => typeof x === "function";

// bus 是一个 EventEmitter
// 这里用来实现重渲染
const bus = mitt();
const EVENT_UPDATE_VIEW = Symbol();

// 触发 DOM 更新
export function _update() {
  bus.emit(EVENT_UPDATE_VIEW);
}

// vnode 渲染为 HTMLElement，实现 VDOM => DOM
export function _render(vnode) {
  // 如果 vnode.tag 是一个函数，vnode.tag 是 ComponentFactory；否则就是普通节点
  const _vnode = (isFunction(vnode.tag) && vnode.tag(vnode.props)) || vnode;

  const el = document.createElement(_vnode.tag);

  if (_vnode.props) {
    Object.keys(_vnode.props).forEach((name) => {
      // props 中的 key 如果是 on 开头，认为是事件 handler，否则是一般属性
      if (name.startsWith("on")) {
        el[name] = _vnode.props[name];
      } else {
        el.setAttribute(name, _vnode.props[name]);
      }
    });
  }

  // 子节点是数组，递归处理
  if (Array.isArray(_vnode.children) && _vnode.children.length > 0) {
    el.append(..._vnode.children.map((child) => _render(child)));
  } else {
    // 非数组且非空时，append 到节点
    const text = `${_vnode.children}`;
    if (text !== "") {
      el.append(text);
    }
  }

  return el;
}

// 挂载到 DOM 树
export function _mount(process) {
  bus.on(EVENT_UPDATE_VIEW, process);

  // 第一次挂载手动触发一次 DOM 更新
  _update();
}
