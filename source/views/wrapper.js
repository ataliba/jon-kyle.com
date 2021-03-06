var html = require('choo/html')
var dayjs = require('dayjs')
var path = require('path')

var viewNotFound = require('./default')
var Navigation = require('../components/navigation')
var format = require('../components/format')
var manifest = require('../../manifest')
var views = require('./')

module.exports = main

function main (state, emit) {
  var page = state.content[state.href || '/']

  // loading / 404
  if (!state.site.loaded) return renderLoading(state, emit)
  if (!page) return viewNotFound(state, emit)

  // view
  var view = views[page.view] || views.default

  // title
  var title = getTitle(state, page)
  if (state.title !== title) emit(state.events.DOMTITLECHANGE, title)

  return html`
    <body class="vhmn100 x xdc fs1 ffsans lh1-5 bg-black tc-white">
      <div class="c12">
        ${state
          .cache(Navigation, 'nav')
          .render({
            hangLive: state.ui.hang.live,
            href: state.href
          })
        }
      </div>
      <div class="w100 xx max-width mxa oh">
        <div style="${page.padding !== false ? 'min-height: 25vh' : ''}"></div>
        ${view(state, emit)}
      </div>
      ${page.footer !== false ? footer() : ''}
      <div class="psa t0 r0 op0">
        <span class="ff-mono">j</span>
        <span style="font-style: italic">k</span>
      </div>
    </body>
  `

  function footer () {
    return html`
      <footer class="lh1-5 max-width mxa w100">
        <div class="mx1 bt1-white"></div>
        <div class="x xw max-width">
          <div class="xx p1 wwbw" sm="c12">
            <div class="copy">
              ${format(state.page('/').v('colophon'))}
              <p>The source is <a href="https://github.com/jondashkyle/jon-kyle.com/tree/master/content${path.join(page.url, 'index.txt')}" target="_blank" class="tc-white tdn">available to you</a>.</p>
            </div>
          </div>
          <div sm="c12">
            <div class="p1 c12 tar" sm="tal">
              Updated <span class="ffmono">${dayjs(manifest.updated).format('MMM.D,YYYY')}</span><br>
              <a href="mailto:contact@jon-kyle.com" class="tc-white tdn">Email</a>
            </div>
          </div>
        </div>
      </footer>
    `
  }
}

function formatDate (str) {
  var date = new Date(str)

  var day = date.getDate()
  var month = date.getMonth()
  var year = date.getFullYear().toString().substring(2)

  return [year, pad(month+1), pad(day)].join('-')
}

function pad (n) {
  return ('0' + n).slice(-2)
}

function renderLoading (state, emit) {
  return html`
    <body class="bgc-black ff-sans">
      <img class="loading" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAEAAIdpAAQAAAABAAAATgAAAAAAAAABAAAAAQAAAAEAAAABAAGkNAACAAAAAQAAAAAAAAAA/+EJlmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpleGlmRVg9Imh0dHA6Ly9jaXBhLmpwL2V4aWYvMS4wLyIgeG1sbnM6YXV4PSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wL2F1eC8iIGV4aWZFWDpMZW5zTW9kZWw9IiIgYXV4OkxlbnM9IiIvPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7QAsUGhvdG9zaG9wIDMuMAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+ICZElDQ19QUk9GSUxFAAEBAAACVGxjbXMEMAAAbW50clJHQiBYWVogB+IABQADABUAFQABYWNzcEFQUEwAAAAAAAAAAAAA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">
    </body>
  `
}

function getTitle (state, page) {
  var siteTitle = state.content['/'].title
  var pageTitle = page.title
  
  return siteTitle !== pageTitle
    ? siteTitle + ' / ' + pageTitle
    : siteTitle
}
