export default ($axios) => ({
  /**
   * Sending feedback form
   * @return {Promise<any>}
   */
  send(data) {
    return $axios.$post('/api/feedback', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
})
