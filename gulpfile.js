var gulp 		= require("gulp");
var cleanCSS 	= require('gulp-clean-css');
var sass 		= require('gulp-sass');
var htmlclean 	= require('gulp-htmlclean');

gulp.task('convert-sass', function () {
  return gulp.src('./source/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('convert-html', function() {
  return gulp.src('./source/*.html')
    .pipe(htmlclean({
        protect: /<\!--%fooTemplate\b.*?%-->/g,
        edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
      }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('move-files',function(){
	gulp.watch('./source/scss/*.scss',['convert-sass']);
	gulp.watch('./source/*.html',['convert-html']);
});