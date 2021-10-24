import { initStates } from './hooks';
import { Subject } from './subject';

const isFunction = x => typeof x === 'function';

const UPDATE_VIEW = new Subject();

// 触发 DOM 更新
export function forceUpdate() {
  UPDATE_VIEW.next();
}

// vnode 渲染为 HTMLElement，实现 VDOM => DOM
function render(vnode) {
  // 如果 vnode.tag 是一个函数那么 vnode.tag 是 FunctionalComponent；否则就是普通节点
  const _vnode = (isFunction(vnode.tag) && vnode.tag(vnode.props)) || vnode;

  const el = document.createElement(_vnode.tag);

  if (_vnode.props) {
    Object.keys(_vnode.props).forEach(name => {
      // props 中的 key 如果是 on 开头，认为是事件 handler，否则是一般属性
      if (name.startsWith('on')) {
        el[name] = _vnode.props[name];
      } else {
        el.setAttribute(name, _vnode.props[name]);
      }
    });
  }

  // 子节点是数组，递归处理
  if (Array.isArray(_vnode.children) && _vnode.children.length > 0) {
    el.append(..._vnode.children.map(child => render(child)));
  }

  // 非数组但非空白时，append 到节点
  const text = `${_vnode.children || ''}`.trim();
  if (text !== '') {
    el.append(text);
  }

  return el;
}

// 删除 DOM 节点下的所有子节点
function removeChildren(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

// 挂载
export function mount(RootComponent, container) {
  function process() {
    // 初始化状态计数
    initStates();

    // 最简单的方式实现更新视图：删除所有子节点，然后挂载新视图
    removeChildren(container);
    container.append(render(RootComponent()));
  }

  UPDATE_VIEW.subscript(process);

  // 第一次挂载手动触发一次 DOM 更新
  forceUpdate();
}
