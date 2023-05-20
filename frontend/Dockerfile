FROM node:14.21.3-alpine as builder
WORKDIR '/usr/app/frontend'

COPY . .
COPY . .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest
COPY --from=builder /usr/app/frontend/build /usr/share/nginx/html
