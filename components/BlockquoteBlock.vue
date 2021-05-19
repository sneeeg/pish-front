<template>
  <Section :title="title" background>
    <Blockquote :text="text" :author="author" />
  </Section>
</template>

<script>
import Blockquote from '~/components/Blockquote'

export default {
  name: 'BlockquoteBlock',
  components: { Blockquote },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    const text =
      'Единая программа государственной поддержки университетов Российской Федерации с целью поддержки прорывных проектов, направленных на научно-технологическое развитие страны'
    const author = {
      photo: '/blockquote/1.jpg',
      name: 'Валерий Фальков',
      position: 'Министр науки и высшего образования Российской Федерации',
    }
    return {
      text,
      author,
    }
  },
}
</script>

<style lang="scss"></style>
