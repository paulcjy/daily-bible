import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/daily-bible'
    // output: 'export'
};

export default withContentlayer(nextConfig)