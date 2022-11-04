#!/bin/bash

docker build . -t cinemo-frontend
docker stop cinemo-frontend; docker rm cinemo-frontend;
docker run -d -it --name cinemo-frontend -p 127.0.0.1:9000:3000/tcp --restart always --env-file ../.env-cinemo-frontend cinemo-frontend
