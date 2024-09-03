import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/daily-bible',
  // output: 'export'
  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    DATABASE_URL: process.env.DATABASE_URL,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  },
}

export default withContentlayer(nextConfig)
