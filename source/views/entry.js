var md = require('../components/format')
var ov = require('object-values')
var html = require('choo/html')

var log = require('../components/log')
var Content = require('../components/content')
var content = new Content()

module.exports = view

function view (state, emit) {
  var entries = state.page('/entries').pages().toArray().reverse()
  var entry = state.page().value()

  return html`
    <div style="border-top: 1px solid transparent">
      ${content.render(entry)} 
      <div>
        ${log(entries, entry.url)}
      </div>
    </div>
  `
}

