// src/hooks.js
var _stateIndex = 0;
function initStates() {
  _stateIndex = 0;
}
function _updateStateIndex() {
  _stateIndex += 1;
}
var _states = [];
function useState(initValue) {
  _updateStateIndex();
  const _idx = _stateIndex - 1;
  const val = _states[_idx] = _states[_idx] || initValue;
  const setVal = (newValue) => {
    _states[_idx] = newValue;
    _update();
  };
  return [val, setVal];
}

// src/subject.js
var Subject = class {
  constructor() {
    this._subscribers = [];
  }
  subscript(fn) {
    if (fn && !this._subscribers.includes(fn)) {
      this._subscribers.push(fn);
    }
  }
  async next(data) {
    this._subscribers.forEach((listener) => listener(data));
  }
};

// src/render.js
var isFunction = (x) => typeof x === "function";
var UPDATE_VIEW = new Subject();
function _update() {
  UPDATE_VIEW.next();
}
function _render(vnode) {
  const _vnode = isFunction(vnode.tag) && vnode.tag(vnode.props) || vnode;
  const el = document.createElement(_vnode.tag);
  if (_vnode.props) {
    Object.keys(_vnode.props).forEach((name) => {
      if (name.startsWith("on")) {
        el[name] = _vnode.props[name];
      } else {
        el.setAttribute(name, _vnode.props[name]);
      }
    });
  }
  if (Array.isArray(_vnode.children) && _vnode.children.length > 0) {
    el.append(..._vnode.children.map((child) => _render(child)));
  } else {
    const text = `${_vnode.children}`;
    if (text !== "") {
      el.append(text);
    }
  }
  return el;
}
function _mount(process) {
  UPDATE_VIEW.subscript(process);
  _update();
}
function removeChildren(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}
function mount(RootComponent, container) {
  function process() {
    initStates();
    removeChildren(container);
    container.append(_render(RootComponent()));
  }
  _mount(process);
}

// src/h.js
function h(tag, props, children) {
  return {
    tag,
    props,
    children
  };
}
export {
  h,
  mount,
  useState
};
