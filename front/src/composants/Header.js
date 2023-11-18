import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import Cart from "../assets/shopping-cart.png";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <p>Accueil</p>
      </Link>
      <Link to="/jeux">
        <p>Jeux</p>
      </Link>
      <Link to="/connexion">
        <p>Connexion</p>
      </Link>
      <Link to="/inscription">
        <p>Inscription</p>
      </Link>
      <Link to="/Panier" className="Link">
        <img src={Cart} alt="panier" className="cart" />
      </Link>
      <Link to="/locations">
        <p>Locations</p>
      </Link>
    </div>
  );
}
