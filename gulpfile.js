const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {
    browserSync({
        server: {baseDir: "dist"}
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('watch', function() {
    gulp.watch("src/assets/sass/**/*.+(scss|sass|css)", gulp.parallel('styles-dark'));
    gulp.watch("src/assets/sass/**/*.+(scss|sass|css)", gulp.parallel('styles-light'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/assets/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/assets/libs/**/*").on('change', gulp.parallel('libs'));
    gulp.watch("src/assets/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/assets/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/assets/images/**/*").on('all', gulp.parallel('images'));
});

gulp.task('styles-dark', function() {
    return gulp.src("src/assets/sass/core-dark.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/assets/css/"))
        .pipe(browserSync.stream());
});

gulp.task('styles-light', function() {
    return gulp.src("src/assets/sass/core-light.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/assets/css/"))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function () {
    return gulp.src("src/assets/js/**/*.js")
        .pipe(gulp.dest("dist/assets/js"))
        .pipe(browserSync.stream());
});

gulp.task('libs', function () {
    return gulp.src("src/assets/libs/**/*")
        .pipe(gulp.dest("dist/assets/libs"))
        .pipe(browserSync.stream());
});


gulp.task('fonts', function () {
    return gulp.src("src/assets/fonts/**/*")
        .pipe(gulp.dest("dist/assets/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src("src/assets/icons/**/*")
        .pipe(gulp.dest("dist/assets/icons"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("src/assets/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/assets/images"))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('server', 'watch', 'styles-dark',  'styles-light', 'scripts', 'libs', 'fonts', 'icons', 'html', 'images'));