import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto"> {}
            <Nav.Link as={Link} to="/organismos">Organismos</Nav.Link>
            <Nav.Link as={Link} to="/convocatorias">Convocatorias</Nav.Link>
            <Nav.Link as={Link} to="/investigadores">Investigadores</Nav.Link>
            <Nav.Link as={Link} to="/departamentos">Departamentos</Nav.Link>
            <Nav.Link as={Link} to="/solicitudes">Solicitudes</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
