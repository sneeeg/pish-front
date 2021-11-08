/* Blockquote snippet */
class Blockquote {
  el
  parent

  /**
   * Constructor
   * @param el {HTMLElement} - element
   * @param parent {HTMLElement} - parent element
   */
  constructor(el, parent) {
    this.el = el
    this.parent = parent

    this.#create()
  }

  #create() {
    const tds = this.el.querySelectorAll('td')
    const avatar = tds[0].innerHTML
    const name = tds[1].innerHTML
    const text = tds[2].innerHTML

    const container = document.createElement('div')
    container.classList.add('snippet-blockquote')

    const template = `
      <div class="snippet-blockquote__text">${text}</div>
      <div class="snippet-blockquote__cite">
        <div class="snippet-blockquote__avatar">${avatar}</div>
        <div class="snippet-blockquote__name">${name}</div>
      </div>
    `

    container.innerHTML = template
    this.parent.replaceChild(container, this.el)
  }
}

export default Blockquote
