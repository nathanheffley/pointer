'use strict'
require('dotenv').config()

module.exports = {
  NODE_ENV: '"production"',
  FRONTEND_HOST: '"https://pointer.nathanheffley.com"',
  API_HOST: '"https://pointer.nathanheffley.com/.netlify/functions"',
  PUSHER_APP_ID: `"${process.env.PUSHER_APP_ID}"`,
  PUSHER_KEY: `"${process.env.PUSHER_KEY}"`,
  PUSHER_SECRET: `"${process.env.PUSHER_SECRET}"`,
  PUSHER_CLUSTER: `"${process.env.PUSHER_CLUSTER}"`
}
