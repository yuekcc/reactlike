let _target;

class Dep {
  constructor() {
    this._subscribers = [];
  }

  depend() {
    if (_target && !this._subscribers.includes(_target)) {
      this._subscribers.push(_target);
    }
  }

  notify() {
    this._subscribers.forEach(sub => sub());
  }
}

export function watchEffect(effect) {
  _target = effect;
  effect();
  _target = null;
}

const _depMaps = new WeakMap();
function getDepObj(target, key) {
  let _depMap = _depMaps.get(target);
  if (!_depMap) {
    _depMap = new Map();
    _depMaps.set(target, _depMap);
  }

  let dep = _depMap.get(key);
  if (!dep) {
    dep = new Dep();
    _depMap.set(key, dep);
  }

  return dep;
}

const reactiveHandlers = {
  get(target, key, receiver) {
    const _dep = getDepObj(target, key);
    _dep.depend();

    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    const _dep = getDepObj(target, key);
    const result = Reflect.set(target, key, value, receiver);
    _dep.notify();

    return result;
  },
};

export function reactive(obj) {
  return new Proxy(obj, reactiveHandlers);
}
