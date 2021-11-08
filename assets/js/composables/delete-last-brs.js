const deleteLastBrs = (el) => {
  const nodes = el.childNodes

  for (let i = 1; i < 100; i++) {
    const lastNode = nodes[nodes.length - 1]
    if (lastNode && lastNode.tagName === 'BR') {
      el.removeChild(lastNode)
    } else {
      break
    }
  }
}

export default deleteLastBrs
