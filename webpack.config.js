const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './public/assets/js/index.js', // Just import all other modules from here
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/assets/dist'),
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  mode: 'development', // or 'production'
};
