const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin') // Ding
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');
const relativePath = "./public";

module.exports = {
  watch: true,

  entry: {
    main: [
      relativePath + '/app/AddNoteJs.js',
      relativePath + '/app/NotesJs.js',
      relativePath + '/app/NoteUtilityJs.js',
      relativePath + '/app/sb-admin-2.js',
      relativePath + '/app/test.js',
      relativePath + '/app/model/noteJsModel.js',
      relativePath + '/app/components/codeMirrorComponent.js',
      // relativePath + '/app/components/selectize.js',
      relativePath + '/app/components/select2.js',
      relativePath + '/app/common/utilityJs.js',
      relativePath + '/app/common/dropdownsJs.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'), 
    filename: "dist/[name].js"
  },
  plugins: [
    new NodemonPlugin(), // Dong
  ],
  devtool: "#inline-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/, // both .js and .jsx
        loader: 'eslint-loader',
        include: path.resolve(process.cwd(), 'src'),
        enforce: 'pre',
        options: {
          fix: true,
        },
      },
      // ...
    ],
  },
};