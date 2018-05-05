const gulp = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const htmlsplit = require('gulp-htmlsplit');

var app = {
	cshtmlDir: './assets/cshtml',
	tempDir: './tmp',
	headFile: '_head.cshtml',
	indexFile: 'index.html',
	scriptTags: ''
}

gulp.task('default', ['tidy'], function () {
	console.log('Done');
});

gulp.task('tidy', ['replaceTags'], function () {
	// Clean out the Temp Directory
	return gulp.src(app.tempDir + '/*.*')
		.pipe(clean());
});

gulp.task('replaceTags', ['generateCSHTML'], function () {
	// Replace script and style tags with C# @ declarations
	var reStyleStart = /<link rel=\"stylesheet\" href=\"\.*/gi;
	var reStyleEnd = /\.css\"\s*\/>/gi;
	var reScriptStart = /<script src=\"\.*/gi;
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

gulp.task('generateCSHTML', ['rebase'], function () {
	return gulp.src(app.tempDir + '/' + app.indexFile)
		.pipe(htmlsplit())
		.pipe(gulp.dest(app.cshtmlDir));
});

gulp.task('rebase', ['clean'], function () {
	var reSiteBase = /\/assets\//gi;
	var csSiteBase = '/site/assets/';

	return gulp.src([app.indexFile])
		.pipe(replace(reSiteBase, csSiteBase))
		.pipe(gulp.dest(app.tempDir));
});

gulp.task('clean', function () {
	return gulp.src(app.cshtmlDir + '/*.*')
		.pipe(clean());
});
