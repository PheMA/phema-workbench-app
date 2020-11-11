#!/bin/bash

# Log in
echo "$DOCKERHUB_API_KEY" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

set -o xtrace

# Push the image
docker push phema/phema-workbench-app:$TRAVIS_TAG

# Update latest
docker tag phema/phema-workbench-app:$TRAVIS_TAG phema/phema-workbench-app:latest
docker push phema/phema-workbench-app:latest

# Notify to slack
SLACK_MESSAGE="New PhEMA Workbench App <https://hub.docker.com/r/phema/phema-workbench-app|Docker image> published ($TRAVIS_TAG)"
curl -X POST --data-urlencode 'payload={"text": "'"$SLACK_MESSAGE"'"}' $SLACK_WEBHOOK_URL

# Update Mibrobadger
curl -X POST "$MICROBADGER_WEBHOOK_URL"