/* jshint esversion: 6, node: true */

const del = require('del');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const bump = require('gulp-bump');
const min = require('gulp-clean-css');
const git = require('gulp-git');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const lint = require('gulp-scss-lint');
const sourcemap = require('gulp-sourcemaps');
const pubtype = require('minimist')(process.argv, {default:{ pubtype: "patch" }})['pubtype'];
const fs = require('fs');

gulp.task('clean', (done) => {
    del(['dist/**/*', 'tmp/**/*'])
        .then((paths) => {
            console.log(`Deleted ${paths.length} file(s): ${paths.join(', ')}`);
            done();
        })
        .catch((err) => {
            console.log('Error cleaning: ' + err.toString());
            done();
        });
});

gulp.task('lint', () => {
    return gulp.src('src/**/*.scss')
        .pipe(lint({
            config: '.scss-lint.yml',
            filePipeOutput: 'scss-lint-report.json'
        }))
        .pipe(gulp.dest('test-results'));
});

gulp.task('compile', () => {
    return gulp.src('src/**/*.scss')
        .pipe(sourcemap.init())
        .pipe(sass())
            .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'ie 11']
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(min())
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('bump-version', () => {

    return gulp.src(['./package.json'])
        .pipe(bump({type: pubtype})
            .on('error', (error) => { console.log(`Error bumping version: ${error.toString()}`)}))
        .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', () => {
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('push-changes', (done) => {
    git.push('origin', 'master', done);
});

gulp.task('create-new-tag', (done) => {
    var version = getPackageJsonVersion();
    git.tag(version, 'Created Tag for version: ' + version, function (error) {
        if (error) {
            return done(error);
        }

        git.push('origin', 'master', {args: '--tags'}, done);
    });

    function getPackageJsonVersion () {
        // We parse the json file instead of using require because require caches
        // multiple calls so the version number won't be updated
        return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    }
});

gulp.task('publish', gulp.series(
    'clean',
    'compile',
    'bump-version',
    'commit-changes',
    'push-changes',
    'create-new-tag'
));
