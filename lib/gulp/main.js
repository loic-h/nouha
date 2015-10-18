import gulp from 'gulp';

import * as c from './config';

import './clean';
import './css';
import './js';

gulp.task('default', ['css', 'js']);

gulp.task('watch', function() {
	gulp.watch(c.pathJs + '**/*', ['js']);
	gulp.watch(c.pathScss + '**/*', ['css']);
});
