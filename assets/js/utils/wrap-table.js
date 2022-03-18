export default (elem) => {
  const handler = (table) => {
    let parent = table.parentElement
    let wrap = document.createElement('div')
    wrap.classList.add('wrap-table')
    const parentIsWrap = parent.classList.contains('wrap-table')
    if (parentIsWrap) {
      wrap = parent
      parent = parent.parentElement
    }
    if (table.scrollWidth > parent.clientWidth && !parentIsWrap) {
      table.parentNode.insertBefore(wrap, table)
      wrap.appendChild(table)
    } else if (table.scrollWidth <= parent.clientWidth && parentIsWrap) {
      wrap.outerHTML = wrap.innerHTML
    }
  }

  if (elem.tagName === 'TABLE') {
    handler(elem)
  } else {
    elem.querySelectorAll('table:not([class])').forEach((table) => {
      handler(table)
    })
  }
}
