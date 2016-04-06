module.exports =
    options:
        browsers: [
            'last 4 versions'
            'ie 10'
        ]
        map: true
        cascade: true
    default:
        files: [{
            expand: true
            cwd: 'tmp/'
            src: '**/*.css'
            dest: 'dist/'
        }]
