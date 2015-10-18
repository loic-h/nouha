import gulp from 'gulp';
import * as c from './config';

import del from 'del';

gulp.task('clean', function(cb) {
	del(
		[
			c.pathDist + '**/*',
			'!' + c.pathDist + '{,.keep}',
			c.pathTmp + '**/*',
			'!' + c.pathTmp + '{,.keep}'
		],
		{dot: true},
		cb
	);
});
