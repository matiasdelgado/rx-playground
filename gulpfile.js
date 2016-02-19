var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");
var connect = require("gulp-connect");
var rename = require("gulp-rename");
var gprint = require("gulp-print");

gulp.task("debug", function() {
    return gulp.watch('src/**-es6.js', function(obj) {
        console.log("watching...", obj.path);
        if (obj.type === 'changed') {
            gulp.src(obj.path, { base: './' })
                .pipe(plumber({ errorHandler: function(error) { console.log(error); }}))
                .pipe(babel())
                .pipe(rename(function(path) {
                    path.basename = path.basename.replace(/-es6$/, '');
                }))
                .pipe(gulp.dest("dist"))
                .pipe(gprint(function(filePath) {
                    return "File processed: " + filePath;
                }));
        }
    });
});

gulp.task("default", ["debug"], function() {
  connect.server();
});
