module.exports = {
    webpack: (config) => {
      config.devtool = false; // Disable source maps
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve('stream-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer/')
      };
      return config;
    }
  };