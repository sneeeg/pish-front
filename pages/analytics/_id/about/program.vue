<template>
  <div class="analytics-program-preview">
    <Section
      v-if="organization.rectorName"
      :class="[{ '_mb-0': programTitles && programTitles.length }]"
    >
      <div class="analytics-program-preview__rector">
        <PersonCardLg
          :name="organization.rectorName"
          :photo-url="organization.rectorPhoto"
          :text="lang['analytics.rector'] + ' ' + organization.shortName"
        />
      </div>
    </Section>

    <Section
      v-if="programTitles && programTitles.length"
      small-head
      :title="lang['analytics.program'] + ' ' + organization.shortName"
    >
      <div class="analytics-program-preview-parts">
        <div class="analytics-program-preview-parts__titles">
          <CardLink
            v-for="({ id, text }, index) in programTitles"
            :key="id"
            :to="{
              name: 'analytics-id-program',
              params: { id: $route.params.id },
              hash: '#' + id,
            }"
          >
            <div class="analytics-program-preview-parts__title">
              <span>{{ index + 1 }}.</span>
              <span>{{ text }}</span>
            </div>
          </CardLink>
        </div>

        <div class="analytics-program-preview-parts__seal">
          <SvgIcon name="seal" />
        </div>

        <FileLink
          v-if="false && organization.programLink"
          class="analytics-program-preview-parts__link"
          :href="organization.programLink"
          :text="programLinkText"
        />
      </div>
    </Section>

    <Section
      v-if="organization.projects && organization.projects.length"
      background
      small-head
      :title="lang['analytics.projects']"
    >
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

.analytics-program-preview-parts {
  position: relative;

  &__link {
    margin-top: 4rem;

    @include --mobile {
      margin-top: 3.2rem;
    }
  }

  &__seal {
    @include box(14.4rem);

    position: absolute;

    svg {
      @include box(100%);
    }

    @include --from-tablet {
      right: -22rem;
      bottom: 0;

      svg {
        transform: rotate(-20deg);
      }
    }

    @include --tablet {
      right: -1rem;
      bottom: 1rem;
      padding: 4px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    @include --mobile {
      @include box(7.6rem);
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
