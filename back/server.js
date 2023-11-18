const mariadb = require("mariadb");
const express = require("express");
const app = express();
var cors = require("cors");
const bcrypt = require("bcrypt");

require("dotenv").config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_DTB,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  connectionLimit: 100,
});

app.use(express.json());
app.use(cors());

//CRUD JEU

app.get("/jeux", async (req, res) => {
  let conn;
  try {
    console.log("Lancement de la connexion");
    conn = await pool.getConnection();
    console.log("Lancement de la requête");
    const rows = await conn.query("SELECT * FROM jeux");
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/jeux/:id", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query("select * from jeux where id_jeu = ?", [
      req.params.id,
    ]);
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/jeux/nom/:nom", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query("select * from jeux where nom_jeu = ?", [
      req.params.nom,
    ]);
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.put("/jeux/:id", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");

    const rows = await conn.query(
      "update jeux set nom_jeu = ?, image = ?, prix=? where id_jeu = ?",
      [req.body.nom_jeu, req.body.image, req.body.prix, req.params.id]
    );
    console.log(rows);
    res.status(200).json("La modification a bien été effectuée");
  } catch (err) {
    console.log(err);
  }
});

app.post("/jeux", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query(
      "insert into jeux (nom_jeu, image, prix) values (?, ?, ?)",
      [req.body.nom_jeu, req.body.image, req.body.prix]
    );
    console.log(rows);
    res.status(200).json("L'ajout a bien été effectué");
  } catch (err) {
    console.log(err);
  }
});

app.delete("/jeux/:id", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query("delete from jeux where id_jeu = ?", [
      req.params.id,
    ]);
    console.log(rows);
    res.status(200).json("La suppression a bien été effectuée");
  } catch (err) {
    console.log(err);
  }
});

//CRUD UTILISATEURS

app.get("/utilisateurs", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query("select * from utilisateurs");
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/utilisateurs/:id", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query(
      "select * from utilisateurs where id_utilisateur = ?",
      [req.params.id]
    );
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/utilisateurs/nom/:nom", async (req, res) => {
  let conn;
  try {
    console.log("Lancement de la connexion");
    conn = await pool.getConnection();
    console.log("Lancement de la requête");
    const rows = await conn.query(
      "select * from utilisateurs where nom_utilisateur = ?",
      [req.params.nom]
    );
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.put("/utilisateurs/:nom", async (req, res) => {
  let conn;
  try {
    bcrypt
      .hash(req.body.mot_de_passe, 10)
      .then(async (hash) => {
        console.log("lancement de la console");
        conn = await pool.getConnection();
        console.log("lancement de la requête");
        const rows = await conn.query(
          "update utilisateurs set nom_utilisateur = ?, email = ?, mot_de_passe = ? where nom_utilisateur = ?",
          [req.body.nom_utilisateur, req.body.email, hash, req.params.nom]
        );
        console.log(rows);
        res.status(200).json("La modification a bien été effectuée");
      })
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    console.log(err);
  }
});

app.post("/utilisateurs", async (req, res) => {
  let conn;
  try {
    bcrypt
      .hash(req.body.mot_de_passe, 10)
      .then(async (hash) => {
        console.log("lancement de la console");
        conn = await pool.getConnection();
        console.log("lancement de la requête");
        console.log(req.body);
        let requete =
          "INSERT INTO utilisateurs (`nom_utilisateur`, `email`, `mot_de_passe`) VALUES (?, ?, ?)";
        let rows = await conn.query(requete, [
          req.body.nom_utilisateur,
          req.body.email,
          hash,
        ]);
        console.log(rows);
        res.status(200).json("L'ajout d'utilisateur a bien été effectué");
      })
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    console.log(err);
  }
});

app.delete("/utilisateurs/:id", async (req, res) => {
  let conn;
  try {
    console.log("Lancement de la connexion");
    conn = await pool.getConnection();
    console.log("Lancement de la requête");
    const rows = await conn.query(
      "delete from utilisateurs where id_utilisateur = ?",
      [req.params.id]
    );
    console.log(rows);
    res.status(200).json("La suppression a bien été effectuée");
  } catch (err) {
    console.log(err);
  }
});

app.delete("/utilisateurs/nom/:nom", async (req, res) => {
  let conn;
  try {
    console.log("Lancement de la connexion");
    conn = await pool.getConnection();
    console.log("Lancement de la requête");
    const rows = await conn.query(
      "delete from utilisateurs where nom_utilisateur = ?",
      [req.params.nom]
    );
    console.log(rows);
    res.status(200).json("La suppression a bien été effectuée");
  } catch (err) {
    console.log(err);
    res.status(500).json("Erreur lors de la suppression");
  }
});

// CRUD LOCATION

app.get("/locations", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query("select * from locations");
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/locations/:id", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query(
      "select * from locations where id_location = ?",
      [req.params.id]
    );
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/locations/nom/:nom", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query(
      "select * from locations where nom_utilisateur = ?",
      [req.params.nom]
    );
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/locations/jeu/:jeu", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query("select * from locations where nom_jeu = ?", [
      req.params.jeu,
    ]);
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

//PUT LOCATION PAR ID
app.put("/locations/:id", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");

    const rows = await conn.query(
      "update locations set note = ?, commentaire = ? where id_location = ?", // NE PRENDRE QUE LES DEUX PARAMETRES A MODIFIER
      [req.body.note, req.body.commentaire, req.params.id] // IDEM
    );
    console.log(rows);
    res.status(200).json("La modification a bien été effectuée");
  } catch (err) {
    console.log(err);
  }
});

app.post("/locations", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");

    const rows = await conn.query(
      "insert into locations (id_jeu, id_utilisateur, date_location, date_retour, note, commentaire) values (?, ?, ?, ?, ?, ?)",
      [
        req.body.id_jeu,
        req.body.id_utilisateur,
        req.body.date_location,
        req.body.date_retour,
        req.body.note,
        req.body.commentaire,
      ]
    );
    console.log(rows);
    res.status(200).json("L'ajout a bien été effectué");
  } catch (err) {
    console.log(err);
  }
});

app.delete("/locations/:id", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");

    const rows = await conn.query(
      "delete from locations where id_location = ?",
      [req.params.id]
    );
    console.log(rows);
    res.status(200).json("La suppression a bien été effectuée");
  } catch (err) {
    console.log(err);
  }
});

// PERMET LA CONNEXION DES UTILISATEURS EXISTANTS
app.post("/connexion", async (req, res) => {
  let conn;
  try {
    const { nom_utilisateur, mot_de_passe } = req.body;
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM utilisateurs WHERE nom_utilisateur = ?",
      [nom_utilisateur]
    );

    if (rows.length > 0) {
      const user = rows[0];
      const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

      if (match) {
        res.status(200).json({ message: "Authentification réussie" });
      } else {
        res.status(401).json({ message: "Mot de passe incorrect" });
      }
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur lors de l'authentification" });
  }
});

app.listen(3001, () => {
  console.log("serveur à l'écoute");
});
