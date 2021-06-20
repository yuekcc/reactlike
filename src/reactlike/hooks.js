import { _update } from './render';

let _stateIndex = 0;

// 初始化状态计数
export function initStates() {
  _stateIndex = 0;
}

// 状态计数 +1
// 每次调用 useXXX hook 时，计数 +1
function _updateStateIndex() {
  _stateIndex += 1;
}

// 缓存
const _states = [];

// useState hook
export function useState(initValue) {
  // 每次调用 useXXX 时先将计数 +1。在渲染的时候，先重置计数器。
  // 渲染时候因为是函数调用，按调用顺序保持计数器的位置
  _updateStateIndex();

  // 当前这个位置应该是 index - 1
  const _idx = _stateIndex - 1;

  // 初始化或使用上次的值
  const val = (_states[_idx] = _states[_idx] || initValue);

  // 更新 state
  const setVal = newValue => {
    _states[_idx] = newValue;
    _update();
  };

  return [val, setVal];
}
