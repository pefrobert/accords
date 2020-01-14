[ACCORD](https://hackathon-hug2019.sparkboard.com/project/5c63008aa8324900242a6eb8) est "une App pour aider patients, proches et soignants à anticiper et accorder les objectifs de soins".

Le [site de démonstration](http://www.christineclavien.ch/accord/) a été réalisé en 32 heures, les 22 & 23 Mars 2019 au cours du [hackathon des HUG](https://hackathon-hug2019.sparkboard.com/).

> Ce projet a été récompensé par le prix du hackathon pour le partenariat avec nos patients.

# Prerequis
Le site utilise [Node.js](https://nodejs.org) pour générer ses contenus via les outils [Gulp](https://nodejs.org), [Babel](https://babeljs.io/), [Webpack](https://webpack.js.org/).

Le moteur de template utilisé pour générer les pages HTML est [Nunjucks](https://mozilla.github.io/nunjucks/).

Le style CSS du site est maintenu en [SASS](https://sass-lang.com/) (SCSS).

Le code référence aussi [Cordova](https://cordova.apache.org/) pour porter facilement cette application sur mobile.
``` bash
npm install
```

# Génération
Le squelette du site utilise le modèle de Cordova.

Pour générer complètement et proprement le site, il faut procéder en 2 étapes.

## Gulp
Des tâches Gulp ont été définies pour générer tout le contenu du site (HTML, JS, CSS, JSON), à partir des fichiers dans le dossier **src/**, vers le dossier **www/**
``` bash
gulp build
```

## Cordova
En se basant sur le contenu généré dans le dossier **www/**, Cordova va générer une version web (*browser*) à partir de ce contenu (ainsi qu'une version application Android (*android*))
``` bash
cordova build
```

Le site généré, prêt à mettre en ligne, se trouve alors dans le dossier **platforms/browser/www/**
