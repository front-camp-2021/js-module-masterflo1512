export default class FiltersList {
  constructor({ title = "", list = [] } = {}) {
    this.title = title;
    this.list = list;
    this.render();
  }

  getTitleTemplate() {
    return `<h3 class="filter-title">${this.title}</h3>`;
  }

  getFilterItemTemplate({ value , title = "", checked = false }) {
    return `<div class="form-checkbox-category">
        <label>
            <input type="checkbox" data-value=${value} name="category" ${checked ? "checked" : ""}/>
            ${title}
        </label>
      </div>`;
  }

  getFilterListTemplate() {
    return this.list
      .map((item) => {
        return this.getFilterItemTemplate(item);
      })
      .join("");
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getTitleTemplate() + this.getFilterListTemplate();
    this.element = wrapper;
    this.element.addEventListener("change", (e) => {
      if(e.target.checked){
        dispatchEvent(new CustomEvent("remove-filter", { detail: e.target.dataset.value }));
      } else {
        dispatchEvent(new CustomEvent("add-filter", { detail: e.target.dataset.value  }));
      }
    });
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
