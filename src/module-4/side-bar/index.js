import FiltersList from "../filters-list/index.js";

export default class SideBar {
  element;
  constructor(categoriesFilter = [], brandFilter = []) {
    this.categoriesFilter = categoriesFilter;
    this.brandFilter = brandFilter;

    this.render();
  }

  render() {
    const element = document.createElement("div");

    const categoryFilter = new FiltersList({
      title: "Category",
      list: this.categoriesFilter,
    });
    const brandFilter = new FiltersList({
      title: "Brand",
      list: this.brandFilter,
    });

    element.appendChild(categoryFilter.element);
    element.appendChild(brandFilter.element);

    this.element = element;
  }

  destroy() {
    this.element = null;
  }
}
