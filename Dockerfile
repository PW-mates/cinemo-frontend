FROM node:17

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build
RUN npm i serve@latest -g -d

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npx", "serve", "build"]
