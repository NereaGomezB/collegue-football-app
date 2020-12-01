module.exports = {
    module: {
      rules: [
        {
            test: /\.scss$/,
            use: [
              isDevelopment ? "vue-style-loader" : MiniCssExtractPlugin.loader,
              "css-loader", "sass-loader"]
          },
      ],
    },
  };