// Requis
var gulp = require('gulp')
var fs = require('fs')

// Include plugins
var plugins = require('gulp-load-plugins')() // tous les plugins de package.json
const webpack = require('webpack-stream')

console.log(plugins)

gulp.task('clean', function () {
  return gulp.src('www/**', { read: false, allowEmpty: true })
    .pipe(plugins.cleanDir('www/**'))
})

gulp.task('css', function () {
  // Compile CSS
  return gulp.src('src/css/*.scss')
    .pipe(plugins.sass({ sourceMap: 'www/css/index.css.map' }).on('error', plugins.sass.logError))
    .pipe(gulp.dest('www/css'))
})

gulp.task('csv', function () {
  return gulp.src('src/data/*.csv')
    .pipe(plugins.csv2json({ delimiter: ';' }))
    .pipe(plugins.jsonFormat(2))
    .pipe(plugins.rename({
      extension: '.json',
      extname: '.json'
    }))
    .pipe(gulp.dest('www/data'))
})

gulp.task('js', function () {
  return gulp.src(['src/js/*.js'])
    .pipe(gulp.dest('www/js'))
})

gulp.task('js-vendor', function () {
  return gulp.src('src/js/vendor/*.js')
    .pipe(gulp.dest('www/js/vendor'))
})

gulp.task('webpack-accord', function () {
  return gulp.src('src/js/accord/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('www/js'))
})

gulp.task('img', function () {
  return gulp.src('src/img/**/*.*')
    /* ici les plugins Gulp à exécuter */
    .pipe(gulp.dest('www/img'))
})

gulp.task('nunjucks', function () {
  let templateData = {
    amorces: JSON.parse(fs.readFileSync('www/data/talk.amorces.json')),
    art: JSON.parse(fs.readFileSync('www/data/talk.art.json')),
    glossary: JSON.parse(fs.readFileSync('www/data/read.glossary.json')),
    resources: JSON.parse(fs.readFileSync('www/data/talk.resources.json')),
    vecu: JSON.parse(fs.readFileSync('www/data/read.vecu.json')),
    timestamp: (new Date()).getUTCMilliseconds()
  }

  // Gets .html and .nunjucks files in pages
  return gulp.src('src/html/*.html')
    .pipe(plugins.data(function (file) {
      return templateData
    }))
    // Renders template with nunjucks
    .pipe(plugins.nunjucksRender({
      path: ['src/html/templates']
    }))
    // Format HTML files
    .pipe(plugins.formatHtml({
      'indent-size': 2,
      'end_with_newline': true,
      'preserve_newlines': false,
      'indent_scripts': 'separate'
    }))
    // output files in www folder
    .pipe(gulp.dest('www'))
})

// Tâche "build"
gulp.task('build', gulp.series('clean', 'webpack-accord', 'csv', gulp.parallel('css', 'js', 'js-vendor', 'img', 'nunjucks')))

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
  gulp.watch('src/**/*.*', gulp.series('build'))
})
