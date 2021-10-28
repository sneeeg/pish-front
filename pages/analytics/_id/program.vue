<template>
  <div class="analytics-program-preview">
    <Section class="_mb-0">
      <div class="analytics-program-preview__rector">
        <PersonCardLg
          :name="organization.rectorName"
          :photo-url="organization.rectorPhoto"
          :text="lang['analytics.rector'] + ' ' + organization.shortName"
        />
      </div>
    </Section>

    <Section
      small-head
      :title="lang['analytics.program'] + ' ' + organization.shortName"
    >
      <div class="analytics-program-preview-parts">
        <FileLink
          class="analytics-program-preview-parts__link"
          :href="organization.programLink"
          :text="programLinkText"
        />
      </div>
    </Section>

    <Section background small-head :title="lang['analytics.projects']">
      <div class="analytics-program-preview-projects">
        <ProjectCard
          v-for="(
            { name, headName, headPhoto }, index
          ) in organization.projects"
          :key="index"
          :name="name"
          :head="{
            photoUrl: headPhoto,
            name: headName,
            text: lang['analytics.projectHead'],
          }"
          to="/"
        />
      </div>
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Section from '~/components/layout/Section'
import PersonCardLg from '~/components/PersonCardLg'
import FileLink from '~/components/FileLink'
import ProjectCard from '~/components/ProjectCard'

export default {
  name: 'Program',
  components: { FileLink, PersonCardLg, Section, ProjectCard },
  computed: {
    ...mapState('organization', { organization: 'data' }),
    ...mapState('default', ['lang']),
    programLinkText() {
      return `${this.lang['analytics.program']} ${
        this.organization.shortName
      }.${this.organization.programLink.split('.').slice(-1)}`
    },
  },
}
</script>

<style lang="scss">
.analytics-program-preview__rector,
.analytics-program-preview-parts {
  @include containerInnerSmall2;
}

.analytics-program-preview {
}

.analytics-program-preview-parts {
  &__link {
    margin-top: 4rem;
  }
}

.analytics-program-preview-projects {
  @include flexGap(3rem);

  > * {
    flex: 1 1 30%;
    max-width: calc(100% / 3 - 3rem);

    @include --tablet {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }

  @include --mobile {
    @include flexGap(1.6rem);
  }
}
</style>
