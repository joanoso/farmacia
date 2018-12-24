var packageJSON = require('./package.json');
var path = require('path');

const PATHS = {
  build: path.join(__dirname, 'target', 'classes', 'META-INF', 'resources', 'webjars', packageJSON.name, packageJSON.version)
};

module.exports = {
  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',
  mode: 'development',
  entry: './app/index.tsx',

  output: {
    path: PATHS.build,
    publicPath: '/assets/',
    filename: 'app-bundle.js'
  },
  resolve: {
    modules: [
      path.join(__dirname, "app"),
      "node_modules"
    ],
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.ts(x?)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: './tslint.json'
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      }, {
        test: /\.scss$/,
        use: [

          {
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        },

          {
          loader: "sass-loader", // compiles Sass to CSS
          options: {
            includePaths: ['./node_modules']
          }
        }]
      }, {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'raw-loader'
      },

      {
        test: /\.(eot|woff|woff2|ttf|svg|gif|jpe?g|png|ico)(\?\S*)?$/,
        use: [
          {
            loader: "url-loader",
                options: {
                  limit: 1000000000,
                  name: '[name].[ext]'
                }
          }
        ]
      }
      //   test: /\.(eot|woff|woff2|ttf|svg|gif|jpe?g|png|ico)(\?\S*)?$/,
      //   use: [{
      //     loader: "url-loader",
      //     options: {
      //       limit: 100000,
      //       name: '[name].[ext]'
      //     }
      //   }]
      // }
    ]
  },
  devServer: {
    compress: true,
    port: 9000,
    historyApiFallback: true,
    historyApiFallback: {
      index: './tmp/index.html',
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:8080',
        secure: false
      },
       '/auth': {
              target: 'http://localhost:8080',
              secure: false
      }
    }
  }
};