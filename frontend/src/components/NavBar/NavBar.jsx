import { Link, NavLink } from "react-router";
import "./NavBar.css";
import { BsHouseDoorFill, BsSearch } from "react-icons/bs";

const NavBar = () => {
  return (
    <nav id="nav">
      <Link to="/">Reactgram</Link>

      <form id="search-form">
        <BsSearch />
        <input type="text" placeholder="Pesquisar" />
      </form>

      <ul id="nav-links">
        <li>
          <NavLink to="/">
            <BsHouseDoorFill />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">Entrar</NavLink>
        </li>
        <li>
          <NavLink to="/register">Cadastra</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
