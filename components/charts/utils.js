export const getChartType = (type) => {
  return {
    isLine: type === 'Line Chart',
    isBar:
      type === 'Bar Chart' ||
      type === 'Horizontal Bar Chart' ||
      type === 'Stacked Bar Chart',
  }
}

export const getSubType = (type) => {
  return {
    isHorizontal: type === 'Horizontal Bar Chart',
    isStacked: type === 'Stacked Bar Chart',
  }
}
