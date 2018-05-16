const gulp = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const htmlsplit = require('gulp-htmlsplit');

var app = {
	cshtmlDir: './deploy/assets/cshtml',
	tempDir: './tmp',
	headFile: '_head.cshtml',
	indexFile: 'index.html',
	scriptTags: '',
	assetDir: './assets',
	pubDir: './deploy',
}

var reSiteBase_1 = /(\'|\'\.)\/assets\//gi;
var csSiteBase_1 = "'~/site/assets/";
var reSiteBase_2 = /(\"|\"\.)\/assets\//gi;
var csSiteBase_2 = '"~/site/assets/';

gulp.task('default', ['tidy'], function () {
	console.log('Done');
});

gulp.task('tidy', ['generateCSHTML'], function () {
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
	var csScriptStart = '@Scripts.Render("~';
	var csScriptEnd = '.js")';

	return gulp.src([app.cshtmlDir + '/' + app.headFile])
		.pipe(replace(reStyleStart, csStyleStart))
		.pipe(replace(reStyleEnd, csStyleEnd))
		.pipe(replace(reScriptStart, csScriptStart))
		.pipe(replace(reScriptEnd, csScriptEnd))
		.pipe(gulp.dest(app.cshtmlDir));
});

gulp.task('generateCSHTML', ['rebaseDist'], function () {
	return gulp.src(app.tempDir + '/' + app.indexFile)
		.pipe(htmlsplit())
		.pipe(gulp.dest(app.cshtmlDir));
});



gulp.task('rebaseDist', ['rebaseCSS'], function () {

	var src = [
		app.pubDir + '/assets/dist/**/*.*',
    ];

	return gulp.src(src)
		.pipe(replace(reSiteBase_1, csSiteBase_1))
		.pipe(replace(reSiteBase_2, csSiteBase_2))
		.pipe(gulp.dest(app.pubDir + '/assets/dist'));
});

gulp.task('rebaseCSS', ['rebaseJS'], function () {

	var src = [
		app.pubDir + '/assets/css/*.css'
    ];

	return gulp.src(src)
		.pipe(replace(reSiteBase_1, csSiteBase_1))
		.pipe(replace(reSiteBase_2, csSiteBase_2))
		.pipe(gulp.dest(app.pubDir + '/assets/css'));
});


gulp.task('rebaseJS', ['rebase'], function () {

	var src = [
		app.pubDir + '/assets/js/*.js'
    ];

	return gulp.src(src)
		.pipe(replace(reSiteBase_1, csSiteBase_1))
		.pipe(replace(reSiteBase_2, csSiteBase_2))
		.pipe(gulp.dest(app.pubDir + '/assets/js'));
});


gulp.task('rebase', ['copyAssets'], function () {

	var src = [
        app.indexFile,

    ];

	return gulp.src(src)
		.pipe(replace(reSiteBase_1, csSiteBase_1))
		.pipe(replace(reSiteBase_2, csSiteBase_2))
		.pipe(gulp.dest(app.tempDir));
});


gulp.task('copyAssets', ['clean'], function () {
	var src = [
        app.assetDir + '/**/*.*'
    ];
	return gulp.src(src)
		.pipe(gulp.dest(app.pubDir + /assets/));
});

gulp.task('clean', function () {
	return gulp.src(app.pubDir + '/**/*.*')
		.pipe(clean());
});
