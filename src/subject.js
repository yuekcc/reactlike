export class Subject {
  constructor() {
    this._subscribers = [];
  }

  subscript(fn) {
    if (fn && !this._subscribers.includes(fn)) {
      this._subscribers.push(fn);
    }
  }

  next(data) {
    Promise.resolve().then(() => {
      this._subscribers.forEach(listener => listener(data));
    });
  }
}
