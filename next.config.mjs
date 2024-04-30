import withMDX from "@next/mdx";

const nextConfig = {
  eslint: {
    dirs: ['pages', 'utils'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "***",
      },
    ],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})(nextConfig);
