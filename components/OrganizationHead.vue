<template>
  <div class="organization-head">
    <div class="organization-head__content">
      <h1 class="organization-head__title _visually-h2">
        {{ organization.shortName }}
      </h1>

      <p class="organization-head__text">{{ organization.name }}</p>

      <ExternalLink
        class="organization-head__link"
        :text="lang['analytics.website']"
        :to="organization.link"
      />
    </div>

    <div
      v-if="organization.logo && window.isDesktopSize"
      class="organization-head__logo"
    >
      <img
        :src="organization.logo"
        :alt="organization.shortName"
        @load="setLogoSize"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ExternalLink from '~/components/ExternalLink'

export default {
  name: 'OrganizationHead',
  components: { ExternalLink },
  computed: {
    ...mapState('organization', { organization: 'data' }),
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
  },
  methods: {
    setLogoSize(e) {
      this.$nextTick(() => {
        const target = e.target
        const computed = window.getComputedStyle(target)

        const width = parseFloat(computed.getPropertyValue('width'))
        const height = parseFloat(computed.getPropertyValue('height'))

        target.parentElement.style = `width: ${width / 10}rem; height: ${
          height / 10
        }rem;`

        target.style = 'visibility: visible; width: 100%; height: 100%;'
      })
    },
  },
}
</script>

<style lang="scss">
.organization-head {
  display: flex;
  justify-content: space-between;

  &__content {
    max-width: 58.5rem;
  }

  &__title {
    color: #000;
  }

  &__text {
    @include h5;
    margin: 3.2rem 0 0;
    font-weight: normal;

    @include --mobile {
      margin-top: 2.4rem;
    }
  }

  &__link {
    margin-top: 4rem;

    @include --mobile {
      margin-top: 3.2rem;
    }
  }

  &__logo {
    max-width: 50rem;
    max-height: 50rem;
    visibility: hidden;

    img {
      object-fit: cover;
    }
  }
}
</style>
