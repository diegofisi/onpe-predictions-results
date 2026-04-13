FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist ./dist
ENV PORT=3000
EXPOSE $PORT
CMD sh -c "serve -s dist -l tcp://0.0.0.0:$PORT"
