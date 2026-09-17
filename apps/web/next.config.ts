import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["gamepack-schema"],
  outputFileTracingRoot: join(__dirname, "../.."),
};

export default nextConfig;
