module.exports =
    options:
        sourceMap: true
        mediaMerging: false
    default:
        files: [{
            expand: true
            cwd: 'dist/'
            src: [
                '**/*.css'
                '!**/*.min.css'
            ]
            dest: 'dist/'
            ext: '.min.css'
        }]
