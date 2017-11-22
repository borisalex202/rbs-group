var development = 'build/';

var path = {
    build: {
        html: development,
        js: 'js/',
        jquery: 'js/jquery/', // jquery делаем отдельно чтобы подключить его в head
        html5shiv: 'js/html5shiv/', // html5shiv делаем отдельно чтобы подключить его в head
        css: 'css/',
        img: 'img/',
        fonts: 'fonts/'
    },
    src: {
        html: 'src/*.html',
        jsInternal: 'src/js/internal.js',
        jsExternal: 'src/js/external.js',
        jsAll: 'src/js/*.js',
        jquery: 'bower_components/jquery/dist/*.*', // jquery делаем отдельно чтобы подключить его в head
        html5shiv: 'bower_components/html5shiv/dist/*.*', // html5shiv делаем отдельно чтобы подключить его в head
        styleInternal: 'src/sass/internal.scss',
        styleExternal: 'src/sass/external.scss',
        stylePartials: 'src/sass/partials/',
        styleInclude: 'src/sass/',
        imgs: 'src/img/',
        img: ['src/img/**/*.*', '!src/img/sprite/**/*.*'],
        imgSprite: 'src/img/sprite/**/*.*',
        svg: 'src/img/svg/',
        templates: 'src/templates/',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        jsAll: 'src/js/*.js',
        jsInternal: ['src/js/**/*.js', '!src/js/external.js'],
        jsExternal: 'src/js/external.js',
        styleInternal: ['src/sass/**/*.scss', '!src/sass/external.scss'],
        styleExternal: 'src/sass/external.scss',
        img: 'src/img/**/*.*',
        imgSprite: 'src/img/sprite/**/*.*',
        svg: 'src/img/svg/*.svg',
        fonts: 'src/fonts/**/*.*'
    }
};

module.exports = {
    browsersync: {
        server: {
            baseDir: './' + development
        },
        tunnel: false,
        open: false,
        host: 'localhost',
        port: 3000,
        logPrefix: "Frontend_Blank"
    },
    html: {
        src: path.src.html,
        dest: path.build.html
    },
    js: {
        srcInternal: path.src.jsInternal,
        srcExternal: path.src.jsExternal,
        srcAll: path.src.jsAll,
        srcJquery: path.src.jquery, // jquery делаем отдельно чтобы подключить его в head
        srcHtml5shiv: path.src.html5shiv, // html5shiv делаем отдельно чтобы подключить его в head
        development: {
            dest: development + path.build.js,
            destJquery: development + path.build.jquery,
            destHtml5shiv: development + path.build.html5shiv
        }
    },
    sass: {
        src: path.src.styleInclude,
        partials: path.src.stylePartials,
        srcInternal: path.src.styleInternal,
        srcExternal: path.src.styleExternal,
        options: {
            includePaths: [path.src.styleInclude],
            sourceMap: true,
            errLogToConsole: true
        },
        development: {
            dest: development + path.build.css
        }
    },
    autoprefixer: {
        browsers: [
            'last 10 versions',
            'IE 8',
            'IE 9',
            '> 3%'
        ]
    },
    images: {
        src: path.src.img,
        development: {
            dest: development + path.build.img
        }
    },
    svg: {
        sprite: path.src.imgs,
        path: [
            path.src.svg
        ]
    },
    templates: {
      path: path.src.templates
    },
    imagemin: {
        // use добавляется в таске
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true
    },
    fonts: {
        src: path.src.fonts,
        development: {
            dest: development + path.build.fonts
        }
    },
    watch: {
        html: path.watch.html,
        jsAll: path.watch.jsAll,
        jsInternal: path.watch.jsInternal,
        jsExternal: path.watch.jsExternal,
        sassInternal: path.watch.styleInternal,
        sassExternal: path.watch.styleExternal,
        images: path.watch.img,
        sprites: path.watch.imgSprite,
        fonts: path.watch.fonts,
        svg: path.src.svg
    },
    clean: {
        development: {
            dest: './' + development
        }
    },
    /**
     * Wrap gulp streams into fail-safe function for better error reporting
     * Usage:
     * gulp.task('js', config.wrapPipe(function(success, error) {
     *   return gulp.src('js/*.js')
     *      .pipe(js().on('error', error))
     *      .pipe(gulp.dest('app/css'));
     * }));
     */
    wrapPipe: function(taskFn) {
        return function(done) {
            var onSuccess = function() {
                done();
            };
            var onError = function(err) {
                done(err);
            };
            var outStream = taskFn(onSuccess, onError);
            if(outStream && typeof outStream.on === 'function') {
                outStream.on('end', onSuccess);
            }
        }
    }
};
