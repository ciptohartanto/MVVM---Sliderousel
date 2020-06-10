
# Settings
### Styling - Sass / SCSS

🥳 You can use Sass and/or SCSS.

**Folder Structure**

```
gulp4/
└── src/
    ├── ...
    ├── sass/
    │   ├── components/
    │   │   ├── _sprites.sass            /--- => 𝘨𝘦𝘯𝘦𝘳𝘢𝘵𝘦𝘥 𝘣𝘺 𝘨𝘶𝘭𝘱.𝘴𝘱𝘳𝘪𝘵𝘦𝘴𝘮𝘪𝘵𝘩
    │   │   └── _sprites-settings.sass   /--- => 𝘨𝘶𝘭𝘱.𝘴𝘱𝘳𝘪𝘵𝘦𝘴𝘮𝘪𝘵𝘩 𝘤𝘶𝘴𝘵𝘰𝘮 𝘴𝘦𝘵𝘵𝘪𝘯𝘨𝘴
    │   └── index.sass                   /--- => 𝘵𝘩𝘦 𝘪𝘯𝘥𝘦𝘹 𝘰𝘧 𝘢𝘭𝘭 𝘱𝘢𝘳𝘵𝘪𝘢𝘭 𝘚𝘢𝘴𝘴 𝘧𝘪𝘭𝘦𝘴
    └── ...

```
**Common Practices**
- Append partial Sass files with underscore `_`. For instance: `_myComponent`. This will command Sass engine to not compile them into actual CSS files.
- `index.sass` is to register all of your Sass partial files. This will be generated into `index.css`.

### Markup - Pug a.k.a Jade

**Folder Structure**

```
gulp4/
└── src/
    ├── ...
    ├── pug/
    │   ├── _includes/
    │   │   └── test-head.pug
    │   └── test-page.pug
    └── ...

```

**Suggested Practices**
- 🥳 Since Gulp script creates the `index.html`, so you can just write your own `.pug` pages. 
- `_includes/` contains all HTML snippets that can be reused within your project. This, though, can be empty if you don't want to use it.


### Javascript
🥳 You can use ES6 syntax here

**Folder Structure**

```
gulp4/
└── src/
    ├── ...
    ├── scripts/
    │   ├── _test.js
    │   └── app.js
    └── ...

```


### Images - Regular (JPG, etc.)

🥳 All changes under `images/` will be reflected automatically to your browser.

**Folder Structure**

```
gulp4/
└── src/
    ├── ...
    ├── images/
    │   ├── sprites.png       /--- => 𝘨𝘦𝘯𝘦𝘳𝘢𝘵𝘦𝘥 𝘣𝘺 𝘨𝘶𝘭𝘱.𝘴𝘱𝘳𝘪𝘵𝘦𝘴𝘮𝘪𝘵𝘩
    │   ├── yourImage.jpg
    │   ├── yourImage1.jpg
    │   └── ...
    └── ...

```

**Suggested Practices**
- 🥳 Since Gulp script employs `gulp.spritesmith`, the generated sprite file is placed under `images/` 
- Please include your images into `images/` folder. 


### Images - Sprites 

🥳 All changes under `sprites/` will be reflected automatically to your browser.

**Note**: please check **❗Notices** section.

**Folder Structure**

```
gulp4/
└── src/
    ├── ...
    ├── sprites/
    │   ├── ico-myIco1.png
    │   ├── ico-myIco2.png
    │   ├── ico-checked--green.png
    │   ├── ico-checked--red.png
    │   └── ...
    └── ...

```
**❗Notices**
- If you don't use sprite technique in your project, please remove the following files:

    - sprites/**
    - sass/components/_sprites.sass
    - sass/components/_sprites-settings.sass
    - images/sprites.png

- Since Gulp script employs `gulp.spritesmith`, it only reads `.png` file format.
- Please don't create sub-folders.
