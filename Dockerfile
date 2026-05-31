# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts

COPY . .

ARG VITE_API_BASE_URL=https://api.tokencashflow.com
ARG VITE_CLIENT_PORTAL_URL=https://app.tokencashflow.com
ARG VITE_DOCS_URL=https://docs.tokencashflow.com
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_CLIENT_PORTAL_URL=$VITE_CLIENT_PORTAL_URL \
    VITE_DOCS_URL=$VITE_DOCS_URL

RUN npm run build

# ── Serve stage ───────────────────────────────────────────────────────────────
FROM nginx:1.25-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
