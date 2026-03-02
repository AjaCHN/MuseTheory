// next.config.mjs v0.0.2
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
};

export default nextConfig;
