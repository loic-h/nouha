import * as c from './config';
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babel from 'babelify';
import uglify from 'gulp-uglify';
import gulpIf from 'gulp-if';
import eslint from 'gulp-eslint';

gulp.task('eslint', function() {
	return gulp.src([
		c.pathJs + '**/*.js',
		c.pathRoot + 'gulpfile.js',
		c.pathRoot + 'lib/**/*.js'
	])
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

gulp.task('js', ['eslint'], function() {
	let bundler = browserify(c.pathJs + 'app.js', {debug: true}).transform(babel);

	bundler.bundle()
		.on('error', function(err) {
			console.error(err);
			this.emit('end');
		})
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulpIf(!c.isDev, uglify()))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(c.pathDist));
});
