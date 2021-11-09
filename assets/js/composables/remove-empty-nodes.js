/**
 * Removes empty nodes
 * @param el {HTMLElement}
 */
export default (el) => {
  const children = Array.from(el.children)

  children.forEach((child) => {
    if (!child.innerHTML || child.innerHTML === '&nbsp;') {
      el.removeChild(child)
    }
  })
}
