import { useEffect, useState } from "react";
import axios from "axios";
import "./SearchBar.scss";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [areSearchResultsVisible, setAreSearchResultsVisible] = useState(false);
  const handleSearch = (e) => {
    setSearch(e.target.value);

    if (search.length > 0) {
      setAreSearchResultsVisible(true);
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/cocktails/search/${search}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setAreSearchResultsVisible(false);
    }
  };
  return (
    <div className="search">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for a cocktail..."
        className="cocktail-search-bar"
        onFocus={() => setAreSearchResultsVisible(true)}
      />
      {areSearchResultsVisible && searchResults.length > 0 && (
        <>
          <div className="results">
            {searchResults.map((cocktail) => (
              <Link
                to={`/cocktails/${cocktail.idDrink}`}
                key={cocktail.idDrink}
                className="result"
                onClick={() => {
                  setAreSearchResultsVisible(false);
                  setSearch("");
                  setSearchResults([]);
                }}
              >
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                {cocktail.strDrink}
              </Link>
            ))}
          </div>
          <div
            className="filter"
            onClick={() => {
              setAreSearchResultsVisible(false);
              setSearch("");
              setSearchResults([]);
            }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
