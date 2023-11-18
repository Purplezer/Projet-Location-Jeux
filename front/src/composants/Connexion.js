import React from "react";
import { useEffect, useState } from "react";
import "../styles/Connexion.css";

export default function Connexion() {
  // VARIABLES POUR CONNEXION DECONNEXION UTILISATEUR
  const [nom_utilisateur, set_nom_utilisateur] = useState("");
  const [mot_de_passe, set_mot_de_passe] = useState("");
  const [utilisateur_connecté, set_utilisateur_connecté] = useState(false);

  // CONNEXION UTILISATEUR
  const handleConnexion = async (event) => {
    event.preventDefault();

    // UTILISATION API AVEC FETCH
    try {
      const réponse = await fetch("http://localhost:3001/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom_utilisateur, mot_de_passe }),
      });

      const data = await réponse.json();

      if (réponse.ok) {
        // CONNEXION REUSSIE
        console.log(data.message);
        const id_utilisateur = data.id_utilisateur;
        localStorage.setItem("nom_utilisateur", nom_utilisateur);
        localStorage.setItem("id_utilisateur", id_utilisateur);
        window.location.href = "/jeux";
      } else {
        // CONNEXION NON REUSSIE
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // DECONNEXION UTILISATEUR ET CLEAR DU LOCALSTORAGE
  const handleDéconnexion = () => {
    if (utilisateur_connecté) {
      if (
        window.confirm(
          "Vous allez être déconnecté et votre panier sera vidé. Êtes-vous sûr de vouloir continuer ?"
        )
      ) {
        // localStorage.clear();
        localStorage.removeItem("nom_utilisateur");
        localStorage.removeItem("id_utilisateur");
        localStorage.removeItem("panier"); // Supprimer le panier du localStorage
        set_utilisateur_connecté(false);
        window.location.href = "/jeux";
      }
    } else {
      alert("Aucun utilisateur n'est connecté.");
    }
  };

  // VERIFICATION
  useEffect(() => {
    const utilisateur_connecté = localStorage.getItem("nom_utilisateur");
    if (utilisateur_connecté) {
      set_utilisateur_connecté(true);
      alert("Un utilisateur est déjà connecté.");
      document.getElementById("nom_utilisateur").disabled = true;
      document.getElementById("mot_de_passe").disabled = true;
    }
  }, []);

  return (
    <div className="connexion">
      <div className="connexiontitre">
        <h2>Connexion</h2>
      </div>
      <div className="connexioncontenu">
        <form onSubmit={handleConnexion}>
          <label htmlFor="nom_utilisateur">Nom d'utilisateur</label>
          <input
            type="text"
            id="nom_utilisateur"
            value={nom_utilisateur}
            onChange={(e) => set_nom_utilisateur(e.target.value)}
            disabled={utilisateur_connecté}
          />
          <label htmlFor="mot_de_passe">Mot de passe</label>
          <input
            type="password"
            id="mot_de_passe"
            value={mot_de_passe}
            onChange={(e) => set_mot_de_passe(e.target.value)}
            disabled={utilisateur_connecté}
          />
          <button type="submit">Se connecter</button>
        </form>
        <button onClick={handleDéconnexion}>Se déconnecter</button>
      </div>
    </div>
  );
}
