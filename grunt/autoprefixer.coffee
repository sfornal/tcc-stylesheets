module.exports =
    options:
        browsers: [
            'last 4 versions'
            'ie 8'
            'ie 9'
            'android 2.3'
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
