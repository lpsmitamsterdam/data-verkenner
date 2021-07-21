#!/bin/sh

oazapfts https://api.data.amsterdam.nl/v1/explosieven/ ./src/api/explosieven/generated.ts
oazapfts https://api.data.amsterdam.nl/v1/varen/ ./src/api/varen/generated.ts
oazapfts https://api.data.amsterdam.nl/v1/ondergrond/ ./src/api/ondergrond/generated.ts

eslint --fix ./src/api/*/generated.ts
