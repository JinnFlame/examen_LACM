import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Cards({ nombre }) {
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    fetch(`https://dragonball-api.com/api/characters?name=${nombre}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          setImagen(data[0].image);
        }
      });
  }, [nombre]);

  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow">
        {imagen && (
          <img
            src={imagen}
            className="card-img-top w-100 object-fit-cover"
            alt={nombre}
            style={{ height: "800px" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{nombre}</h5>
        </div>
      </div>
    </div>
  );
}

Cards.propTypes = {
  nombre: PropTypes.string.isRequired,
};

export default Cards;
