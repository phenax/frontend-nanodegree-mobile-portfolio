const gulp= require('gulp');
const minify= require('gulp-clean-css');
const imageOptim= require('gulp-image-optimization');
const imageResize= require('gulp-image-resize');
const rename= require('gulp-rename');
const url= require('url');


// Options to pass to gulp-image-optimization
const optimizationOptions= {
	optimizationLevel: 5,
	progressive: true,
};

// All the images to optimize
const imageList= [
	{
		name: '2048.png',
		location: 'img',
		dest: './dist/img',
		size: 300
	},
	{
		name: 'cam_be_like.jpg',
		location: 'img',
		dest: './dist/img',
		size: 300
	},
	{
		name: 'mobilewebdev.jpg',
		location: 'img',
		dest: './dist/img',
		size: 300
	},
	{
		name: 'profilepic.jpg',
		location: 'img',
		dest: './dist/img',
		size: 300
	}
];

function minfyCSS() {

	return gulp
		.src(`./css/*.css`)
		.pipe(minify({ compatibility: 'ie8' }))
		.pipe(gulp.dest('./dist/css'));
}

/**
 * Optimizes all the images
 */
function minifyImages() {

	imageList.forEach(
		image => 
			gulp.src(`./${image.location}/${image.name}`)
				.pipe(imageResize({ width: image.size }))
				// .pipe(imageOptim(optimizationOptions))
				.pipe(gulp.dest(image.dest))
	);
}

gulp.task('minify:css', minfyCSS);
gulp.task('minify:img', minifyImages);
