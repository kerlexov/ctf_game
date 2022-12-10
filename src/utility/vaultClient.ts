import vault from 'vault-api';
import axios from 'axios';
import {getEngineName} from "vault-api/dist/core/mounts";

// var options = {
//     apiVersion: 'v1', // default
//     endpoint: 'https://kbc-vault.cloud.karber.hr:8200'
// };
// let toc = "";
// let vc = require("node-vault")(options);
// vc.approleLogin({
//     role_id: "47403516-81b1-72ab-2d9c-338104463d2b",
//     secret_id: "891b8f30-ee1a-2a45-df7e-d771b4e82f80",
// }).then((result:any)=>{
//     toc = result.auth.client_token;
// });

//
// var data = JSON.stringify({
//     "role_id": "47403516-81b1-72ab-2d9c-338104463d2b",
//     "secret_id": "891b8f30-ee1a-2a45-df7e-d771b4e82f80"
// });
//
// var config = {
//     method: 'post',
//     url: 'https://kbc-vault.cloud.karber.hr:8200/v1/auth/approle/login',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     data : data
// };
//
//
// let vaultClient = null;
// axios(config)
//     .then(function (response) {
//         const axiosInstance = axios.create();
//         vaultClient = vault.create!({
//             axiosInstance,
//             address: "https://kbc-vault.cloud.karber.hr:8200",
//             apiVersion: 'v1',
//             token: response.data.auth.client_token,
//             engine: getEngineName,
//             headers: {},
//             isVaultRequest: true,
//         });
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

const VaultClient = require('node-vault-client');

const vaultClient = new VaultClient({
    api: { url: 'https://kbc-vault.cloud.karber.hr:8200/' },
    auth: {
        type: 'appRole', // or 'token', 'iam'
        config: { role_id: '47403516-81b1-72ab-2d9c-338104463d2b',
            secret_id: "e0180ad1-8dba-2adf-10be-e3bff50366ec"}
    },
});

export default vaultClient;
