export class Subject {
  constructor() {
    this._subscribers = [];
  }

  subscript(fn) {
    if (fn && !this._subscribers.includes(fn)) {
      this._subscribers.push(fn);
    }
  }

  async next(data) {
    this._subscribers.forEach(listener => listener(data));
  }
}
