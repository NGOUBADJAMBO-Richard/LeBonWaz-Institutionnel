#!/bin/bash

echo "🚀 Démarrage de la plateforme LMS..."
echo ""

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier la configuration
echo "🔍 Vérification de la configuration..."
node test-config.js

echo ""
echo "🌐 Démarrage du serveur de développement..."
echo "L'application sera accessible sur http://localhost:3000"
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

# Démarrer l'application
npm start