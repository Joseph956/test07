# P07_reseau_social

# MySql
Inserer les informations de connexion dans les variables d'environnement

# Démarrer le serveur
Lancer le serveur : `nodemon server`
# cd front
Lancer le serveur : `npm run serve`

# Les routes

## Gestion de l'authentification.
## Post - Creer un compte
http://localhost:3000/api/auth/register
## Post - Se connecter
http://localhost:3000/api/auth/login
## get - Se déconnecter
http://localhost:3000/api/auth/logout


## Gestion des Fiches utilisateurs.
## Post - Publier une nouvelle fiche.
http://localhost:3000/api/users
## Get - Voir toutes les fiches utilisateurs.
http://localhost:3000/api/users
## Get - Voir une fiche utilisateur grâce à son id.
http://localhost:3000/api/users/:id
## Put - Modifier la fiche d'un utilisateur grâce à son id.
http://localhost:3000/api/users/:id
## Delete - Supprimer la fiche d'un utilisateur grâce à son id.
http://localhost:3000/api/users/:id


## Gestion des posts utlisateurs.
## Post - Publier un nouveau post.
http://localhost:3000/api/posts
## Get - Voir tous les posts.
http://localhost:3000/api/posts
## Get - Voir un post grâce à son id.
http://localhost:3000/api/posts/:id
## Put - Modifier
http://localhost:3000/api/posts/:id
## Put - Liker / Disliker un post.
http://localhost:3000/api/posts/:id/like

http://localhost:3000/api/posts/:id/unlike
## Delete - Supprimer un post.
http://localhost:3000/api/posts/:id



## Gestion des coments utlisateurs.
## Post - Publier un nouveau coment.
http://localhost:3000/api/coments
## Get - Voir tous les coments.
http://localhost:3000/api/coments
## Get - Voir un coment grâce à son id.
http://localhost:3000/api/posts/:id
## Put - Modifier un coment.
http://localhost:3000/api/coments/:id
## Put - liker / disliker un coment.
http://localhost:3000/api/coments/:id/like

http://localhost:3000/api/coments/:id/unlike
## Delete - Supprimer un coment.
http://localhost:3000/api/coments/:id