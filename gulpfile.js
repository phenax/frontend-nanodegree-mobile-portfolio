const path= require('path');

const gulp= require('gulp');
const minify= require('gulp-clean-css');
const imageOptim= require('gulp-image-optimization');
const imageResize= require('gulp-image-resize');
const uglify = require('gulp-uglify');


// Options to pass to gulp-image-optimization
const optimizationOptions= {
	optimizationLevel: 5,
	progressive: true,
};

// All the images to optimize
const imageList= [
	{
		name: '2048.jpg',
		size: 400
	},
	{
		name: 'cam_be_like.jpg',
		size: 300
	},
	{
		name: 'mobilewebdev.jpg',
		size: 400
	},
	{
		name: 'profilepic.jpg',
		size: 70
	},
	{
		name: 'pizzeria.jpg',
		size: 500
	},
	{
		name: 'pizza.png',
		size: 150,
		noOptim: true
	}
];

/**
 * Optimizes all the images
 */
function minifyImages() {

	imageList.forEach(

		image => {

			let source= 
				gulp.src(path.join(__dirname, './src/img/', image.name))
					.pipe(imageResize({ width: image.size }));

			if(!image.noOptim) {
				source= 
					source
						.pipe(imageOptim(optimizationOptions))
			}

			source.pipe(
				gulp.dest(path.join(__dirname, './dist/img/'))
			);
		}
	);
}



/**
 * Minify CSS files
 */
function minfyCSS() {

	const minifyCSSSource= 
		(src, dest) => 
			gulp.src(path.join(__dirname, src, '*.css'))
				.pipe(minify({ compatibility: 'ie8' }))
				.pipe(gulp.dest(path.join(__dirname, dest)));

	return minifyCSSSource('./src/css/', './dist/css/');
}



/**
 * JS file minification
 */
function minifyJS() {

	return gulp
		.src('./src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'));
}





gulp.task('minify:js', minifyJS);
gulp.task('minify:css', minfyCSS);
gulp.task('minify:img', minifyImages);
