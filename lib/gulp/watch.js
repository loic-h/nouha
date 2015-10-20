import gulp from 'gulp';
import * as c from './config';

gulp.task('watch', function() {
	gulp.watch(c.pathJs + '**/*', ['js']);
	gulp.watch(c.pathScss + '**/*', ['css']);
});
