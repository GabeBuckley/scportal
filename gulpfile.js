const gulp = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const htmlsplit = require('gulp-htmlsplit');

var app = {
	cshtmlDir: './assets/cshtml',
	headFile: '_head.cshtml',
	scriptTags: ''
}


gulp.task('generateCSHTML', ['clean'], function () {
	return gulp.src('./index.html')
		.pipe(htmlsplit())
		.pipe(gulp.dest(app.cshtmlDir));
});


gulp.task('replaceTags', ['generateCSHTML'], function () {
	var reStyleStart = /<link rel=\"stylesheet\" href=\"/gi;
	var reStyleEnd = /\.css\"\s*\/>/gi;
	var reScriptStart = /<script src=\"\./gi;
	var reScriptEnd = /\.js\"\s*><\/script>/gi;

	var csStyleStart = '@Styles.Render("~';
	var csStyleEnd = '.css")';
	var csScriptStart = '@Scrupts.Render("~';
	var csScriptEnd = '.js")';


	return gulp.src([app.cshtmlDir + '/' + app.headFile])
		.pipe(replace(reStyleStart, csStyleStart))
		.pipe(replace(reStyleEnd, csStyleEnd))
		.pipe(replace(reScriptStart, csScriptStart))
		.pipe(replace(reScriptEnd, csScriptEnd))
		.pipe(gulp.dest(app.cshtmlDir));
});


gulp.task('clean', function () {
	return gulp.src(app.cshtmlDir + '/*.*')
		.pipe(clean());
});


gulp.task('default', ['replaceTags'], function () {
	console.log('Done');
});

/**
gulp.task('default', ['replaceFags'], function () {
	console.log('Done');
});
**/
