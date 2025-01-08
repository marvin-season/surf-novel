```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create surf_novel_network

# Build prod
docker compose -f compose.prod.yaml build

# Up prod in detached mode
docker compose -f compose.prod.yaml up -d
```
