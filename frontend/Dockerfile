# Utilisez une image de base avec Node.js 20.9.0
FROM node:20.9.0

# Définissez le répertoire de travail dans le conteneur
WORKDIR /front

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tout le reste des fichiers
COPY . .

# Exposez le port sur lequel l'application s'exécute (port 5173)
EXPOSE 5173

# Commande pour démarrer l'application avec l'option --host 0.0.0.0
#CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
CMD ["npm", "run", "dev"]
