// Requis
var gulp = require('gulp')
var fs = require('fs')

// Include plugins
var plugins = require('gulp-load-plugins')() // tous les plugins de package.json

var templateData = {
  amorces: JSON.parse(fs.readFileSync('src/data/talk.amorces.json')),
  amorcesString: fs.readFileSync('src/data/talk.amorces.json'),
  art: JSON.parse(fs.readFileSync('src/data/talk.art.json')),
  artString: fs.readFileSync('src/data/talk.art.json'),
  glossary: JSON.parse(fs.readFileSync('src/data/read.glossary.json')),
  glossaryString: fs.readFileSync('src/data/read.glossary.json'),
  vecu: JSON.parse(fs.readFileSync('src/data/read.vecu.json')),
  vecuString: fs.readFileSync('src/data/read.vecu.json'),
  timestamp: (new Date()).getUTCMilliseconds()
}

console.log(plugins)

gulp.task('clean', function () {
  return gulp.src('www/**', { read: false, allowEmpty: true })
    .pipe(plugins.clean({ read: false, force: true }))
})

gulp.task('css', function () {
  return gulp.src('src/css/*.css')
    /* ici les plugins Gulp à exécuter */
    .pipe(gulp.dest('www/css'))
})

gulp.task('csv', function () {
  return gulp.src('src/data/*.csv')
    .pipe(plugins.csv2json({ delimiter: ';' }))
    .pipe(plugins.jsonFormat(2))
    .pipe(plugins.rename({
      extension: '.js',
      extname: '.js'
    }))
    .pipe(gulp.dest('www/data'))
})

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    /* ici les plugins Gulp à exécuter */
    .pipe(gulp.dest('www/js'))
})

gulp.task('img', function () {
  return gulp.src('src/img/**/*.*')
    /* ici les plugins Gulp à exécuter */
    .pipe(gulp.dest('www/img'))
})

// Tâche "minify" = minification CSS (source -> destination)
gulp.task('minifyCSS', function () {
  return gulp.src('www/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('www/css'))
})

gulp.task('nunjucks', function () {
  // Gets .html and .nunjucks files in pages
  return gulp.src('src/html/*.html')
    .pipe(plugins.data(function (file) {
      return templateData
    }))
    // Renders template with nunjucks
    .pipe(plugins.nunjucksRender({
      path: ['src/html/templates']
    }))
    // output files in www folder
    .pipe(gulp.dest('www'))
})

// Tâche "build"
gulp.task('build', gulp.parallel('css', 'csv', 'js', 'img', 'nunjucks'))

// Tâche "prod" = Build + minify
gulp.task('prod', gulp.series('clean', gulp.parallel('build', 'minifyCSS')))

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
  gulp.watch('src/**/*.*', gulp.series('build'))
})
