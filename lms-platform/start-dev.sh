#!/bin/bash

echo "🚀 Démarrage de la plateforme LMS..."

# Vérifier si le fichier .env existe
if [ ! -f .env ]; then
    echo "⚠️  Fichier .env manquant !"
    echo "📋 Copiez .env.example vers .env et configurez vos clés Firebase"
    cp .env.example .env
    echo "✅ Fichier .env créé. Veuillez le configurer avant de continuer."
    exit 1
fi

# Vérifier si les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Démarrer l'application
echo "🌟 Lancement de l'application sur http://localhost:3000"
npm start