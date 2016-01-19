module.exports =
    options:
        sourceMap: true
        outputStyle: 'expanded'
        trace: true
        lineNumbers: true
        debugInfo: true
    default:
        files: [{
            expand: true
            cwd: 'src/'
            src: '**/*.{scss,sass}'
            dest: 'tmp/'
            ext: '.css'
        }]
