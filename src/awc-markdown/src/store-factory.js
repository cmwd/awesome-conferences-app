export default function StoreFactory() {
  const store = new Map();
  const listeners = [];

  function notifyListeners() {
    listeners.forEach(fn => fn(store));
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  function set(key, value) {
    store.set(key, value);
    notifyListeners();
  }

  function get(...args) {
    return store.get(...args);
  }

  function toObject() {
    return Array
      .from(store.entries())
      .reduce((result, [key, values]) =>
        Object.assign({}, result, { [key]: values }), {});
  }

  return { get, set, subscribe, toObject };
}

