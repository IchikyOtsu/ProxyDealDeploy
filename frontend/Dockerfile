# Utilisez une image de base avec Node.js
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /front

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tout le reste des fichiers
COPY . .

# Exposez le port sur lequel l'application s'exécute
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["npm", "start"]
