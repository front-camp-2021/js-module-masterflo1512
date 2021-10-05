export default class CardsList {
  constructor ({data = [], Component = {}}) {
    this.data = data;
    this.Component = Component;
    this.update(this.data);
    this.render();
  }
  render () {
    const wrapper = document.createElement('div');
    wrapper.classList.add('product-list','row')
    wrapper.append(...this.cardItemElements);
    this.element = wrapper;
  }
  update (newProducts) {
    this.data = newProducts;
    this.cardItemElements = newProducts.map((product)=> {
      const card = new this.Component(product);
      return card.element;
    })
    this.render();
  }
  remove () {
    if (this.element) {
      this.element.remove();
    }  
  }
  destroy() {
    this.remove();
    this.element = null;
  }
}

