# github-actions-env-toolkit
Scienta's Github Actions env variables toolkit

# Build
Start the docker container and login:
```
docker-compose  up -d --force-recreate --remove-orphans
docker exec -ti github-actions-env-toolkit-builder bash
```

Install dependencies
```
npm install --dev
```
