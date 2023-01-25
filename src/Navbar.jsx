import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbarr = () => {
  const favorites = useSelector((state) => state.favorite);
  return (
    <Navbar fixed="top" bg="primary" variant="dark" className="mb-5">
      <Container>
        <Nav className="me-auto">
          <div>
            <NavLink className="navbar-brand nav-li" to="/">
              Home
            </NavLink>
          </div>
          <div className="fav">
            <NavLink className="navbar-brand nav-li" to="/favorite">
              Favorite
            </NavLink>
            <span>{favorites.length}</span>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
