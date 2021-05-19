<template>
  <div ref="HTMLContent" class="html-content">
    <blockquote>
      <p>
        Таким образом, программа, используя опыт предыдущих проектов и программ,
        реализованных в РФ, нацелена на более системную и комплексную работу по
        трансформации российской системы высшего образования. Эти меры
        предполагают вовлечение значительного числа участников, в первую очередь
        вузов различной организационно-правовой формы (государственные,
        муниципальные, негосударственные) и различной ведомственной
        принадлежности, а также организаций, представляющих различные сферы -
        образование, науку, реальный сектор экономики, социальный сектор.
      </p>
      <footer>резюмировал замминистра <span>Андрей Омельчук</span></footer>
    </blockquote>

    <table>
      <tbody>
        <tr>
          <td rowspan="2">
            Lorem ipsum dolor sit amet, consectedwadawdadtur adipisicing.
          </td>
          <td>Lorem ipsum dolor sit amet, consectedwadawdadtur adipisicing.</td>
          <td>Lorem ipsum dolor sit amet, consectedwadawdadtur adipisicing.</td>
          <td>Lorem ipsum dolor sit amet, consectedwadawdadtur adipisicing.</td>
          <td>Lorem ipsum dolor sit amet, consectedwadawdadtur adipisicing.</td>
        </tr>
        <tr>
          <td>Lorem ipsum dolor sit.</td>
          <td>Lorem ipsum dolor sit.</td>
          <td>Lorem ipsum dolor sit.</td>
          <td>Lorem ipsum dolor sit.</td>
        </tr>
      </tbody>
    </table>

    <h5>Основания для отклонения заявки:</h5>
    <ul>
      <li>несоответствие требованиям и критериям для участия в отборе;</li>
      <li>
        несоответствие требованиям к заявкам, установленным в объявлении о
        проведении отбора;
      </li>
      <li>недостоверность представленной информации;</li>
      <li>
        подача заявки после даты и (или) времени, определенных для подачи
        заявок.
      </li>
    </ul>
    <ol>
      <li>несоответствие требованиям и критериям для участия в отборе;</li>
      <li>
        несоответствие требованиям к заявкам, установленным в объявлении о
        проведении отбора;
      </li>
      <li>недостоверность представленной информации;</li>
      <li>
        подача заявки после даты и (или) времени, определенных для подачи
        заявок.
      </li>
    </ol>

    <article class="attention">
      Программа развития должна предусматривать реализацию мероприятий с
      формированием консорциумов – объединений, в том числе без образования
      юридического лица, с другими университетами и (или) научными
      организациями, независимо от их ведомственной принадлежности, и при
      необходимости с иными организациями на основании соглашений о
      взаимодействии.
    </article>

    <hr />

    <p>
      Напомним, что программа стратегического академического лидерства
      «ПРИОРИТЕТ-2030» разработана Министерством науки и высшего образования РФ
      в рамках реализации федерального проекта «Развитие интеграционных
      процессов в сфере науки, высшего образования и индустрии» национального
      проекта «Наука и университеты» и федерального проекта «Кадры для цифровой
      экономики» национальной программы «Цифровая экономика Российской
      Федерации». В основу новой программы легли принципы интеграции и
      кооперации научных и образовательных организаций, а также принципы
      конкуренции и открытости.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HTMLContent',
  mounted() {
    const $tables = this.$refs.HTMLContent.querySelectorAll('table')
    const wrapper = document.createElement('section')
    const parentWith = this.$refs.HTMLContent.offsetWidth

    $tables.forEach((el) => {
      const tableWidth = el.scrollWidth

      if (parentWith < tableWidth) {
        el.parentNode.insertBefore(wrapper, el)
        wrapper.classList.add('table-scroll-wrap')
        wrapper.appendChild(el)
      }
    })
  },
}
</script>

<style lang="scss"></style>
