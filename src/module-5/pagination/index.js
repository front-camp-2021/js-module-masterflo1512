export default class Pagination {
  element;
  start = 0;
  pageIndex = 0;

  constructor({
    totalPages = 10,
    currentPage = 1,
  } = {}) {
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.pageIndex = currentPage - 1;

    this.render()
  }

  render() {
    const element = document.createElement('div')
    element.innerHTML = this.getTemplate()
    this.element = element.firstElementChild
  }

  getTemplate() {
    const numberOfPages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      numberOfPages.push(i);
    }

    return `
      <div class="pagination-container">
        <button class="btn-pagination">
            <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M20.0866 40C31.1801 40 40.1732 31.0457 40.1732 20C40.1732 8.9543 31.1801 0 20.0866 0C8.99308 0 0 8.9543 0 20C0 31.0457 8.99308 40 20.0866 40Z"
                    fill="#EDEDED" />
                <path d="M23.0996 25L17.0736 19L23.0996 13" stroke="black" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
        <ul class="pagination-list">
        ${numberOfPages.map((page) => `
          <li class="pagination-item${page === this.currentPage ? ' active' : ''}">
            <a href="#">${page}</a>
          </li>`).join('')}
        </ul>
        <button class="btn-pagination">
            <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M20.9487 40C32.0422 40 41.0353 31.0457 41.0353 20C41.0353 8.9543 32.0422 0 20.9487 0C9.85514 0 0.862061 8.9543 0.862061 20C0.862061 31.0457 9.85514 40 20.9487 40Z"
                    fill="#EDEDED" />
                <path d="M17.9357 14L23.9616 20L17.9357 26" stroke="black" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
    </div>
    `
  }

  goToPrevPage () {
    this.element.dispatchEvent(new CustomEvent('page-changed', {detail: this.currentPage - 1}))
  }

  goToNextPage () {
    this.element.dispatchEvent(new CustomEvent('page-changed', {detail: this.currentPage + 1}))
  }

  remove () {
    // ... your logic
  }

  destroy () {
    this.element = null
  }
}
