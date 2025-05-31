# Temel Node.js imajı (LTS versiyon)
FROM node:18-alpine

# Uygulama klasörünü oluştur
WORKDIR /usr/src/app

# package.json ve package-lock.json kopyala ve bağımlılıkları yükle
COPY src/package*.json ./
RUN npm install

# Tüm kaynak kodunu kopyala
COPY src/ .

# Uygulamayı 3000 portunda başlat
EXPOSE 3000
CMD ["npm", "start"]
