import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, Container, Button, NavbarText } from 'reactstrap';

export const NavComp: FC = () => (
  <Navbar color="light" light sticky="top" expand="md">
    <Container>
      <NavbarBrand tag={Link} to="/" className="mr-1">
        📝
        <NavbarText className="m-0 p-0">Blog</NavbarText>
      </NavbarBrand>
      <Nav className="mr-auto" navbar />

      <div>
        <Button outline tag={Link} to="/create" color="primary">
          <i className="far fa-sticky-note mr-2" />
          Post a Blog
        </Button>
      </div>
    </Container>
  </Navbar>
);
