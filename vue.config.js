module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/Tiffy'
  //   : '/',
  "transpileDependencies": [
    "vuetify"
  ],
  pwa:{
    workboxPluginMode: "GenerateSW",
    workboxOptions:{
      navigateFallback:"/index.html",
      runtimeCaching:[
        {
          urlPattern:new RegExp('^https://fonts.googleapis.com/'),
          handler:"networkFirst",
          options:{
            networkTimeoutSeconds:20,
            cacheName:'api-font-goog',
            cacheableResponse:{
              statuses:[0,200]
            }
          }
        },
        {
          urlPattern:new RegExp('^https://firebasestorage.googleapis.com/'),
          handler:"networkFirst",
          options:{
            networkTimeoutSeconds:20,
            cacheName:'api-img-goog',
            cacheableResponse:{
              statuses:[0,200]
            }
          }
        }
      ]
    }

  }
}