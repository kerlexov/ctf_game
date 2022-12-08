const withPlugins = require("next-compose-plugins");
const withAntdLess = require("next-plugin-antd-less");
const { i18n } = require("./next-i18next.config");

const pluginAntdLess = withAntdLess({
  lessVarsFilePath: "./src/styles/variables.less",
});

module.exports = withPlugins([[pluginAntdLess]], {
  i18n,
  distDir: 'build',
  experimental: {
    newNextLinkBehavior: true,
  },
  webpack5: true,
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
    };

    return config;
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "kbc-vault.cloud.karber.hr,ctf-game.vercel.app" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }

});
