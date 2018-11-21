'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FRONTEND_HOST: '"http://localhost:8080"',
  API_HOST: '"http://localhost:9090"',
  PUSHER_KEY: '"0d1c2b4601cad71304b9"',
  PUSHER_CLUSTER: '"us2"'
})
