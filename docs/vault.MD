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
  path "secret/data/ctf/app/*" {
  capabilities = ["create", "read" ]
  }

4. Create AppRole for Node.js Application

docker exec -it vault /bin/sh
export VAULT_ADDR=https://vault.cloud.artynex.com:8200
export VAULT_ADDR=http://localhost:8200
export VAULT_TOKEN=<ROOT TOKEN>
export VAULT_TOKEN=s.RfsylY6bJKtOMEQadvPAWTUp
vault write auth/approle/role/ctf-app-role \
token_ttl=24h \
token_max_ttl=24h \
token_policies=rc-kv-ctf

Get role-id and secret-id

73ef6deb-859b-1d6d-828f-5e87b546613d
vault read auth/approle/role/ctf-app-role/role-id

vault write -f auth/approle/role/ctf-app-role/secret-id
6f549079-6519-8f25-fc0f-4692ac1ad1a7


vault kv put secret/ctf/app db_name="users" username="admin" password="passw0rd"



curl 'http://localhost:3000/api/vault' \
-H 'Accept: */*' \
-H 'Accept-Language: en-GB,en' \
-H 'Connection: keep-alive' \
-H 'Content-Type: application/json' \
-H 'Cookie: cookey=%7B%22jwt%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2Mzk0NmE3NDIxZWUxMjA0ZjZhOCIsInNlc3Npb25JZCI6IjYzOTQ4NDZhMjgwNjZlMjZjZmVlIiwiZXhwIjoxNjcwNjc4NTEwfQ.D17inexLqgrk1cI_GW0oDA01lvqD3Jms7rbKDW1CpaM%22%7D' \
-H 'Origin: http://localhost:3000' \
-H 'Referer: http://localhost:3000/challenge/create' \
-H 'Sec-Fetch-Dest: empty' \
-H 'Sec-Fetch-Mode: cors' \
-H 'Sec-Fetch-Site: same-origin' \
-H 'Sec-GPC: 1' \
-H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36' \
--data-raw '{"name":"yg8iyg","author":"63946a7421ee1204f6a8","encFlag":"U2FsdGVkX180tEsn+prvymZhfXyg/obEasuTekKv3wg="}' \
--compressed
