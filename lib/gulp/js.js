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
import jade from 'gulp-jade';
import concat from 'gulp-concat';
import insert from 'gulp-insert';
import through from 'through2';
import path from 'path';

gulp.task('eslint', function() {
	return gulp.src([
		c.pathJs + '**/*.js',
		c.pathRoot + 'gulpfile.js',
		c.pathRoot + 'lib/**/*.js'
	])
	.pipe(eslint())
	.pipe(eslint.format());
});

function modify(opts) {
	const options = Object.assign({
		base: ''
	}, opts);
	return through.obj(function(file, enc, done) {
		let key = file.path
					.replace(options.base, '')
					.replace('.js', '');
		let contents = `'${key}': ${file.contents.toString()},\n\n`;
		file.contents = new Buffer(contents);
		this.push(file);
		return done();
	});
}

gulp.task('tpl', function() {
	return gulp.src([c.pathViews + 'front/**/*.jade'])
		.pipe(jade({
			client: true
		}))
		.on('error', function(err) {
			console.error(err);
			this.emit('end');
		})
		.pipe(modify({
			base: c.pathViews + 'front/'
		}))
		.pipe(concat('templates.js'))
		.pipe(insert.wrap(`import jade from 'jade/runtime';export default {`, '};'))
		.pipe(gulp.dest(c.pathTmp));
});

gulp.task('js', ['eslint', 'tpl'], function() {
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
