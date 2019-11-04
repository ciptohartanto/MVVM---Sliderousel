import { src, dest, parallel, series, watch } from 'gulp'

// basic markup tasks
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import pug from 'gulp-pug'
import del from 'del'
import browserSync from 'browser-sync'

// webpackStream
import webpackStream from 'webpack-stream'

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

export const parseScript = (done) => {
  src('src/scripts/app.js')
    .pipe(webpackStream({ output: { filename: 'app.js' } }))
    .pipe(dest('dist/scripts'))
  done()
}

export const syncImages = (done) => {
  del.sync([`${dirs.dist}/${sources.images}`])
  src(`${dirs.src}/${sources.images}`).pipe(dest(`${dirs.dist}/${sources.compiled_images}`))
  done()
}

export const syncScripts = (done) => {
  del.sync([`${dirs.dist}/${sources.scripts}`])
  parseScript(done)
  done()
}

export const syncStylesheet = (done) => {
  del.sync([`${dirs.dist}/${sources.compiled_css}`])
  stylesheet(done)
  done()
}
export const syncMarkup = (done) => {
  del.sync([`${dirs.dist}`])
  markup(done)
  parseScript(done)
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
  watch(`${dirs.src}/${sources.scripts}`, series(syncScripts, syncMarkup, reload))
  watch(`${dirs.src}/${sources.styling}`, series(syncStylesheet, reload))
  watch(`${dirs.src}/${sources.markup}`, series(syncMarkup, reload))

}
export const dev = series(deleteDist, parallel(syncImages, syncScripts, markup, stylesheet), browser_sync, devWatch)
