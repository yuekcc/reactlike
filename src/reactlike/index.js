import { initStates } from "./hooks";
import { _mount, _render } from "./render";

// 创建 vnode
export function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}

// 删除 DOM 节点下的所有子节点
function removeChildren(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

// 挂载
export function mount(vnode, container) {
  function process() {
    // 初始化状态计数
    initStates();

    // 删除所有子节点，然后挂载新视图
    removeChildren(container);
    container.append(_render(h(vnode)));
  }

  _mount(process);
}
