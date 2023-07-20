/* eslint-disable camelcase */
import { Link } from "react-router-dom";

import "./Home.scss";

export default function Home() {
  return (
    <div className="home">
      <main>
        <header>
          <h1>Cheers!</h1>
          <p className="subtitle">Let's find you a drink</p>
          <div className="filter" />
        </header>
        <div className="cocktails-types-list">
          <Link
            to="/cocktails?category=Ordinary Drink"
            className="cocktail-type"
          >
            Ordinary Drinks
          </Link>
          <Link to="/cocktails?category=Cocktail" className="cocktail-type">
            Cocktails
          </Link>
          <Link to="/cocktails?category=Shake" className="cocktail-type">
            Shakes
          </Link>
          <Link to="/cocktails?category=Cocoa" className="cocktail-type">
            Cocoas
          </Link>
          <Link to="/cocktails?category=Shot" className="cocktail-type">
            Shots
          </Link>
          <Link
            to="/cocktails?category=Homemade Liqueur"
            className="cocktail-type"
          >
            Homemade Liqueurs
          </Link>
          <Link to="/cocktails?category=Beer" className="cocktail-type">
            Beers
          </Link>
          <Link to="/cocktails?category=Soft Drink" className="cocktail-type">
            Soft Drinks
          </Link>
        </div>
      </main>
    </div>
  );
}
