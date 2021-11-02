<template>
  <div class="fixed-table">
    <v-simple-table ref="fixed" class="fixed-table__section _fixed">
      <template #default>
        <thead>
          <tr>
            <th
              v-for="header in fixed.headers"
              :key="header.id"
              class="body-1 font-weight-bold"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in fixed.rows" :key="row.id">
            <td
              v-for="item in row"
              :key="item.id"
              class="fixed-table__item"
              v-html="item"
            ></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-simple-table
      ref="main"
      :style="{ width: 'calc(100% - 200px)' }"
      class="fixed-table__section _main"
    >
      <template #default>
        <thead>
          <tr>
            <th
              v-for="header in main.headers"
              :key="header.id"
              :style="{ textAlign: 'right' }"
              class="body-1 font-weight-bold"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in main.rows" :key="row.id">
            <td
              v-for="item in row"
              :key="item.id"
              :style="{ minWidth: '100px' }"
              class="fixed-table__item"
              v-html="item"
            ></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { VSimpleTable } from 'vuetify/lib'

export default {
  name: 'FixedTable',
  component: { VSimpleTable },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fixed: {},
      main: {},
      resizeHandler: this.resize.bind(this),
    }
  },
  created() {
    const headers = this.$utils.cloneObject(this.headers)
    const rows = this.$utils.cloneObject(this.rows)

    this.fixed.headers = headers.splice(0, 1)
    this.fixed.rows = rows.reduce((acc, item) => {
      acc.push(item.splice(0, 1))

      return acc
    }, [])

    this.main.headers = headers
    this.main.rows = rows
  },
  mounted() {
    this.processNumbers()

    this.resizeHandler()
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    processNumbers() {
      const tds = this.$refs.main.$el.querySelectorAll('td')
      const regExp = /^[\d ().,]+$/

      tds.forEach((td) => {
        if (regExp.test(td.innerText)) {
          td.classList.add('_number')
          td.innerText = td.innerText.replace(/,/g, '.')

          td.innerText = new Intl.NumberFormat('ru-RU').format(+td.innerText)

          td.innerHTML = td.innerHTML.replace(/&nbsp;/g, ' ')
        }
      })
    },
    resize() {
      const fixedTr = this.$refs.fixed.$el.querySelectorAll('tbody tr')
      const mainTr = this.$refs.main.$el.querySelectorAll('tbody tr')

      fixedTr.forEach((tr, index) => {
        const mainHeight = mainTr[index].offsetHeight
        const trHeight = tr.offsetHeight

        if (mainHeight > trHeight) {
          tr.style.height = mainHeight + 'px'
        } else {
          mainTr[index].style.height = trHeight + 'px'
        }
      })
    },
  },
}
</script>

<style lang="scss">
.fixed-table {
  display: flex;
  margin-right: 2.4rem;

  &__section {
    &._fixed {
      flex-shrink: 0;
      width: 20rem;
      background: #f4f4f6 !important;
    }
  }

  &__item {
    &._number {
      font-family: $font-monospaced;
      white-space: nowrap;
      text-align: right;
    }

    a {
      @include hover-opacity;
      position: relative;
      display: block;
      max-width: 19rem;
      padding: 0.8rem 1.4rem 0.8rem 4rem;
      border: 1px solid #989db0;
      border-radius: 4px;
      white-space: nowrap;

      &::before {
        @include box(2rem);
        position: absolute;
        top: calc(50% - 1rem);
        left: 1.6rem;
        background-image: url('~/assets/i/sprite/svg/file.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 1rem;
        content: '';
        content: '';
      }
    }
  }
}
</style>
