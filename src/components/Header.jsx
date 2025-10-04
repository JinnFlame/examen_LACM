import PropTypes from "prop-types";

function Header({ titulo }) {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">{titulo}</span>
      </div>
    </nav>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default Header
