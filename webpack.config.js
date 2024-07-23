const { join, resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
const notifier = require("node-notifier");
const Dotenv = require("dotenv-webpack");

const port = 3000;
module.exports = {
  entry: {
    main: resolve("src/index.tsx"),
  },
  output: {
    path: resolve(__dirname, "dist"),
    // publicPath: '/',
    filename: "scripts/[name].[contenthash:5].bundule.js",
  },
  stats: "errors-only",
  devServer: {
    // 支持history路由
    historyApiFallback: true,
    static: {
      directory: join(__dirname, "/dist"),
    },
    hot: true,
    port,
    proxy: [
      {
        context: ["/webapi"],
        target: "http://47.100.16.3:8090", // 你的后端服务器地址
        changeOrigin: true,
        pathRewrite: { "^/webapi": "" },
        secure: false,
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.css$/i,
        include: [resolve(__dirname, "src"), resolve(__dirname, "node_modules")],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|png|jpg|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "WYC Web3 Wallet",
      filename: "index.html",
      favicon: "./public/dollar.ico",
      template: resolve(__dirname, "public/index-dev.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash:5].css",
      chunkFilename: "styles/[name].[contenthash:5].css",
      ignoreOrder: false,
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["You application is running here http://localhost:" + port],
        notes: ["💊 构建信息请及时关注窗口右上角"],
      },
      onErrors: function (severity, errors) {
        if (severity !== "error") {
          return;
        }
        const error = errors[0];
        console.log("🟥", error);
        notifier.notify({
          title: "👒 Webpack Build Error",
          message: severity + ": " + error.name,
          subtitle: error.file || "",
          icon: join(__dirname, "icon.png"),
        });
      },
      clearConsole: true,
    }),
    new Dotenv(),
  ],
  resolve: {
    alias: {
      "@components": resolve("src/components"),
      "@hooks": resolve("src/hooks"),
      "@pages": resolve("src/pages"),
      "@layouts": resolve("src/layouts"),
      "@assets": resolve("src/assets"),
      "@states": resolve("src/states"),
      "@service": resolve("src/service"),
      "@utils": resolve("src/utils"),
      "@lib": resolve("src/lib"),
      "@constants": resolve("src/constants"),
      "@connectors": resolve("src/connectors"),
      "@abis": resolve("src/abis"),
      "@types": resolve("src/types"),
    },
    extensions: [".js", ".ts", ".tsx", ".jsx", ".css"],
  },
};
