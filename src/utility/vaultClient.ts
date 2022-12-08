var options = {
    apiVersion: 'v1', // default
    endpoint: 'https://kbc-vault.cloud.karber.hr:8200', // default
};

const vaultClient = require("node-vault")(options);

export default vaultClient;
