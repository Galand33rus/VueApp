module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/VueApp/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
