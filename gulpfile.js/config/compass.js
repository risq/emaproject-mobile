var config = require('./');

module.exports = {
    autoprefixer: { browsers: ['last 2 version'] },
    src: config.sourceAssets + '/stylesheets/**/*.{sass,scss}',
    dest: config.publicAssets + '/stylesheets',
    settings: {
        css: config.publicAssets + '/stylesheets',
        sass: config.sourceAssets + '/stylesheets',
        image: config.publicAssets + '/images'
    }
};