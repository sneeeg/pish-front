export default (categories, categoryId) =>
  categories.find((item) => item.id === categoryId)?.text || ''
