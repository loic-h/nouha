import gulp from 'gulp';
import * as c from './config';

import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import gulpif from 'gulp-if';
import csso from 'gulp-csso';


gulp.task('css', function() {
	return gulp.src(c.pathScss + 'app.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: [
				c.pathRoot + 'node_modules/',
				c.pathTmp + 'css/'
			]
		}))
		.on('error', function(err) {
			console.error(err);
			this.emit('end');
		})
		.pipe(gulpif(!c.isDev, csso()))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest(c.pathDist));
});
