# Application de détection d'objets en temps réel

Cette application web utilise TensorFlow.js et le modèle COCO-SSD pour détecter des objets en temps réel à partir du flux vidéo d'une webcam.

## Fonctionnalités

- Accès à la webcam et affichage du flux vidéo
- Détection d'objets en temps réel (environ 3 FPS)
- Affichage des objets détectés avec des boîtes englobantes et des étiquettes
- Gestion des erreurs pour l'accès à la caméra et le chargement du modèle

## Installation

1. Clonez ce dépôt ou téléchargez les fichiers dans un dossier local.
2. Assurez-vous d'avoir une connexion Internet active pour charger les bibliothèques TensorFlow.js et COCO-SSD depuis les CDN.

## Utilisation

1. Ouvrez le fichier `index.html` dans un navigateur web moderne.
2. Autorisez l'accès à votre webcam lorsque le navigateur le demande.
3. Attendez que le modèle se charge (un message "Chargement du modèle..." s'affichera).
4. Une fois le modèle chargé, vous verrez le flux vidéo de votre webcam avec des boîtes englobantes autour des objets détectés.

## Structure du projet

- `index.html`: Le fichier HTML principal de l'application
- `css/style.css`: Les styles CSS pour l'interface utilisateur
- `js/app.js`: Le code JavaScript pour la logique de l'application

## Dépendances

- TensorFlow.js
- COCO-SSD Model

Ces dépendances sont chargées via des CDN dans le fichier HTML.

## Remarque

Cette application est conçue à des fins éducatives et de démonstration. La précision de la détection peut varier en fonction de divers facteurs tels que la qualité de la caméra, l'éclairage et les capacités de l'appareil.
