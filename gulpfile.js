var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
		sourcemaps = require('gulp-sourcemaps'),
		webpack = require('webpack-stream');

var path = {
    build: {
        html: 'web/',
        js: 'web/js',
        css: 'web/css'
    },
    src: {
        html: 'src/*.html',
				js: [ 'src/js/index.js' ],
        style: 'src/scss/styles.scss'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/**/*.js',
        style: 'src/**/*.scss'
    },
    clean: './build'
};

function build_html() {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));
}

function build_js() {
    return gulp.src(path.src.js)
			.pipe(webpack({
				mode: 'development',
				output: {
					filename: '[name].js',
				},
				module: {
					rules: [
						{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
					]
				}
			}
			))
			.pipe(gulp.dest(path.build.js));
}

function build_styles() {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
}


var build = gulp.parallel( build_styles, build_js );


function watch() {
    gulp.watch(path.watch.style, build_styles);
	gulp.watch(path.watch.js, build_js);

}

gulp.task('build', build);
gulp.task('watch', gulp.series(build_js, build_styles, watch));
gulp.task('default', build);