const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const { watch, series } = require('gulp');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const pipeIf = require('gulp-if');
const { argv } = require('yargs');

const imagemin = require('gulp-imagemin');

const pug = require('gulp-pug');

const styleFiles = [
    './src/css/jquery.fancybox.min.css',
    './src/css/owl.carousel.css',
    './src/css/owl.theme.default.css'
]

const jsFiles = [
    './src/js/jquery-1.10.2.js',
    './src/js/jquery.fancybox.min.js',
    './src/js/jquery.maskedinput.min.js',
    './src/js/owl.carousel.min.js',
    './src/js/wow.min.js'
]

gulp.task('copycss',() => {
    return gulp.src(styleFiles)
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('copyjs',() => {
    return gulp.src(jsFiles)
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('build:html', () => {
    return gulp.src('./src/*.pug')
    .pipe(pug({
        doctype: 'html',
        pretty: '\t'
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream());
});

gulp.task('build:sass', () => {
    return gulp.src('./src/scss/*.scss')
    .pipe(pipeIf(argv.develop, sourcemaps.init()))
    .pipe(sass({outputStyle:'compact', linefeed :'crlf'}).on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(pipeIf(argv.product, cleanCSS({
        level: 1
    })))
    .pipe(pipeIf(argv.develop, sourcemaps.write('.')))
    .pipe(pipeIf(argv.product, rename({
        suffix: '.min'
    })))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('build:images', () => {
    return gulp.src(['./src/images/**/*.png', './src/images/**/*.jpg', './src/images/**/*.svg'])
    .pipe(pipeIf(argv.product, imagemin({
        progressive: true
    })))
    .pipe(gulp.dest('./build/images/'));
});

gulp.task('svgsprite', function () {
	return gulp.src('./src/images/svg/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					render: {
						scss: {
							dest:'../../../scss/_sprite-style.scss',
							template: "./src/template/_sprite_template.scss"
						}
					}
				}
			}
		}))
		.pipe(gulp.dest('./src/images/sprite/'));
});

gulp.task('watch',() => {
    browserSync.init({
        server: {
            baseDir: './build/',
            port: 3000
        }
    });
    gulp.watch('./src/scss/style.scss', gulp.series('build:sass'))
    gulp.watch("./*.html").on('change', browserSync.reload)
    gulp.watch("./src/*.pug").on('change', gulp.series('build:html'))
    //gulp.watch('./**/*.js').on('change', browserSync.reload)
    //gulp.watch("./**/*.css").on('change', browserSync.reload);
    gulp.watch(['./src/images/**/*.png', './src/images/**/*.jpg', './src/images/**/*.svg'], gulp.series('build:images'));
});
//gulp.task(copy);
//gulp.task('default', watchSass);
//gulp.task('default', gulp.parallel(copy,watch));
gulp.task('default', gulp.series(gulp.parallel('build:html','build:sass','build:images'),'watch'));
gulp.task('copy', gulp.parallel('copycss','copyjs'));