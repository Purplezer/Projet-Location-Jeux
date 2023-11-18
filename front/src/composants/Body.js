import React from "react";
import "../styles/Body.css";
import { Routes, Route } from "react-router-dom";
import Accueil from "./Accueil.js";
import Inscription from "./Inscription.js";
import Connexion from "./Connexion.js";
import Jeux from "./Jeux.js";
import Locations from "./Locations.js";
import Panier from "./Panier.js";

export default function Body() {
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Accueil />}></Route>
        <Route path="/connexion" element={<Connexion />}></Route>
        <Route path="/inscription" element={<Inscription />}></Route>
        <Route path="/jeux" element={<Jeux />}></Route>
        <Route path="/panier" element={<Panier />}></Route>
        <Route path="/locations" element={<Locations />}></Route>
      </Routes>
    </div>
  );
}
