var path = require('path');

module.exports = {
  mode: "development",
  entry:{
    customer_app: path.join(__dirname, "public/src/customer/index.jsx"),
    operator_app: path.join(__dirname, "public/src/operator/index.jsx"),
    manager_app: path.join(__dirname, "public/src/manager/index.jsx")
  },
  output: {
    path: path.resolve(__dirname, "./public/dist"),
    filename: ({chunk}) => {
      if(chunk.name === 'customer_app') {
        return 'customer/[name].bundle.js';
      }
      if(chunk.name === 'operator_app') {
        return 'operator/[name].bundle.js';
      }
      if(chunk.name === 'manager_app') {
        return 'manager/[name].bundle.js';
      }
      return '[name].bundle.js';
    }
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use:{
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader"}
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      }
    ]
  }
}