import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
  turbopack: {
    // Example: adding an alias and custom file extension
    resolveAlias: {
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
   webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
};

export default nextConfig;
