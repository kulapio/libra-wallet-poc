module.exports = {
  env: {
    production: {
      presets: [
        '@vue/app'
      ]
    },
    development: {
      presets: [
        '@vue/app'
      ]
    },
    test: {
      plugins: [
        'transform-es2015-modules-commonjs'
      ]
    }
  }
}
