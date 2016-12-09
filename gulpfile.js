var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('styles', function() {
    gulp.src('./src/style/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/style/css/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('./src/style/sass/*.scss',['styles']);
});
