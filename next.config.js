const withPlugins = require("next-compose-plugins");
const withAntdLess = require("next-plugin-antd-less");
const { i18n } = require("./next-i18next.config");

const pluginAntdLess = withAntdLess({
  lessVarsFilePath: "./src/styles/variables.less",
});

module.exports = withPlugins([[pluginAntdLess]], {
  reactStrictMode: false,
  swcMinify: true,
  i18n,
});
