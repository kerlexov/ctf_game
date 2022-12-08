1. Install vault

After installing you should be provided with root token and unseal token.

Login into http://localhost:8200 Vault UI
#r s.RjSZTtiOZRn1VnvceEd3Ufse
#k1 tLGTR+UWOH4xH29K3hQdXjiwBAE/bfHv4zpOx+QaD3/c
#k2 9NEOOnV+0UCBErWi/ftaFaJRM3b8l+gmnsRVIqolNOR7
#k3 Tbk+C/npngDcrgZc5D/Zm6jhPcHk9UO4r1SHYGfUN1/5
2. Configure AppRole Auth Method
- Through UI (Access -> Auth methods -> Enable new method -> approle)
- Through CLI ($vault auth enable approle)

3. Create Policy for Secret Access

- Through UI (Policies -> Create ACL Policy)
name: rc-kv-ctf
path "secret/data/ctf/app" {
capabilities = ["create", "read" ]
}

4. Create AppRole for Node.js Application

docker exec -it vault /bin/sh

export VAULT_ADDR=http://localhost:8200
export VAULT_TOKEN=<ROOT TOKEN>

vault write auth/approle/role/ctf-app-role \
token_ttl=1h \
token_max_ttl=4h \
token_policies=rc-kv-ctf

Get role-id and secret-id

role_id    47403516-81b1-72ab-2d9c-338104463d2b
vault read auth/approle/role/ctf-app-role/role-id

secret_id             891b8f30-ee1a-2a45-df7e-d771b4e82f80
vault write -f auth/approle/role/ctf-app-role/secret-id



vault kv put secret/ctf/app db_name="users" username="admin" password="passw0rd"
