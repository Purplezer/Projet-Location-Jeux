import React from "react";
import { useEffect, useState } from "react";
import "../styles/Inscription.css";

export default function Inscription() {
  // VARIABLES POUR INSCRIPTION UTILISATEUR
  const [nom_utilisateur, set_nom_utilisateur] = useState("");
  const [email, set_email] = useState("");
  const [mot_de_passe, set_mot_de_passe] = useState("");
  const [utilisateur_connecté, set_utilisateur_connecté] = useState(false);

  // INSCRIPTION UTILISATEUR
  const handleInscription = async (event) => {
    event.preventDefault();

    // DATA UTILISATEUR
    const nouveau_utilisateur = {
      email: email,
      nom_utilisateur: nom_utilisateur,
      mot_de_passe: mot_de_passe,
    };

    // VERIFICATION, PAS DE CREATION D'UTILISATEUR "VIDE" ET EVITE PROBLEME SI DEJA CONNECTE
    if (!nom_utilisateur || !email || !mot_de_passe) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // UTILISATION API AVEC FETCH
      const réponse = await fetch("http://localhost:3001/utilisateurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouveau_utilisateur),
      });

      if (réponse.ok) {
        // INSCRIPTION REUSSIE
        console.log("Utilisateur ajouté avec succès");
        set_nom_utilisateur("");
        set_email("");
        set_mot_de_passe("");
        window.location.href = "/jeux";
      } else {
        // INSCRIPTION NON REUSSIE
        console.log("Erreur lors de l'ajout de l'utilisateur");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // VERIFICATION
  useEffect(() => {
    const utilisateur_connecté = localStorage.getItem("nom_utilisateur");
    if (utilisateur_connecté) {
      set_utilisateur_connecté(true);
      alert("Un utilisateur est déjà connecté.");
      document.getElementById("nom_utilisateur").disabled = true;
      document.getElementById("email").disabled = true;
      document.getElementById("mot_de_passe").disabled = true;
    }
  }, []);

  return (
    <div className="inscription">
      <div className="inscriptiontitre">
        <h2>Inscription</h2>
      </div>
      <div className="inscriptioncontenu">
        <form onSubmit={handleInscription}>
          <label htmlFor="nom_utilisateur">Nom d'utilisateur</label>
          <input
            type="text"
            id="nom_utilisateur"
            value={nom_utilisateur}
            onChange={(e) => set_nom_utilisateur(e.target.value)}
            disabled={utilisateur_connecté}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => set_email(e.target.value)}
            disabled={utilisateur_connecté}
          />
          <label htmlFor="mot_de_passe">Mot de passe</label>
          <input
            type="text"
            id="mot_de_passe"
            value={mot_de_passe}
            onChange={(e) => set_mot_de_passe(e.target.value)}
            disabled={utilisateur_connecté}
          />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}
