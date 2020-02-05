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
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import packageJSON from './package.json'

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

// a task to create index.html
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

// a task to remove dist/
export const removeDist = (done) => {
  del.sync(dirs.dist)
  done()
}

// a task to create a duplicate of src/images/
export const copyImagesToDist = (done) => {
  src(`${dirs.src}/${sources.images}`).pipe(dest(`${dirs.dist}/${sources.compiled_images}`))
  done()
}

// a task to pasre ES6
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

// a task to delete only dist/images and make a duplicate of src/images
export const syncImages = (done) => {
  del.sync([`${dirs.dist}/${sources.images}`])
  src(`${dirs.src}/${sources.images}`).pipe(dest(`${dirs.dist}/${sources.compiled_images}`))
  done()
}

// a task to delete only dist/scripts and run parseScript task
export const syncScripts = (done) => {
  del.sync([`${dirs.dist}/${sources.scripts}`])
  parseScript(done)
  done()
}

// a task to delete only dist/css and run stylesheet task
export const syncStylesheet = (done) => {
  del.sync([`${dirs.dist}/${sources.compiled_css}`])
  stylesheet(done)
  done()
}

// a task to delete only dist/*html 
// and run markupIndex task to create index.html, markup, and parseScript tasks
export const syncMarkup = (done) => {
  del.sync([`${dirs.dist}/*.html`])
  markupIndex(done)
  markup(done)
  parseScript(done)
  done()
}

// a task to export Sass/SCSS to CSS
export const stylesheet = (done) => {
  src(`${dirs.src}/${sources.styling}`).pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError)).pipe(autoprefixer()).pipe(dest(`${dirs.dist}/${sources.compiled_css}`))
  done()
}

// a task to export pug/jade to html
export const markup = (done) => {
  src(`${dirs.src}/${sources.markup}`).pipe(pug()).pipe(dest(`${dirs.dist}`))
  done()
}

// a task to create index.html
export const markupIndex = (done) => {
  src(`${dirs.src}/${sources.pug_index}/index.pug`, {
    allowEmpty: true
  }).pipe(pug()).pipe(dest(`${dirs.dist}`))
  done()
}

// a task to create sprites.png
export const spriteMe = (done) => {
  const spriteData = 
    src(`${dirs.src}/${sources.spriteImg}`, {
      allowEmpty: true
    }).pipe(sprite({
    imgName: 'sprites.png',
    cssName: '_sprites.sass',
    imgPath: '../images/sprites.png',
    padding: 4
  }))
  spriteData.img.pipe(dest(`${dirs.src}/images`))
  spriteData.css.pipe(dest(`${dirs.src}/${sources.spriteSass}`))
  done()
}

// a task to start browserSync
export const browser_sync = (done) => {
  browserSync.init({
    server: {
      baseDir: dirs.dist,
      injectChanges: true
    }
  })
  done()
}

// a task to reload browserSync
export const reload = (done) => {
  browserSync.reload()
  done()
}

// a set of watch tasks
// watch:
// - changes under pug/
// - changes under sprites/
// - changes under scripts/
// - changes under sass/
export const devWatch = () => {
  watch(`${dirs.src}/${sources.markup_includes}`, series(createIndex, syncMarkup, reload))
  watch(`${dirs.src}/${sources.images}`, series(syncImages, reload))
  watch(`${dirs.src}/${sources.spriteImg}`, spriteMe)
  watch(`${dirs.src}/${sources.scripts}`, series(syncScripts, markup, reload))
  watch(`${dirs.src}/${sources.styling}`, series(syncStylesheet, markup, reload))
}

// default dev tasks
export const dev = 
  series(removeDist, createIndex, markupIndex, 
    parallel(spriteMe, stylesheet, markup, copyImagesToDist, parseScript, browser_sync), 
  devWatch)