# ===== Build stage =====
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
# 若你 repo 沒有 package-lock.json，npm ci 會失敗
RUN npm install

COPY . .
RUN npm run build

# ===== Run stage =====
FROM node:20-alpine
WORKDIR /app

RUN npm i -g serve
COPY --from=build /app/dist ./dist

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "serve -s dist -l ${PORT}"]
