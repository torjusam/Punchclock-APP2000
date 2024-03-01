// Config file for Next.js. Webpack function allows you to add custom webpack configuration, in this case rule for .svg files.
module.exports = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
  };