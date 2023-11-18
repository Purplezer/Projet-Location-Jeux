import React from "react";
import "../styles/Accueil.css";

export default function Accueil() {
  return (
    <div className="accueil">
      <div className="accueiltitre">
        <h2>Accueil</h2>
      </div>
      <div className="accueilcontenu">
        <p>Rendu de projet location de jeux vidéos.</p>
        <p>Groupe:</p>
        <p>Théo MENANT--FERRY + Alexandre DO.</p>
        <p>Durée:</p>
        <p>Du 16/11/2023 14:00 au 17/11/2023 16:45.</p>
        <p>Consigne:</p>
        <p>
          "Dans ce projet en binôme, vous aurez pour mission de concevoir une
          plateforme de gestion de location de jeux vidéos en ligne. Cette
          plateforme permettra aux utilisateurs d'explorer de nouveaux jeux, de
          noter et de commenter les jeux qu'ils ont loués."
        </p>
        <p>Merci et bonne visite!</p>
      </div>
    </div>
  );
}
