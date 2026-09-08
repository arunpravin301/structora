/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // WordPress media (update to the real CMS domain)
      { protocol: "https", hostname: "cms.structoraindia.com" },
      { protocol: "https", hostname: "**.wp.com" }
    ]
  }
};
export default nextConfig;
