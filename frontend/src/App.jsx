/* eslint-disable camelcase */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/reset.css";
import "./styles/index.scss";

import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Cocktails from "./pages/Cocktails/Cocktails";
import CocktailDetails from "./pages/CocktailDetails/CocktailDetails";
import MyCocktails from "./pages/MyCocktails/MyCocktails";
import NewPassword from "./pages/NewPassword/NewPassword";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-cocktails" element={<MyCocktails />} />
            <Route path="/cocktails/*" element={<Cocktails />} />
            <Route
              path="/cocktails/:cocktail_id"
              element={<CocktailDetails />}
            />
            <Route path="/new-password/*" element={<NewPassword />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
