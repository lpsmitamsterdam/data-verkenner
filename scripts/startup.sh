#!/bin/sh
basePath=/usr/share/nginx/html
fileName=${basePath}/index.html
envsubst < ${fileName} > ${basePath}/index.env.html
rm ${fileName}
mv ${basePath}/index.env.html ${fileName}
nginx -g 'daemon off;'
