const gulp= require('gulp');
const minify= require('gulp-clean-css');
const imageOptim= require('gulp-image-optimization');
const imageResize= require('gulp-image-resize');


// Options to pass to gulp-image-optimization
const optimizationOptions= {
	optimizationLevel: 5,
	progressive: true,
};

// All the images to optimize
const imageList= [
	{
		src: './img/2048.jpg',
		dest: './dist/img',
		size: 400
	},
	{
		src: './img/cam_be_like.jpg',
		dest: './dist/img',
		size: 300
	},
	{
		src: './img/mobilewebdev.jpg',
		dest: './dist/img',
		size: 400
	},
	{
		src: './img/profilepic.jpg',
		dest: './dist/img',
		size: 70
	},
	{
		src: './views/images/pizzeria.jpg',
		dest: './views/dist/img',
		size: 700
	},
	{
		src: './views/images/pizza.png',
		dest: './views/dist/img',
		size: 700,
		noOptim: true
	}
];

function minfyCSS() {

	const minifyCSSSource= (src) => {

		gulp.src(`${src}css/*.css`)
			.pipe(minify({ compatibility: 'ie8' }))
			.pipe(gulp.dest(`${src}dist/css`));
	};

	minifyCSSSource('./');
	minifyCSSSource('./views/');
}

/**
 * Optimizes all the images
 */
function minifyImages() {

	imageList.forEach(

		image => {

			let source= 
				gulp.src(image.src)
					.pipe(imageResize({ width: image.size }));

			if(!image.noOptim) {
				source= 
					source
						.pipe(imageOptim(optimizationOptions))
			}

			source.pipe(gulp.dest(image.dest))
		}
	);
}

gulp.task('minify:css', minfyCSS);
gulp.task('minify:img', minifyImages);
