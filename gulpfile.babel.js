import { src, dest, parallel, series, watch } from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import pug from 'gulp-pug'
import del from 'del'
import browserSync from 'browser-sync'

import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import webpackConfig from './webpack.config.js'

const dirs = {
  src: 'src',
  dist: 'dist'
}

const sources = {
  markup: 'pug/**/*.pug',
  styling: 'sass/**/*',
  images: 'images/**/*',
  scripts: 'scripts/**/*',
  compiled_images: 'images',
  compiled_css: 'css',
  compiled_scripts: 'scripts'
}


/*  *** Tasks ***
- delete dist/
- copy image assets to dist/
- Convert either SCSS or Sass to CSS
- Convert .pug to .html
- watch for changes on images/, sass/, and pug/
 - Kick off Browsersync
*/


export const deleteDist = (done) => {
  del.sync([dirs.dist])
  done()
}
export const copyImagesToDist = (done) => {
  src(`${dirs.src}/${sources.images}`).pipe(dest(`${dirs.dist}/${sources.compiled_images}`))
  done()
}




export const parseScript = () => {
  src('src/scripts/app.js')
    .pipe(webpackStream({ output: { filename: 'app.js' } }))
    .pipe(dest('dist/scripts'))
}











export const syncImages = (done) => {
  del.sync([`${dirs.dist}/${sources.images}`])
  src(`${dirs.src}/${sources.images}`).pipe(dest(`${dirs.dist}/${sources.compiled_images}`))
  done()
}

export const syncScripts = (done) => {
  del.sync([`${dirs.dist}/${sources.scripts}`])
  src(`${dirs.src}/${sources.scripts}`).pipe(dest(`${dirs.dist}/${sources.compiled_scripts}`))
  done()
}

export const stylesheet = (done) => {
  src(`${dirs.src}/${sources.styling}`).pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)).pipe(autoprefixer()).pipe(dest(`${dirs.dist}/${sources.compiled_css}`))
  done()
}

export const markup = (done) => {
  src(`${dirs.src}/${sources.markup}`).pipe(pug()).pipe(dest(`${dirs.dist}`))
  done()
}

export const browser_sync = (done) => {
  browserSync.init({
    server: {
      baseDir: dirs.dist
    }
  })
  done()
}

export const reload = (done) => {
  browserSync.reload()
  done()
}


export const devWatch = () => {
  watch(`${dirs.src}/${sources.images}`, series(syncImages, reload))
  watch(`${dirs.src}/${sources.scripts}`, series(syncScripts, reload))
  watch(`${dirs.src}/${sources.styling}`, series(stylesheet, reload))
  watch(`${dirs.src}/${sources.markup}`, series(markup, reload))

}
export const dev = series(deleteDist, parallel(stylesheet, markup, copyImagesToDist, parseScript, browser_sync), devWatch)
