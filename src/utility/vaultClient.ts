var options = {
    apiVersion: 'v1', // default
    endpoint: 'https://kbc-vault.cloud.karber.hr:8200', // default
};

let vaultClient = require("node-vault")(options);
vaultClient.approleLogin({
    role_id: "47403516-81b1-72ab-2d9c-338104463d2b",
    secret_id: "891b8f30-ee1a-2a45-df7e-d771b4e82f80",
}).then((result:any)=>{
    vaultClient.token = result.auth.client_token;
});

export default vaultClient;
