  export default class FiltersList {
    constructor ({
      title = '',
      list = []
    } = {}) {
      this.title = title;
      this.list = list;
      this.render();
    }

    getTitleTemplate(){
      return `<h3 class="filter-title">${this.title}</h3>`;
    }
    
    getFilterItemTemplate({value = 0, title = '', checked = false}) {
      return `<div class="form-checkbox-category">
        <label>
            <input type="checkbox" name="category" ${checked ? 'checked' : ''}/>
            ${title}
        </label>
        <span class="amount">${value}</span>
      </div>`;
    }
    
    getFilterListTemplate() {
      return this.list.map((item) => {
        return this.getFilterItemTemplate(item);
      }).join(''); 
    }

    render() {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = this.getTitleTemplate() + this.getFilterListTemplate();
      this.element = wrapper;
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
