import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `
    @use "@/styles/color.scss" as *;
    @use "@/styles/font.scss" as *;
  `,
  },
};

export default nextConfig;
