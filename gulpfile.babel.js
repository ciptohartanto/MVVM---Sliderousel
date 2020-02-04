import {
  src,
  dest,
  parallel,
  series,
  watch
} from 'gulp'

// basic markup tasks
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import pug from 'gulp-pug'
import del from 'del'
import browserSync from 'browser-sync'
import sprite from 'gulp.spritesmith'

// webpackStream
import webpackStream from 'webpack-stream'

// filesystem to create Index
import fs, { exists } from 'fs'
import path from 'path'
import glob from 'glob'
import packageJSON from './package.json'
import { create } from 'domain'

const dirs = {
  src: 'src',
  dist: 'dist'
}

const sources = {
  markup: 'pug/*.pug',
  markup_includes: 'pug/**/*.pug',
  styling: 'sass/**/*.s[a|c]ss',
  spriteSass: 'sass/components',
  spriteImg: 'sprites/*.png',
  images: 'images/**/*',
  scripts: 'scripts/**/*',
  compiled_images: 'images',
  compiled_css: 'css',
  compiled_scripts: 'scripts',
  pug_index: 'pug-index'
}

/*  *** Tasks ***
- delete dist/
- copy image assets to dist/
- Convert either SCSS or Sass to CSS
- Convert .pug to .html
- watch for changes on images/, sass/, and pug/
 - Kick off Browsersync
*/

export const createIndex = (done) => {
  let fileList = ''
  glob('src/pug/*.pug', (err, files) => {
    files.forEach(file => {
      fileList +=
          '<li><a href="' +
          path.basename(file.substr(0, file.lastIndexOf(".")))
           +
          ".html" +
          '">' +
          path.basename(file.substr(0, file.lastIndexOf("."))) +
          "</a></li>";
    });
    
    // this is to check if the pug-index/ exists. either way it will always create this folder
    if(!fs.existsSync(`${dirs.dist}`)) {
      fs.mkdirSync(`${dirs.dist}`)
    }
    fs.writeFileSync(
      "dist/index.html",
      `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title> Markup ${packageJSON.name} </title>
    <style>
      body{
        padding: 100px;
        background: #00c300;
        font-weight: bold;
        line-height: 2;
        font-family: "Helvetica Neue", Helvetica, Arial;
        font-size: 25px;
        color: white;
      }
      .ul{
        display: flex;
        justify-content: space-between;
      }
      .li{
        width: 24%;
      }
      a{
        color: white;
        letter-spacing: 1.2px;
        text-decoration: none;
        transition: .15s all ease-in-out;
      }
      a:hover{
        color: black;
        transition: .2s all ease-in-out;
      }
      h1{
        text-align: center;
        padding-top: 50px;
        padding-bottom: 50px;
      }
    
    </style>
  </head>

  <body>
    <h1> Markup for ${packageJSON.name} </h1>
    <ul>
      ${fileList}
    </ul>
  </body>
</html>      
      `
    );
  });
  done() 
}

export const removeGenFiles = (done) => {
  del.sync([dirs.dist, `${dirs.src}/${sources.pug_index}`])
  done()
}
export const copyImagesToDist = (done) => {
  src(`${dirs.src}/${sources.images}`).pipe(dest(`${dirs.dist}/${sources.compiled_images}`))
  done()
}

export const parseScript = (done) => {
  src('src/scripts/app.js', {
      allowEmpty: true
    })
    .pipe(webpackStream({
      output: {
        filename: 'app.js'
      }
    }))
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
  del.sync([`${dirs.dist}/*.html`])
  markupIndex(done)
  markup(done)
  parseScript(done)
  done()
}
export const stylesheet = (done) => {
  src(`${dirs.src}/${sources.styling}`).pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError)).pipe(autoprefixer()).pipe(dest(`${dirs.dist}/${sources.compiled_css}`))
  done()
}

export const markup = (done) => {
  src(`${dirs.src}/${sources.markup}`).pipe(pug()).pipe(dest(`${dirs.dist}`))
  done()
}

export const markupIndex = (done) => {
  
  src(`${dirs.src}/${sources.pug_index}/index.pug`, {
    allowEmpty: true
  }).pipe(pug()).pipe(dest(`${dirs.dist}`))
  done()
}

export const spriteMe = (done) => {
  const spriteData = 
    src(`${dirs.src}/${sources.spriteImg}`).pipe(sprite({
    imgName: 'sprites.png',
    cssName: '_sprites.sass',
    imgPath: '../images/sprites.png',
    padding: 4
  }))
  spriteData.img.pipe(dest(`${dirs.src}/images`))
  spriteData.css.pipe(dest(`${dirs.src}/${sources.spriteSass}`))
  done()
}

export const browser_sync = (done) => {
  browserSync.init({
    server: {
      baseDir: dirs.dist,
      injectChanges: true
    }
  })
  done()
}

export const reload = (done) => {
  browserSync.reload()
  done()
}

export const devWatch = () => {
  watch(`${dirs.src}/${sources.markup_includes}`, series(createIndex, syncMarkup, reload))
  watch(`${dirs.src}/${sources.images}`, series(syncImages, reload))
  watch(`${dirs.src}/${sources.spriteImg}`, spriteMe)
  watch(`${dirs.src}/${sources.scripts}`, series(syncScripts, markup, reload))
  watch(`${dirs.src}/${sources.styling}`, series(syncStylesheet, markup, reload))

}

// export const markupDefaultTasks = [syncStylesheet, syncMarkup, syncImages, syncScripts]
export const dev = series(removeGenFiles, createIndex, markupIndex, parallel(spriteMe, stylesheet, markup, copyImagesToDist, parseScript, browser_sync), devWatch)