// 创建 vnode
export function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}
