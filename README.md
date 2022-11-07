# Instructions:

## Setting Variables:
Copy the [.env-sample](.env-sample) file to [.env](.env) and set the required variables.

## Generate Ring Refresh Token:
```bash
docker run --rm -it node:alpine sh -c "npx -y -p ring-client-api ring-auth-cli"
```

## List Available Commands:
```bash
docker-compose run --rm ring_api
```

## Example Command:
```bash
docker-compose run --rm ring_api getLocations
```
