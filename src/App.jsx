import { useState, useEffect } from "react";
import Header from "./components/Header";
import CardDBZ from "./components/Cards";
import Footer from "./components/Footer";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCharacters = async () => {
    try {
      let res = await fetch("https://dragonball-api.com/api/characters");
      let data = await res.json();

      let personajes = data.items
        ? data.items.slice(0, 9) 
        : data.slice(0, 9);

      let chars = personajes.map((p) => ({
        nombre: p.name,
      }));

      setCharacters(chars);
      setLoading(false);
    } catch (err) {
      console.error("Error al traer personajes:", err);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="container">
      <Header titulo="Personajes de Dragon Ball - Examen" />

      {loading ? (
        <p className="text-center">Cargando personajes...</p>
      ) : (
        <div className="row">
          {characters.map((char, i) => (
            <CardDBZ key={i} {...char} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
