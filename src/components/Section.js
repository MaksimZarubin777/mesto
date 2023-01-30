
export default class Section {
  constructor (selector) {
    this._container = document.querySelector(selector);
  }

  renderItems ({data, renderer}) {
    this._initialArray = data;
    this._renderer = renderer;
    this._initialArray.forEach((item) => {
      this._renderer(item);
  })}

  addItem(element) {
    this._container.prepend(element);
  }
}

