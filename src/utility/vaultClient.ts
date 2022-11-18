import vault from "vault-api";
import axios from "axios";
import {Config} from "vault-api/dist/types";
import * as fs from "fs";
import {getEngineName} from "vault-api/dist/core/mounts";

    const vaultClient = vault.create!(
        {
            axios,
            address: async () => process.env.VAULT_ADDR,
            tokenPath: `${process.env.HOME}/.vault-token`,
            apiVersion: 'v1',
            async token(config: Config): Promise<string | undefined> {
                return (config.tokenPath)
                    ? fs.readFileSync(config.tokenPath, 'utf8')
                    : process.env.VAULT_TOKEN;
            },
            engine: getEngineName,
            headers: {},

            isVaultRequest: true,
        }
    );

export { vaultClient };
