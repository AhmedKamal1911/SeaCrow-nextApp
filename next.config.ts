import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "flagsapi.com",
        pathname: "/**", // Match all paths
      },
      // {
      //   protocol: "https",
      //   hostname: "3d2c-45-99-11-202.ngrok-free.app",
      //   pathname: "/uploads/**",
      // },
    ],
  },
};

export default withNextIntl(nextConfig);
