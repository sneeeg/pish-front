export default {
  head() {
    return {
      title: this.page?.title || this.$store.state.default.settings.title,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content:
            this.page?.metaTitle ||
            this.$store.state.default.settings.metaTitle,
        },
        {
          hid: 'description',
          name: 'description',
          content:
            this.page?.metaDescription ||
            this.$store.state.default.settings.metaDescription,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: window.location.origin + window.location.pathname,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.page?.metaTitle ||
            this.$store.state.default.settings.metaTitle,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.page?.metaDescription ||
            this.$store.state.default.settings.metaDescription,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            window.location.origin + this.page?.ogFb ||
            this.$store.state.default.settings.ogFb,
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: window.location.origin + window.location.pathname,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content:
            this.page?.metaTitle ||
            this.$store.state.default.settings.metaTitle,
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content:
            this.page?.metaDescription ||
            this.$store.state.default.settings.metaDescription,
        },
        {
          hid: 'twitter:image',
          property: 'og:image',
          content:
            window.location.origin + this.page?.ogFb ||
            this.$store.state.default.settings.ogFb,
        },
        {
          hid: 'vk:image',
          property: 'og:image',
          content:
            window.location.origin + this.page?.ogVk ||
            this.$store.state.default.settings.ogVk,
        },
      ],
    }
  },
}
