/**
*Dependecias
*/
var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	browserSync = require('browser-sync').create();


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });
    gulp.watch("view/*.pug", ['pug']);
    gulp.watch("scss/**/*.scss", ['sass']);
    //gulp.watch("app/*.html").on('change', browserSync.reload);
});


gulp.task('pug', function(){
	return gulp.src('view/*.pug')
		.pipe(pug({
			pretty:true
		}))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.stream());
});

/**
*Compila los archivos sass y agrega los prefijos
*/

gulp.task('sass', function(){
	var processors = [
		autoprefixer({ browsers: ['last 2 versions']})
	];

	return gulp.src('scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});
/**
* Ejecuta la tarea sass y se queda escuchando
*/
gulp.task('watch',['sass'],function(){
	gulp.watch('scss/**/*.scss',['sass'])
});

gulp.task('default', ['serve']);