FROM node:14-buster AS builder

COPY . /opt/phema/phema-workbench-app/
WORKDIR /opt/phema/phema-workbench-app

RUN yarn install && yarn build

FROM nginx:1.19-alpine

COPY --from=builder /opt/phema/phema-workbench-app/dist /usr/share/nginx/html
