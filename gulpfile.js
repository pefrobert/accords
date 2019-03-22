// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

console.log(plugins)

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


// Tâche "minify" = minification CSS (destination -> destination)
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
  // Renders template with nunjucks
  .pipe(plugins.nunjucksRender({
      path: ['src/html/templates']
    }))
  // output files in www folder
  .pipe(gulp.dest('www'));
});

gulp.task('htmlbeautify', function(){
	return gulp.src('www/*.html')
	  // indent html files
  	.pipe(plugins.htmlBeautify())
	.pipe(gulp.dest('www'));
});


// Tâche "build"
gulp.task('build', ['css', 'js', 'nunjucks', 'htmlbeautify']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minifyCSS']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
  gulp.watch('src/css/*.css', ['build']);
  gulp.watch('src/html/*.html', ['build']);
  gulp.watch('src/js/*.js', ['build']);
  gulp.watch('src/html/template/*.njk', ['build']);
});