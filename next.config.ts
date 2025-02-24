import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/mene",
  assetPrefix: process.env.NODE_ENV === "production" ? "/mene/" : undefined,
};

export default nextConfig;
