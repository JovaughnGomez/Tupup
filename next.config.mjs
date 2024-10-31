/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: false,
    webpack: (config, { isServer }) => {
        if (isServer) {
          // Exclude Ulixee Hero from the client-side bundle
          config.externals = config.externals || [];
          config.externals.push('@ulixee/hero');
          config.externals.push("@ulixee/hero-playground");
        }

        return config;
    }
};

export default nextConfig;
