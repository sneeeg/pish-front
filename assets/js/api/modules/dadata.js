const TOKEN = 'e55967175eb3654d237330e76b7f3185bf7911d3'

const headers = {
  'content-type': 'application/json',
  accept: 'application/json',
  authorization: 'Token ' + TOKEN,
}

export default ($axios) => ({
  /* Getting countries */
  getCountries(query) {
    const URL =
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/country'

    return $axios.$post(
      URL,
      {
        query,
      },
      {
        mode: 'cors',
        headers,
      }
    )
  },

  /* Getting industries */
  getIndustries(query) {
    const URL =
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/okved2'

    return $axios.$post(
      URL,
      {
        query,
      },
      {
        mode: 'cors',
        headers,
      }
    )
  },

  /* Getting cities */
  getCities(query, country = '*') {
    const URL =
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'

    return $axios.$post(
      URL,
      {
        query,
        locations: [
          {
            country,
          },
        ],
        from_bound: {
          value: 'city',
        },
        to_bound: {
          value: 'settlement',
        },
      },
      {
        mode: 'cors',
        headers,
      }
    )
  },
})
