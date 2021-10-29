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
        <div class="analytics-program-preview-parts__titles">
          <CardLink
            v-for="(item, index) in programTitles"
            :key="item.id"
            :to="{
              name: 'analytics-id-program',
              params: { id: $route.params.id },
              query: { titleId: item.id },
            }"
          >
            <div class="analytics-program-preview-parts__title">
              <span>{{ index + 1 }}.</span>
              <span>{{ item.title }}</span>
            </div>
          </CardLink>
        </div>

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
import { mapState, mapGetters } from 'vuex'
import Section from '~/components/layout/Section'
import PersonCardLg from '~/components/PersonCardLg'
import FileLink from '~/components/FileLink'
import ProjectCard from '~/components/ProjectCard'
import CardLink from '~/components/CardLink'

export default {
  name: 'Program',
  components: { CardLink, FileLink, PersonCardLg, Section, ProjectCard },
  computed: {
    ...mapState('organization', { organization: 'data' }),
    ...mapState('default', ['lang']),
    ...mapGetters('organization', ['programTitles']),
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

    @include --mobile {
      margin-top: 3.2rem;
    }
  }

  &__titles {
    > * {
      &:not(:last-child) {
        margin-bottom: 1.6rem;
      }
    }
  }

  &__title {
    @include text-small;

    display: flex;
    font-weight: 700;

    span {
      &:first-child {
        flex-shrink: 0;
        width: 2.7rem;
        margin-right: 0.8rem;
        color: $color_dark_grey;

        @include --tablet {
          width: 2rem;
        }

        @include --mobile {
          margin-right: 0;
        }
      }
    }
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
