var gulp = require('gulp');
var    sass = require('gulp-sass');
var   browserSync = require('browser-sync').create();
var cache = require('gulp-cache');   

gulp.task('clearCache', async function() {
  cache.clearAll();

});
gulp.task('sass', async function () {
    gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream())
});
 
gulp.task('js',  async function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
})

gulp.task('serve',gulp.series('sass', async function(){
    browserSync.init({
        server: "./src"
    });
    gulp.watch('./src/scss/*.scss', gulp.series('sass'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
})); 

gulp.task('default', gulp.series('clearCache','serve', async function() { 
    gulp.clearCache
})); 
