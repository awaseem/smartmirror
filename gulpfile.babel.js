import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rimraf from 'rimraf';
import notify from 'gulp-notify';
import browserSync, { reload } from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import nested from 'postcss-nested';
import vars from 'postcss-simple-vars';
import extend from 'postcss-simple-extend';
import cssnano from 'cssnano';
import htmlReplace from 'gulp-html-replace';
import image from 'gulp-image';
import runSequence from 'run-sequence';

const paths = {
    bundle: 'app.js',
    srcJsx: 'src/Index.js',
    srcCss: 'src/**/*.css',
    srcImg: 'src/images/**',
    dist: 'dist',
    distJs: 'dist/js',
    distImg: 'dist/images'
};

gulp.task('clean', cb => {
    rimraf('dist', cb);
});

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: './',
            https: true
        }
    });
});

gulp.task('watchify', () => {
    let bundler = watchify(browserify(paths.srcJsx, watchify.args));

    function rebundle() {
        return bundler
            .bundle()
            .on('error', notify.onError())
            .pipe(source(paths.bundle))
            .pipe(gulp.dest(paths.distJs))
            .pipe(reload({stream: true}));
    }

    bundler.transform(babelify)
        .on('update', rebundle);
    return rebundle();
});

gulp.task('browserify', () => {
    browserify(paths.srcJsx)
        .transform(babelify)
        .bundle()
        .pipe(source(paths.bundle))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.distJs));
});

gulp.task('styles', () => {
    gulp.src(paths.srcCss)
        .pipe(sourcemaps.init())
        .pipe(postcss([vars, extend, nested, autoprefixer, cssnano]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist))
        .pipe(reload({stream: true}));
});

gulp.task('htmlReplace', () => {
    gulp.src('index.html')
        .pipe(htmlReplace({css: 'styles/main.css', js: 'js/app.js'}))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('images', () => {
    gulp.src(paths.srcImg)
        .pipe(image())
        .pipe(gulp.dest(paths.distImg));
});

gulp.task('lint', () => {
    gulp.src(paths.srcJsx)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('watchTask', () => {
    gulp.watch(paths.srcCss, ['styles']);
    gulp.watch(paths.srcJsx, ['lint']);
});

gulp.task('watch', cb => {
    runSequence('clean', ['browserSync', 'watchTask', 'watchify', 'styles', 'lint', 'images'], cb);
});

gulp.task('build', cb => {
    process.env.NODE_ENV = 'production';
    runSequence('clean', ['browserify', 'styles', 'htmlReplace', 'images'], cb);
});
