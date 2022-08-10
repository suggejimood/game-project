FROM node:16-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --only=production
COPY --from=development /usr/src/app/dist ./dist
CMD ["npm", "start"]

