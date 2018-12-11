'use strict'
require('dotenv').config()

module.exports = {
  NODE_ENV: '"production"',
  FRONTEND_HOST: '"https://pointer.nathanheffley.com"',
  API_HOST: '"https://api.pointer.nathanheffley.com"',
  PUSHER_KEY: `"${process.env.PUSHER_KEY}"`,
  PUSHER_CLUSTER: `"${process.env.PUSHER_CLUSTER}"`
}
