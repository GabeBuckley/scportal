const gulp = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const extract_text = require('gulp-extract-text');

var app = {
	cshtmlDir: './cshtml',
	cshtmlFiles: [
		{
			filename: '_head.cshtml',
			startTag: '<!-- START HEAD BLOCK -->',
			endTag: '<!-- END HEAD BLOCK -->'
		},
		{
			filename: '_pageHead.cshtml',
			startTag: '<!-- START PAGE_HEADER BLOCK -->',
			endTag: '<!-- END PAGE_HEADER BLOCK -->'
		},
		{
			filename: '_pageHead.cshtml',
			startTag: '<!-- START PAGE_HEADER BLOCK -->',
			endTag: '<!-- END PAGE_HEADER BLOCK -->'
		},
		{
			filename: '_pageMainTop.cshtml',
			startTag: '<!-- START PAGE_MAIN_TOP BLOCK -->',
			endTag: '<!-- END PAGE_MAIN_TOP BLOCK -->'
		},
		{
			filename: '_pages.cshtml',
			startTag: '<!-- START PAGES BLOCK -->',
			endTag: '<!-- END PAGES BLOCK -->'
		},
		{
			filename: '_pages.cshtml',
			startTag: '<!-- START PAGES BLOCK -->',
			endTag: '<!-- END PAGES BLOCK -->'
		},
		{
			filename: '_pageMainBot.cshtml',
			startTag: '<!-- START PAGE_MAIN_BOT BLOCK -->',
			endTag: '<!-- END PAGE_MAIN_BOT BLOCK -->'
		},
		{
			filename: '_pageDlg.cshtml',
			startTag: '<!-- START PAGE_DLG BLOCK -->',
			endTag: '<!-- END PAGE_DLG BLOCK -->'
		}
	]
	]
}



let extract_text_params = {
	pattern_start: "<head>",
	pattern_end: "</head>"
}

gulp.task('generateCSHTML', function () {
	for (let i = 0; i < app.cshtmlFiles.length; i++) {
		var _file = app.cshtmlFiles[i];
		var _param = {
			pattern_start: _file.startTag,
			pattern_end: _file.endTag
		}

	}
	gulp.src(['index.html'])
		.pipe(extract_text(_param))
		.pipe(gulp.dest(app.cshtmlDir + '/' + _file.filename));
});


gulp.task('clean', function () {
	return gulp.src(app.cshtmlDir)
		.pipe(clean());
});


gulp.task('default', ['clean'], function () {
	gulp.start(['generateCSHTML']);
});
