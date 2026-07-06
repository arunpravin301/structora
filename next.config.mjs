/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // WordPress media (update to the real CMS domain)
      { protocol: "https", hostname: "cms.structoraindia.com" },
      { protocol: "https", hostname: "**.wp.com" }
    ]
  }
};
export default nextConfig;
