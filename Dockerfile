FROM node:14-buster AS builder

COPY . /opt/phema/phema-workbench-app/
WORKDIR /opt/phema/phema-workbench-app

# Update default connection for prod
COPY ./packages/connection-manager/src/defaults-prod.ts /opt/phema/phema-workbench-app/packages/connection-manager/src/defaults.ts

RUN yarn install && yarn test && yarn build

FROM nginx:1.19-alpine

ARG VCS_REF

LABEL org.label-schema.vcs-ref=$VCS_REF \
    org.label-schema.vcs-url="https://github.com/phema/phema-workbench-app"

COPY --from=builder /opt/phema/phema-workbench-app/dist /usr/share/nginx/html
