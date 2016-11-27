const gulp= require('gulp');
const minify= require('gulp-clean-css');
const url= require('url');

const BUILD_DIR= "./css";
const FILE_DIR= "./css/min";


function minfyCSS() {
	return gulp
		.src(`${FILE_DIR}/*.css`)
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(minify({ compatibility: 'ie8' }))
		.pipe(gulp.dest(`${BUILD_DIR}/css/`));
}

function minifyImages() {

}

gulp.task('minify:css', minfyCSS);
gulp.task('minify:img', minifyImages);

gulp.task('default', ['minify:css']);