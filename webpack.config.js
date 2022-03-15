const path = require("path");

const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "./src");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getSettingsForStyles = (withModules = false) => {
    return [
        isProd ? MiniCssExtractPlugin.loader : "style-loader",
        !withModules
            ? "css-loader"
            : {
                  loader: "css-loader",
                  options: {
                      modules: {
                          localIdentName: !isProd
                              ? "[path][name]__[local]"
                              : "[hash:base64]",
                      },
                  },
              },
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["autoprefixer"],
                },
            },
        },
        "sass-loader",
    ];
};

module.exports = {
    entry: path.join(srcPath, "/index.tsx"),
    target: !isProd ? "web" : "browserslist",
    devtool: isProd ? "hidden-source-map" : "eval-source-map",
    output: {
        path: buildPath,
        filename: "bundle.js",
        publicPath: isProd ? "/kts-front-summer-2021/" : "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, "index.html"),
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        isProd &&
            new MiniCssExtractPlugin({
                filename: "[name]-[hash].css",
            }),
        new TsCheckerPlugin(),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true),
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles(),
            },
            {
                test: /\.[tj]sx?$/,
                use: "babel-loader",
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".module.scss"],
        alias: {
            components: path.join(srcPath, "components"),
            utils: path.join(srcPath, "utils"),
            store: path.join(srcPath, "store"),
            shared: path.join(srcPath, "shared"),
            models: path.join(srcPath, "store/models"),
            styles: path.join(srcPath, "styles"),
            pages: path.join(srcPath, "pages"),
        },
    },
    devServer: {
        host: "127.0.0.1",
        port: 9002,
        hot: true,
        historyApiFallback: true,
    },
};
