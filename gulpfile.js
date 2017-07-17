var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var path = require('path');
var bs = require('browser-sync').create();
var ROOT = path.resolve(__dirname);
var server = path.resolve(ROOT, 'server');

gulp.task('browser-sync', ['nodemon'], function() {
  bs.init(null, {
    proxy: "http://localhost:8080/index.html",
    port: 4000,
    open: false,//停止自动打开浏览器
  });
});

gulp.task('server', ['browser-sync'], function() {
  gulp.watch(['./server.js', './server/**'], ['bs-delay']);
});

gulp.task('bs-delay', function() {
  setTimeout(function() {
    bs.reload();
    console.log('重启完毕');
  }, 2000);
});

gulp.task('nodemon', function() {
  var started = false;
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development',
    },
    watch: [
      server
    ]
  }).on('start', function() {
    if(!started) {
      cb();
      started = true;
    }
  })
});