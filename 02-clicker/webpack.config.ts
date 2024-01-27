import path from "path"
import webpack from "webpack"
import HtmlPlugin from "html-webpack-plugin"
import type { Configuration as DevServerConfig } from "webpack-dev-server"

type Mode = "production" | "development"

interface IEnvVariables {
  mode: Mode
  port: number
}

export default (env: IEnvVariables) => {
  const isDev = env.mode === "development"

  const config: webpack.Configuration = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    mode: env.mode ?? "development",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.[contenthash:8].js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new HtmlPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
    ],
    devServer: isDev
      ? {
          port: env.port ?? 3000,
          open: true,
        }
      : undefined,
    devtool: isDev && "inline-source-map",
  }
  return config
}
