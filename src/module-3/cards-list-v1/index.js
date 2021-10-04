export default class CardsList {
  constructor ({data = [], Component = {}}) {
    this.data = data;
    this.cardItemElements = this.data.map((product)=> {
      const card = new Component(product);
      return card.element;
    })
    this.render();
  }
  render () {
    const wrapper = document.createElement('div');
    wrapper.classList.add('product-list','row')
    wrapper.append(...this.cardItemElements);
    this.element = wrapper;
  }
  destroy () {

  }
  update (newProducts) {
    this.cardItemElements = newProducts.map((product)=> {
      const card = new Component(product);
      return card.element;
    })
    this.render();
  }
}

