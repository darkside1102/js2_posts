
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es');

gulp.task('concat', function () {
  return gulp.src([
    './app/js2_task7_1.js', './app/js2_task7_2.js'
    ])
    .pipe(concat({ path: 'js2_task7.js' }))
    .pipe(gulp.dest('./app'))
})

gulp.task('compress', function() {
	return gulp.src('./app/js2_task7.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
})


