# 🎓 Formulaire AGEFICE 2025 - Version GitHub Pages

[![Déployé sur GitHub Pages](https://img.shields.io/badge/D%C3%A9ploy%C3%A9-GitHub%20Pages-success)](https://saloua40.github.io/formulaire_pdf/)

## 🌐 URL du formulaire
**https://saloua40.github.io/formulaire_pdf/**

---

## ✨ Fonctionnalités

### 📄 **Intégration PDF Native**
- Affichage du PDF AGEFICE officiel sans déformation
- Saisie directe dans les champs du PDF via Adobe PDF Embed API
- Conservation à 100% de la mise en page originale

### 📊 **Validation Intelligente**
- Suivi en temps réel des **61 champs obligatoires**
- Barre de progression dynamique
- Validation automatique des **8 pièces jointes**
- Bouton désactivé tant que tout n'est pas complété

### 🔒 **Sécurité & RGPD**
- Conforme RGPD (pas de stockage de données)
- Validation côté client
- Consentement explicite obligatoire

---

## 🚀 Intégration dans Hostinger AI Builder

### Option 1 : Intégration par iframe (recommandée)

```html
<iframe 
    src="https://saloua40.github.io/formulaire_pdf/" 
    width="100%" 
    height="1200px" 
    frameborder="0"
    allow="clipboard-write"
    style="border: none; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
</iframe>
```

### Option 2 : Intégration par lien direct

```html
<a href="https://saloua40.github.io/formulaire_pdf/" 
   target="_blank" 
   class="btn-formulaire"
   style="background: linear-gradient(135deg, #667eea, #764ba2); 
          color: white; 
          padding: 15px 30px; 
          border-radius: 50px; 
          text-decoration: none; 
          font-weight: 600;">
    📝 Remplir ma demande AGEFICE
</a>
```

### Option 3 : Intégration responsive

```html
<div style="position: relative; width: 100%; padding-bottom: 120%; overflow: hidden;">
    <iframe 
        src="https://saloua40.github.io/formulaire_pdf/" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;">
    </iframe>
</div>
```

---

## 📦 Structure du projet

```
formulaire_pdf/
├── index.html                          # Page principale
├── style.css                           # Styles CSS
├── script.js                          # Logique JavaScript
├── AGEFICE-Demande-de-prise-en-charge-2025 PRE REMPLIE.pdf  # PDF officiel
└── README.md                          # Documentation
```

---

## ⚙️ Configuration requise

### 1. Clé Adobe PDF Embed API (GRATUITE)

**Étape 1 :** Créer un compte sur [Adobe Developer Console](https://developer.adobe.com/)

**Étape 2 :** Obtenir votre Client ID PDF Embed API

**Étape 3 :** Remplacer dans `script.js` ligne 2 :
```javascript
const ADOBE_CLIENT_ID = 'VOTRE_CLE_API_ADOBE';
```

### 2. Service d'email (EmailJS recommandé - GRATUIT)

**Étape 1 :** Créer un compte sur [EmailJS](https://www.emailjs.com/)

**Étape 2 :** Configurer les identifiants dans `script.js` lignes 3-5 :
```javascript
const EMAIL_SERVICE_ID = 'votre_service_id';
const EMAIL_TEMPLATE_ID = 'votre_template_id';
const EMAIL_USER_ID = 'votre_user_id';
```

---

## ✅ Checklist de déploiement

- [x] Fichiers uploadés sur GitHub
- [x] GitHub Pages activé
- [ ] Clé Adobe PDF Embed configurée
- [ ] Service email configuré et testé
- [ ] Test complet du formulaire effectué
- [ ] Intégration Hostinger vérifiée

---

## 🎯 Guide d'intégration Hostinger AI Builder

### Étape 1 : Ouvrir l'éditeur Hostinger AI

1. Connectez-vous à votre compte Hostinger
2. Accédez à l'AI Website Builder
3. Ouvrez votre site en édition

### Étape 2 : Ajouter une section HTML personnalisée

1. Cliquez sur "+ Ajouter une section"
2. Choisissez "HTML personnalisé" ou "Embed"
3. Collez le code iframe (voir Option 1 ci-dessus)

### Étape 3 : Ajuster la hauteur

Selon le contenu visible, ajustez la hauteur de l'iframe :
- **Mobile :** `height="1000px"`
- **Tablette :** `height="1100px"`
- **Desktop :** `height="1200px"`

### Étape 4 : Tester l'intégration

1. Prévisualisez votre page
2. Vérifiez que le formulaire s'affiche correctement
3. Testez le remplissage d'un champ
4. Vérifiez la responsivité (mobile, tablette, desktop)

---

## 🔧 Dépannage

### Le PDF ne s'affiche pas ?
- ✅ Vérifiez que votre clé Adobe API est configurée
- ✅ Consultez la console du navigateur (F12) pour les erreurs
- ✅ Vérifiez que le fichier PDF existe bien sur GitHub

### L'iframe ne fonctionne pas dans Hostinger ?
- ✅ Utilisez l'option "HTML personnalisé" plutôt que "Embed"
- ✅ Vérifiez que l'attribut `allow="clipboard-write"` est présent
- ✅ Essayez sans `frameborder="0"` (certains éditeurs le rejettent)

### Le formulaire est trop petit/grand ?
- ✅ Ajustez la valeur `height` de l'iframe
- ✅ Utilisez l'Option 3 (responsive) pour adaptation automatique

---

## 📞 Support

Pour toute question technique :
1. Vérifiez la documentation dans ce README
2. Consultez les logs de la console navigateur (F12)
3. Vérifiez que tous les fichiers sont bien présents sur GitHub

---

## 📄 Licence

Solution développée pour la digitalisation des formulaires AGEFICE.  
Utilisation libre dans le cadre du traitement des demandes de financement formation.

---

**© 2025 - Formulaire AGEFICE sécurisé - Conforme RGPD**
