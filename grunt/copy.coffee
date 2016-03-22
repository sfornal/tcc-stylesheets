module.exports =
    publish:
        expand: true
        cwd: 'dist'
        src: '**.{css,map}'
        dest: 'server/'
