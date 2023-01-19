import pbkdf2 from "crypto-js/pbkdf2";
import {AES, enc, SHA256} from "crypto-js";

export const sec = "0ti249gu9342g2o3g2";

export function hashData(data: string) {
    return SHA256(data).toString();
}

export function mask(name: string, identity: string) {
    return hashData(`${name}_${sec}_${identity}`)
}

export function generateVaultKey({name, hashedData, salt}: {
    name: string;
    hashedData: string;
    salt: string;
}) {
    return pbkdf2(`${name}:${hashedData}`, salt, {
        keySize: 32,
    }).toString();
}

export function decryptVault({vaultKey, vault}: {
    vaultKey: string;
    vault: string;
}) {
    const bytes = AES.decrypt(vault, vaultKey);
    const decrypted = bytes.toString(enc.Utf8);

    try {
        return JSON.parse(decrypted).vault;
    } catch (e) {
        return vault;
    }
}

export function encryptVault({vaultKey, vault}: {
    vaultKey: string;
    vault: string;
}) {
    return AES.encrypt(JSON.stringify(vault), vaultKey).toString();
}
