# ---- Etapa de Build ----
# Usamos una imagen de Node.js LTS reciente y ligera (Alpine).
FROM node:22-alpine AS builder

LABEL maintainer="lina-dev"
LABEL description="Build stage for Users API"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ---- Etapa de Producción ----
FROM node:22-alpine AS production

LABEL maintainer="lina-dev"
LABEL description="Production stage for Users API"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000


# Comando para iniciar la aplicación en producción.
CMD ["node", "dist/main.js"]