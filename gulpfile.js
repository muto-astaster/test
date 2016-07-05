var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var concat = require("gulp-concat");
var outputPath = 'foundation'; // 出力ディレクトリ指定

gulp.task('styleguide:generate', function() {
  return gulp.src('foundation/partial/*.scss') // 生成用CSSのパス指定
    .pipe(styleguide.generate({
        title: 'My Styleguide',
        server: true,
        rootPath: outputPath,
        // ローカルで実行する場合はコメントアウト
        // appRoot: '/styleguide/foundation',
        // トップページ用のMarkdownファイル
        overviewPath: 'foundation/overview.md'
      }))
    .pipe(gulp.dest(outputPath));
});
gulp.task('styleguide:applystyles', function() {
  return gulp.src([
      // 外部CSS読み込み
      './node_modules/foundation-sites/dist/foundation.css',
      'foundation/main.scss'
    ])
    .pipe(concat('all.scss'))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('watch', ['styleguide'], function() {
  gulp.watch(
    ['foundation/partial/*.scss','foundation/main.scss'],
    ['styleguide']
  );
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);