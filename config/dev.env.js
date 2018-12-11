'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FRONTEND_HOST: '"http://localhost:8080"',
  API_HOST: '"http://localhost:9000/.netlify/functions"'
})
