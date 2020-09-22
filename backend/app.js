// Ajout des packages suplémentaires
const express = require("express"); // qu'est ce que permet vraiment express et comment ça serait sans express ?
const bodyParser = require("body-parser"); // pareil
const mongoose = require("mongoose"); // pareil
const path = require("path"); // pareil

// Création de l'application express
const app = express();

// Import des routes
const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    "mongodb+srv://pipo21:Titicaca21200@cluster0.soosm.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Header pour contourner les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Rend les données du corps de la requête exploitable
app.use(bodyParser.json());

// Gestion de la ressource image en statique
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes attendues pour les differentes API
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

// app.use signifie que c'est à chaque utilisation/requête du site ?

module.exports = app;
