FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm i -g pnpm prisma

RUN pnpm i

COPY libs libs
COPY apps/auction-service apps/auction-service

RUN pnpm exec prisma generate --schema=apps/auction-service/src/prisma/schema/schema.prisma
RUN pnpm build auction-service

CMD ["pnpm", "start:dev", "auction-service"]

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm prisma

RUN pnpm install
COPY apps/auction-service/src/prisma/schema/schema.prisma apps/auction-service/src/prisma/schema/schema.prisma
RUN pnpm exec prisma generate --schema=apps/auction-service/src/prisma/schema/schema.prisma
RUN pnpm prune --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auction-service/main"]