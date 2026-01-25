### **UniHelp 🎓**



Plateforme Web d’Entraide pour Étudiants

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



#### Présentation du Projet



UniHelp est une application web full-stack conçue pour faciliter l’entraide entre étudiants.

Elle permet aux utilisateurs de publier des demandes d’aide sur des sujets académiques et d’interagir avec la communauté via un système de commentaires et réponses.



Le projet vise la réalisation d’un MVP (Minimum Viable Product) robuste, sécurisé et évolutif.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



### Objectifs du Projet



##### **Objectifs fonctionnels**



Fournir une interface intuitive pour :



* publier des demandes d’aide



* consulter et rechercher des demandes



* commenter aux demandes



##### **Objectifs techniques**



Mettre en place une architecture moderne et maintenable :



* Backend : Spring Boot



* Frontend : Angular



* Base de données : PostgreSQL



##### **Objectifs de sécurité**



* Authentification sécurisée avec JWT



* Protection des mots de passe via BCrypt



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



##### **Périmètre Fonctionnel**



Gestion des Utilisateurs \& Authentification



|Fonctionnalité|Description|
|-|-|
|Inscription|Création d’un compte (username, email, password)|
|Connexion|Authentification utilisateur|
|Profil|Consultation et mise à jour du profil utilisateur,Consultation des demandes publiées par l’utilisateur|

##### 

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**





##### **Gestion des Demandes d’Aide (help\_requests)**



|Fonctionnalité|Description|
|-|-|
|Création|Soumettre une nouvelle demande d’aide|
|Consultation|Voir le détail d’une demande|
|Liste \& Recherche|Pagination et filtres des demandes|



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



##### **Gestion des Commentaires (comments)**



|Fonctionnalité|Description|
|-|-|
|Ajout|Ajouter un commentaire à une demande|
|Affichage|Organisation hiérarchique des commentaires|



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



##### **Périmètre Technique**



###### Architecture Générale



Architecture **Client / Serveur**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Angular (Frontend)  ⇄  Spring Boot (Backend)  ⇄  PostgreSQL (Database)|

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



###### Technologies Utilisées



|Composant|Technologie|
|-|-|
|Frontend|Angular (TypeScript)|
|Backend|Spring Boot (Java)|
|Base de données|PostgreSQL|
|ORM|Spring Data JPA|



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_





##### **Schéma de la Base de Données**



###### **Tables principales** 



###### **users**



* id (UUID)



* username



* email



* password



###### **help\_requests**



* id (UUID)



* user\_id



* subject



* topic



* description



* status



* created\_at



###### **comments**



* id (UUID)



* request\_id



* user\_id



* text



* parent\_id



* created\_at



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



##### **Backend – Spring Boot**



* **Langage :** Java



* **Gestion de projet :** Maven



* **Configuration :** application.yml



* **Dépendances principales :**



&nbsp;       Spring Web



&nbsp;       Spring Data JPA



&nbsp;       Spring Security



&nbsp;       PostgreSQL Driver



&nbsp;      Lombok



###### **Structure du projet**



###### com.unihelp

###### &nbsp;├── controller

###### &nbsp;├── service

###### &nbsp;├── repository

###### &nbsp;├── model

###### &nbsp;├── security

###### &nbsp;└── config

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



##### **Frontend – Angular**



**Langage :** TypeScript



**Outil :** Angular CLI



**UI/UX :** Angular Material



**Routing :** Routes protégées app.route.ts avec AuthGuard



**Services :** ApiServices pour centraliser les appels HTTP vers le backend



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_





##### **Sécurité**



* Authentification basée sur JWT



* Hachage des mots de passe avec BCryptPasswordEncoder



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



##### **Environnement**



###### **Environnement local**



|Composant|URL|
|-|-|
|Backend|http://localhost:8080|
|Frontend|http://localhost:4200|
|Domaine local|http://unihelp.local|

###### 

**Environnement de Développement**



Développement réalisé sous VS Code avec les prérequis suivants :



|Outil|Version|
|-|-|
|Java JDK|17|
|Node.js|24.11.1|
|npm|11.6.2|
|Angular CLI|21.1.1|
|PostgreSQL|18.1|
|Spring Boot|4.0.1|



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



##### **Lancement du Projet (Local)**



###### Backend



cd unihelp-backend

mvn spring-boot:run



###### Frontend



cd unihelp-frontend

ng serve



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



###### Auteur



Chayma Othmeni





























