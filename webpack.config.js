const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: "./lib/main.js",
  target: 'electron-preload',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            retainLines: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    electron: process.versions.electron || process.env.ELECTRON_VERSION || "12",
                  },
                  modules: "commonjs",
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              "babel-plugin-add-module-exports",
            ],
            sourceType: "unambiguous",
          },
        },
      },
      {
        test: /\.coffee$/,
        loader: "coffee-loader",
      },
    ],
  },
  externals: ["atom", nodeExternals()],
  externalsPresets: {
    node: true,
    electron: true,
    electronPreload: true,
    electronRenderer: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.coffee'],
  },
};
