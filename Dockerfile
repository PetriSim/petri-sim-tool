FROM node:16-alpine 
ENV NODE_ENV=production
ENV CI=true
WORKDIR /usr/src/app
COPY package.json ./ 
COPY package-lock.json ./ 
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]

