var options = {
    apiVersion: 'v1', // default
    endpoint: 'https://kbc-vault.cloud.karber.hr:8200', // default
};

// get new instance of the client
const vaultClient = require("node-vault")(options);
//       "Command": "server -config=/vault/config/vault-config.json"

export default vaultClient;
