import gulp from 'gulp';
import * as c from './config';

import './clean';
import './css';
import './js';
import './watch';

gulp.task('default', ['css', 'js']);
