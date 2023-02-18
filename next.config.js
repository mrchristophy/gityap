/** @type {import('next').NextConfig} */
const path = require('path');

console.log(path.join(__dirname, 'src', 'styles'));

const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
};

module.exports = nextConfig;
