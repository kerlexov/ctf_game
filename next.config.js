// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPlugins = require("next-compose-plugins");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withAntdLess = require("next-plugin-antd-less");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {i18n} = require("./next-i18next.config");

const pluginAntdLess = withAntdLess({
    lessVarsFilePath: "./src/styles/variables.less",
});

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src ctf-game.vercel.app;
  style-src 'self' ctf-game.vercel.app;
  font-src 'self';  
`

const securityHeaders = [
    {key: "Access-Control-Allow-Credentials", value: "true"},
    {key: "Access-Control-Allow-Origin", value: "ctf-game.vercel.app"},
    {key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT,LIST"},
    {
        key: "Access-Control-Allow-Headers",
        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    },
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    },
    {
        key: 'Referrer-Policy',
        value: 'strict-origin'
    },
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
    }
]


module.exports = withPlugins([[pluginAntdLess]], {
    i18n,
    distDir: 'build',
    //output: 'standalone',
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    experimental: {
        newNextLinkBehavior: true,
    },
    webpack5: true,
    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.resolve = {
                ...config.resolve,
                fallback: {
                    ...config.resolve.fallback,
                    fs: false,
                },
            };
        }
        config.module = {
            ...config.module,
            exprContextCritical: false,
        };
        return config;
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: securityHeaders
            }
        ]
    }

});
