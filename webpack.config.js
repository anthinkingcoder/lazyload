module.exports = function (env = {}) {
    const path = require('path'),
        fs = require('fs'),
        UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
        packageConf = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

    let name = packageConf.name,
        version = packageConf.version,
        library = name.replace(/^(\w)/, m => m.toUpperCase()),
        proxyPort = 8081,
        plugins = [];

    function resolve(dir) {
        return path.join(__dirname, dir)
    }

    if (env.production) {
        name += `-${version}.min`;
        plugins.push(
            new UglifyJSPlugin({
                sourceMap: true
            })
        );
    }
    return {
        resolve: {
            modules: [
                path.join(__dirname, 'src'),
                'node_modules'
            ]
        },
        entry: './src/index.js',
        output: {
            filename: `${name}.js`,
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/static/js',
            library: `${library}`,
            libraryTarget: 'umd'
        },

        plugins: plugins,

        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            ]
        },

        devServer: {
            inline: false,
            proxy: {
                "*": `http://127.0.0.1:${proxyPort}`,
            }
        }
    };
};