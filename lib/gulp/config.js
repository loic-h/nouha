import path from 'path';

export let isDev = process.env.NODE_ENV !== 'production';

export let pathRoot = path.resolve('.') + '/';

export let pathAssets = pathRoot + 'assets/';

export let pathSrc = pathAssets + 'src/';
export let pathScss = pathSrc + 'scss/';
export let pathJs = pathSrc + 'js/';

export let pathDist = pathAssets + 'dist/';

export let pathTmp = pathRoot + 'tmp/';
