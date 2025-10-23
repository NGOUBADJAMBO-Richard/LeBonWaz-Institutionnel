#!/usr/bin/env node

// Script de test pour vérifier la configuration de la plateforme LMS
const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la configuration de la plateforme LMS...\n');

// Vérifier les fichiers essentiels
const essentialFiles = [
  'package.json',
  'src/App.jsx',
  'src/index.js',
  'src/index.css',
  'src/config/firebase.js',
  'src/config/constants.js',
  'src/contexts/AuthContext.jsx',
  'src/services/leadService.js',
  'src/services/interactionService.js',
  'src/components/auth/PrivateRoute.jsx',
  'src/components/auth/LoginForm.jsx',
  'src/pages/LoginPage.jsx',
  'src/pages/DashboardPage.jsx',
  '.env',
  '.env.example',
  'tailwind.config.js',
  'postcss.config.js',
  'firestore.rules'
];

console.log('📁 Vérification des fichiers essentiels:');
let allFilesExist = true;

essentialFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MANQUANT`);
    allFilesExist = false;
  }
});

// Vérifier le package.json
console.log('\n📦 Vérification des dépendances:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    'firebase',
    'react-router-dom',
    'lucide-react',
    'react-hook-form',
    'date-fns',
    'recharts'
  ];
  
  const requiredDevDeps = [
    'tailwindcss',
    'postcss',
    'autoprefixer'
  ];

  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`  ✅ ${dep} (${packageJson.dependencies[dep]})`);
    } else {
      console.log(`  ❌ ${dep} - MANQUANT`);
      allFilesExist = false;
    }
  });

  requiredDevDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`  ✅ ${dep} (${packageJson.devDependencies[dep]})`);
    } else {
      console.log(`  ❌ ${dep} - MANQUANT`);
      allFilesExist = false;
    }
  });
} catch (error) {
  console.log('  ❌ Erreur lors de la lecture du package.json');
  allFilesExist = false;
}

// Vérifier les variables d'environnement
console.log('\n🔐 Vérification des variables d\'environnement:');
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  const envVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID'
  ];

  envVars.forEach(envVar => {
    if (envContent.includes(envVar)) {
      console.log(`  ✅ ${envVar}`);
    } else {
      console.log(`  ❌ ${envVar} - MANQUANT`);
      allFilesExist = false;
    }
  });
} catch (error) {
  console.log('  ❌ Fichier .env non trouvé');
  allFilesExist = false;
}

// Résumé
console.log('\n📊 Résumé:');
if (allFilesExist) {
  console.log('  🎉 Configuration complète ! Vous pouvez maintenant :');
  console.log('     1. Configurer vos vraies clés Firebase dans .env');
  console.log('     2. Lancer npm start');
  console.log('     3. Créer un utilisateur admin dans Firebase');
  console.log('     4. Tester la connexion');
} else {
  console.log('  ⚠️  Certains fichiers ou dépendances sont manquants.');
  console.log('     Veuillez vérifier la configuration avant de continuer.');
}

console.log('\n📚 Pour plus d\'informations, consultez le README.md');