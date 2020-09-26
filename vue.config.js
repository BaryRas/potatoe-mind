const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = {
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
  },

  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'en',
      localeDir: 'lang',
      enableInSFC: false
    }
  }
};
