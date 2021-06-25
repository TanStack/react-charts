const path = require("path");
const resolveFrom = require("resolve-from");
const Module = require("module");

const node_modules = path.resolve(__dirname, "node_modules");

const originalRequire = Module.prototype.require;

const withTM = require("next-transpile-modules")(["robust-predicates"]);

// The following ensures that there is always only a single (and same)
// copy of React in an app at any given moment.
Module.prototype.require = function (modulePath) {
  // Only redirect resolutions to non-relative and non-absolute modules
  if (
    [
      "/react/",
      "/react-dom/",
      "/react-query/",
      "/react-charts/",
      "/react-table/",
    ].some((d) => {
      try {
        return require.resolve(modulePath).includes(d);
      } catch (err) {
        return false;
      }
    })
  ) {
    try {
      modulePath = resolveFrom(node_modules, modulePath);
    } catch (err) {
      //
    }
  }

  return originalRequire.call(this, modulePath);
};

const baseConfig = {
  typescript: {
    // TODO: Remove this someday!
    ignoreBuildErrors: true,
  },
  // webpack5: true,
  webpack(config, { isServer }) {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      // config.node = { fs: 'empty', module: 'empty' }
    }

    config.resolve = {
      ...config.resolve,
      fallback: !isServer
        ? { ...(config.resolve.fallback || {}), fs: false }
        : config.resolve.fallback || {},
      modules: [...config.resolve.modules, path.resolve("./")],
      alias: {
        ...config.resolve.alias,
        react$: resolveFrom(path.resolve("node_modules"), "react"),
        "react-dom$": resolveFrom(path.resolve("node_modules"), "react-dom"),
        "react-charts$": resolveFrom(
          path.resolve("node_modules"),
          "react-charts"
        ),
      },
    };
    return config;
  },
};

module.exports = [withTM].reduce((a, b) => b(a), baseConfig);
