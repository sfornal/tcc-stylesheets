module.exports =
    'default': [ 'compile' ]

    'compile':
        description: 'Compile SCSS, post-process with autoprefixer, then
            produce a minified version with cssmin'
        tasks: [
            'clean'
            'sass'
            'autoprefixer'
            'cssmin'
        ]

    'lint':
        description: 'Runs the scss-lint Ruby gem to lint your SASS, and
            runs the CoffeeLint on the build tasks, too'
        tasks: [
            'coffeelint'
            'scsslint'
        ]
    'publish:patch': ['lint', 'compile', 'bump:patch']
    'publish:minor': ['lint', 'compile', 'bump:minor']
    'publish:major': ['lint', 'compile', 'bump:major']

    'test':
        description: 'Copy the current dist files to the redesign production
            server directly'
        tasks: [
            'copy:publish'
        ]
