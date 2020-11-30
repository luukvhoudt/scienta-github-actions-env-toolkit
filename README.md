# Github Actions Environment variables Toolkit
Scienta's Github Actions `env variables` toolkit

## Exposed environment variables
| Environment Variable   | Description                                                     | Example                   |
|------------------------|-----------------------------------------------------------------|---------------------------|
| `GITHUB_REF_NAME`      | Name of the branch or tag.                                      | `feature-develop/bug-fix` |
| `GITHUB_REF_NAME_SLUG` | Sluggified version of the branch or tag names. Dot is allowed.  | `feature-develop-bug-fix` |
| `GITHUB_SHA_SHORT`     | First eight characters of the full commit sha.                  | `f0425b57`                |

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

# Credits
Based on [FranzDiebold/github-env-vars-action](https://github.com/FranzDiebold/github-env-vars-action).
