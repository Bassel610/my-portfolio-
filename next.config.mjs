/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for static export and Netlify
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Disable server-side features for static export
};

export default nextConfig;
