import * as process from "process";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const VaultClient = require("node-vault-client");
export const vaultClient = new VaultClient({
    api: {url: process.env.VURL},
    auth: {
        type: 'appRole', // or 'token', 'iam'
        config: {role_id: process.env.VRID, secret_id: process.env.VSID}
    },
});

