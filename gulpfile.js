// Requis
var gulp = require('gulp');
var fs = require('fs');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

var templateData = {
  glossary : JSON.parse(fs.readFileSync('src/data/read.glossary.json')),
  glossaryString : fs.readFileSync('src/data/read.glossary.json'),
};

console.log(plugins);

gulp.task('css', function () {
  return gulp.src('src/css/*.css')
    /* ici les plugins Gulp à exécuter */
    .pipe(gulp.dest('www/css'));
});

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    /* ici les plugins Gulp à exécuter */
    .pipe(gulp.dest('www/js'));
});

gulp.task('img', function () {
  return gulp.src('src/img/**/*.*')
    /* ici les plugins Gulp à exécuter */
    .pipe(gulp.dest('www/img'));
});

// Tâche "minify" = minification CSS (source -> destination)
gulp.task('minifyCSS', function () {
  return gulp.src('www/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('www/css'));
});

gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('src/html/*.html')
  .pipe(plugins.data(function(file){
    return templateData;
  }))
  // Renders template with nunjucks
  .pipe(plugins.nunjucksRender({
      path: ['src/html/templates']
    }))
  // output files in www folder
  .pipe(gulp.dest('www'));
});

// Tâche "build"
gulp.task('build', ['css', 'js', 'img', 'nunjucks']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minifyCSS']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
  gulp.watch('src/**/*.*', ['build']);
});