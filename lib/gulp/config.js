import path from 'path';

export const isDev = process.env.NODE_ENV !== 'production';

export const pathRoot = path.resolve('.') + '/';

export const pathAssets = pathRoot + 'assets/';

export const pathSrc = pathAssets + 'src/';
export const pathScss = pathSrc + 'scss/';
export const pathJs = pathSrc + 'js/';
export const pathViews = pathAssets + 'views/';

export const pathDist = pathAssets + 'dist/';

export const pathTmp = pathRoot + 'tmp/';
