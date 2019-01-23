# TCC Stylesheets

The TCC web site’s official stylesheets are built using the [SASS](http://sass-lang.com) preprocessor, and vendor prefixes for the CSS are generated automatically using the [Autoprefixer](https://github.com/postcss/autoprefixer) tool after SASS compilation.

## Coding Conventions

Code developed here will eventually be incorporated into all TCC web projects, so good formatting and comments definitely apply.

Use `/* */` comments in SCSS files to have the comment persist into the generated CSS files. Use `//` comments to have them removed. Prefer `//` style comments when possible.

Please use 4-space indentation, as specified in the included [EditorConfig]() file.

## Build System

This build system uses [Node](https://www.nodejs.org) and [Gulp](http://gulpjs.com) to accomplish common development tasks. Be sure to have Node installed on your system, and install the Gulp command line tools with `npm install -g gulp-cli` if you haven't before.

To get started, clone this project using:
`git clone https://trtc1143.all.disttccd.net:8443/scm/tccwwwsit/tcc-stylesheets.git`

Switch to the project directory, and install tools by running:
`npm install`

Use `gulp` from the command line to make a distribution build.

## Linting Your SASS

Preferably, before running a distribution build, you should [run the code linters](http://stackoverflow.com/questions/8503559/what-is-linting) using the `gulp lint` command. Read the output and make any recommended changes, then run the lint command again until you get a clean result. Once you have clean code, then feel free to make a new distribution build.

The SCSS code linting relies on the [scss-lint Ruby gem](https://github.com/brigade/scss-lint), so you will only be able to lint if you have [Ruby](https://www.ruby-lang.org/en/) configured in your development environment, and you have installed the gem using `gem install scss_lint`.

## Distribution Builds

The distribution build output *is not* part of the repository.

After updating the SCSS, you can use the commands `gulp publish:patch`, `gulp publish:minor`, or `gulp publish:major` to update the version number of this repository and generate a git commit, tag, and upstream push automagically. You would, of course, need git configured on your machine, but I'm assuming that's the case if you're working with this.

The SCSS code will be linted (see above) before publish, and lint errors will block the publish task from completing. If you *cannot* run the Ruby linter for some reason, and you're *sure* you should be publishing, you can probably use the `--force` flag on the command line when you run the publish task.
