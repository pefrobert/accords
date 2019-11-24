/* global Vue */
Vue.component('glossary-item', {
  props: ['id', 'term', 'synonymes', 'source'],
  data: function () {
    return {
      html_id: 'glossary-' + this.id
    }
  },
  template: '<dl class="glossary-item" v-bind:id="html_id">' +
    '<dt>' +
      '<a v-bind:name="id"></a>{{ term }}' +
    '</dt>' +
    '<dd>' +
        '<p class="syns" v-if="synonymes && synonymes.length"><span class="label">Synonymes :</span> <span class="content"><slot name="synonymes"></slot></span></p>' +
        '<p>' +
            '<slot name="definition"></slot>' +
        '</p>' +
        '<p class="source" v-if=source><span class="label">Pour en savoir plus&nbsp;:</span> <slot name="source"></slot></span></p>' +
        '<p class="action-bookmark">' +
          '<bookmark-button type="glossary" v-bind:target="id"></bookmark-button>' +
        '</p>' +
    '</dd>' +
  '</dl>'
})
