module.exports = {
    module: {
        rules: [
          ...
          {
            test: /\.(png|jpe?g|gif|jp2|webp)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Important: return the modified config
      return config
    },
  }