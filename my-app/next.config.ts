import { Configuration } from 'webpack';

const nextConfig = {
    reactStrictMode: true,
    webpack: (config: Configuration) => {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
            topLevelAwait: true,
        };
        return config;
    },
};

export default nextConfig;
