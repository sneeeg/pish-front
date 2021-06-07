<template>
  <div v-scroll-element class="search-module">
    <SearchForm
      v-model="request"
      class="search-module__form"
      :loading="loading"
      @submit="search"
    />
    <div ref="searchModuleResults" class="search-module-results">
      <template v-if="searchDone && results.length">
        <div class="search-module-results__done">
          {{ searchDoneString }} <span>{{ results.length }}</span>
        </div>
        <div class="search-module-results-list">
          <SearchResult
            v-for="result in processedResults"
            :key="result.id"
            :result="result"
            class="search-module-results-list__item"
          />
        </div>
        <div
          v-if="pagination.total > 1"
          class="pagination search-module-results__pagination"
        >
          <ControlBtn
            class="pagination__btn"
            :disabled="pagination.current === 1"
            @click.native="prev"
          />
          <Paginate
            v-model="pagination.current"
            :page-count="pagination.total"
            :container-class="'pagination-list'"
            :prev-text="''"
            :next-text="''"
            :page-range="window.isMobileSize ? 3 : 8"
            :page-class="'pagination-list__item'"
            :click-handler="scrollToResults"
          ></Paginate>
          <ControlBtn
            class="pagination__btn"
            type="next"
            :disabled="pagination.current === pagination.total"
            @click.native="next"
          />
        </div>
      </template>
      <div v-else-if="searchDone" class="search-module-results__empty">
        {{ lang['search.empty'] }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Paginate from 'vuejs-paginate'
import SearchForm from '~/components/controls/SearchForm'
import SearchResult from '~/components/SearchResult'
import ControlBtn from '~/components/controls/ControlBtn'

const RESULTS_PER_PAGE = 5

export default {
  name: 'SearchModule',
  components: { ControlBtn, SearchResult, SearchForm, Paginate },
  data() {
    return {
      request: this.$route.query.request || '',
      loading: false,
      searchDone: false,
      results: [],
      pagination: {
        current: 1,
        total: 0,
      },
    }
  },
  async fetch() {
    if (this.request) await this.search()
  },
  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
    processedResults() {
      const begin =
        RESULTS_PER_PAGE * this.pagination.current - RESULTS_PER_PAGE

      return this.results.slice(begin, begin + RESULTS_PER_PAGE)
    },
    searchDoneString() {
      const requestString =
        this.$i18n.locale === 'ru' ? `«${this.request}»` : `"${this.request}"`

      return `${this.lang['search.onRequest']} ${requestString} ${this.lang['search.find']}:`
    },
  },
  methods: {
    search(request) {
      request && (this.request = request)

      this.pagination = { current: 1, total: 1 }

      this.loading = true
      return this.$api.search.getResults(this.request).then(({ data }) => {
        this.results = data || []
        this.loading = false
        this.searchDone = true

        this.pagination.total = Math.ceil(
          this.results.length / RESULTS_PER_PAGE
        )
        // this.scrollToResults()
      })
    },
    scrollToResults() {
      this.$scrollTo(this.$refs.searchModuleResults, 500, {
        easing: 'ease-out',
        cancelable: true,
        offset: -125,
      })
    },
    next() {
      this.pagination.current += 1
      this.scrollToResults()
    },
    prev() {
      this.pagination.current -= 1
      this.scrollToResults()
    },
  },
}
</script>

<style lang="scss">
.search-module-results {
  margin-top: 2.4rem;

  @include --mobile {
    margin-top: 2rem;
  }

  &__done,
  &__empty {
    @include text-small;
  }

  &__done {
    span {
      color: $color_accent;
    }
  }

  &__pagination {
    margin-top: 7.2rem;

    @include --mobile {
      margin-top: 5.2rem;
    }
  }
}

.search-module-results-list {
  margin-top: 6rem;

  @include --mobile {
    margin-top: 4rem;
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 3.2rem;

      @include --mobile {
        margin-bottom: 2.4rem;
      }
    }
  }
}
</style>
