import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Jeux.css";

export default function Jeux() {
  const [jeux, set_jeux] = useState([]);
  const [recherche, set_recherche] = useState("");
  const [affichage, set_affichage] = useState(false);
  const [page, set_page] = useState(1);
  const jeux_par_page = 4; // Nombre d'éléments par page

  const reponse_jeux = async () => {
    try {
      const réponse = await axios.get(`http://localhost:3001/jeux`);
      set_jeux(réponse.data);
      set_affichage(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des jeux :", error);
    }
  };

  useEffect(() => {
    reponse_jeux();
  }, []);

  const handlerecherche = (e) => {
    set_recherche(e.target.value);
    set_page(1);
  };

  const handleAjoutPanier = (jeu) => {
    // fonction handleAjoutPanier qui permet d'ajouter un jeu au panier

    // Récupérer l'utilisateur du localStorage
    const id_utilisateur = localStorage.getItem("id_utilisateur");

    if (!id_utilisateur) {
      // Vérification connexion utilisateur
      alert("Vous devez être connecté pour ajouter des jeux au panier.");
      return;
    }

    // Récupérer le panier du localStorage
    const panier = JSON.parse(localStorage.getItem("panier")) || [];

    // Vérifier si le jeu est déjà présent
    const jeuPresent = panier.some((item) => item.id_jeu === jeu.id_jeu);

    if (jeuPresent) {
      // Si le jeu est déjà présent, afficher une alerte
      alert("Ce jeu est déjà dans votre panier !");
    } else {
      // Ajouter le jeu au panier
      panier.push(jeu);
    }

    // Mettre à jour le localStorage avec le nouveau panier
    localStorage.setItem("panier", JSON.stringify(panier));
  };

  const filtre_jeux = jeux.filter((jeu) =>
    jeu.nom_jeu.toLowerCase().includes(recherche.toLowerCase())
  );

  const tous_les_jeux = filtre_jeux.length;

  const premier_jeu = page * jeux_par_page;
  const dernier_jeu = premier_jeu - jeux_par_page;
  const currentJeux = filtre_jeux.slice(dernier_jeu, premier_jeu);

  const suivant = () => {
    const dernier_jeu = page * jeux_par_page;
    if (dernier_jeu >= tous_les_jeux) {
      // Si l'utilisateur est sur la dernière page
      alert("Il n'y a pas d'autres jeux disponibles pour le moment...");
      return; // Arrêter l'exécution de la fonction
    }

    set_page(page + 1);
  };

  const précédent = () => {
    if (page > 1) {
      set_page(page - 1);
    }
  };

  return (
    <div className="jeux">
      <div className="jeuxtitre">
        <h2>Jeux</h2>
      </div>
      <div className="jeuxrecherche">
        <input
          type="text"
          name="recherche-bar"
          id="recherche-bar"
          placeholder="Rechercher un jeu..."
          onChange={handlerecherche}
        />
      </div>
      <div className="jeuxcontenu">
        <div className="jeucontenuprécédent">
          <button onClick={précédent}>&#8592;</button>
        </div>
        <div className="jeucontenujeu">
          {affichage ? (
            currentJeux.map((jeu) => (
              <div className="jeux" key={jeu.id_jeu}>
                <p>Nom : {jeu.nom_jeu}</p>
                <span className="tailleimage">
                  <img src={jeu.image} alt="" />
                </span>
                <p>
                  Prix : {jeu.prix} € / J{" "}
                  <button onClick={() => handleAjoutPanier(jeu)}>
                    Ajouter
                  </button>{" "}
                </p>
              </div>
            ))
          ) : (
            <p>Chargement...</p>
          )}
        </div>
        <div className="jeucontenusuivant">
          <button onClick={suivant}>&#8594;</button>
        </div>
      </div>
    </div>
  );
}
