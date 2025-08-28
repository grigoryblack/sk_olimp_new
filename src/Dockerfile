# Этап сборки
FROM node:20-alpine AS build

WORKDIR /app

# Копируем только package файлы сначала для кэширования
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

RUN npm install

# Копируем остальные файлы
COPY . .

RUN npm run build

# Этап продакшн на nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]