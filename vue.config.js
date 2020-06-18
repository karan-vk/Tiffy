module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/Tiffy'
  //   : '/',
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      navigateFallback: "/index.html",
      runtimeCaching: [
        {
          urlPattern: new RegExp("^https://fonts.googleapis.com/"),
          handler: "cacheFirst",
          options: {
            cacheName: "api-font-goog",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: new RegExp("^https://cdn.jsdelivr.net/npm/@mdi/"),
          handler: "cacheFirst",
          options: {
            cacheName: "api-icon-mdi",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: new RegExp("^https://firebasestorage.googleapis.com/"),
          handler: "networkFirst",
          options: {
            networkTimeoutSeconds: 20,
            cacheName: "api-img-goog",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  },
};
