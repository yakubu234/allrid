const gulp = require('gulp');

gulp.task('copy-views', function () {
    return gulp.src('src/view/**/*.ejs')
        .pipe(gulp.dest('dist/view'));
});
