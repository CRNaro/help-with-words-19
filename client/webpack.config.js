const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      sw: './src-sw.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'A simple note taking app',
        background_color: '#ffffff',
        theme_color: '#2196f3',
        start_url: '/',
        publicPath: '/',
        display: 'standalone', //do i need this?
          icons: [
            {
              src: path.resolve('src/images/logo.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('icons'),
            },
          ],
        })
      ],

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',},
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread','@babel/plugin-transform-runtime']
            }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
