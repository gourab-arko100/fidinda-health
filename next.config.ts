import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The FAQ now lives on the home page; send old /faq links there.
  async redirects() {
    return [{ source: "/faq", destination: "/#faq", permanent: true }];
  },
};

export default nextConfig;
