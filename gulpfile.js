const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();

var requiredFiles = ['modules/**/*.js', '!js/vendors/**/*.js'];

function scssTask(){
    return src('src/scss/main.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('src/css', { sourcemaps: true }));
}

function jsTask(){
    return src(['node_modules/babel-polyfill/dist/polyfill.js', 'src/js/main.js'], { sourcemaps: true })
        .pipe(babel({
          presets: ['@babel/preset-env']
        }))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

function browsersyncServe(cb){
    browsersync.init({
        watch: true,
        server: "./src"
    });
    cb();
}

function browsersyncReload(cb){
    browsersync.reload();
    cb();
}

function watchTask(){
    watch('*html', browsersyncReload);
    watch(['src/scss/**/*.scss', 'src/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}

//default gulp task
exports.default = series(
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
);

