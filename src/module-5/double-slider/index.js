export default class DoubleSlider {
  constructor({
    min = 100,
    max = 200,
    formatValue = value => value,
    selected = {
      from: min,
      to: max
    },
    precision = 0,
    filterName = ''
  } = {}) {
    this.formatValue = formatValue
    this.selected = {
      from: selected.from,
      to: selected.to
    }
    this.min = min
    this.max = max
    this.precision = precision;
    this.filterName = filterName
    this.isDragging = false
    this.render()
  }

  dispatchEvent() {
    this.element.dispatchEvent(new CustomEvent('range-selected', {
      detail: {
        filterName: this.filterName, value: this.selected
      }
    }))
  }

  render() {
    const element = document.createElement('div')
    element.innerHTML = this.getTemplate()
    this.element = element.firstElementChild

    const leftThumb = this.element.querySelector('.range-slider__thumb-left')
    const rightThumb = this.element.querySelector('.range-slider__thumb-right')
    const sliderInner = this.element.querySelector('.range-slider__inner')
    const progress = this.element.querySelector('.range-slider__progress')
    const fromLabel = this.element.querySelector('[data-element=from]')
    const toLabel = this.element.querySelector('[data-element=to]')

    leftThumb.addEventListener('pointerdown', () => {
      this.isDraggingRight = false
      this.isDraggingLeft = true
      sliderInner.classList.add('range-slider_dragging')
    })

    rightThumb.addEventListener('pointerdown', () => {
      this.isDraggingLeft = false
      this.isDraggingRight = true
      sliderInner.classList.add('range-slider_dragging')
    })

    document.addEventListener('pointerup', () => {
      this.isDraggingLeft = false
      this.isDraggingRight = false
      sliderInner.classList.remove('range-slider_dragging')
    })

    document.addEventListener('pointermove', (e) => {
      if (this.isDraggingLeft) {
        const rect = sliderInner.getBoundingClientRect();
        const x = e.clientX - rect.left;

        const percentLeft = (x / rect.width)
        if (x >= 0 && x <= rect.width) {
          const value = +((this.min) * percentLeft + this.min).toFixed(0)
          if (value <= this.selected.to) {
            this.selected.from = value
            this.dispatchEvent()
            progress.style.left = `${percentLeft * 100}%`
            leftThumb.style.left = `${percentLeft * 100}%`
            fromLabel.textContent = this.formatValue(value)
          }
        }
      }

      if (this.isDraggingRight) {
        const rect = sliderInner.getBoundingClientRect();
        const x = e.clientX - rect.left;

        const percentLeft = (x / rect.width)
        if (x >= 0 && x <= rect.width) {
          const value = +(((this.max - this.min) * percentLeft + this.min).toFixed(0))
          if (value >= this.selected.from) {
            this.selected.to = value
            this.dispatchEvent()
            progress.style.right = `${100 - percentLeft * 100}%`
            rightThumb.style.left = `${percentLeft * 100}%`
            toLabel.textContent = this.formatValue(value)
          }
        }
      }
    })
  }

  getTemplate() {
    return `
      <div class="range-slider">
        <span data-element="from">${this.formatValue(this.selected.from)}</span>
        <div class="range-slider__inner">
          <span data-element="progress" class="range-slider__progress"></span>
          <span data-element="thumbLeft" class="range-slider__thumb-left"></span>
          <span data-element="thumbRight" class="range-slider__thumb-right"></span>
        </div>
        <span data-element="to">${this.formatValue(this.selected.to)}</span>
      </div>
    `
  }
  
  destroy() {
    this.element.remove()
  }
}
