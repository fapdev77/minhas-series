import React, { useState } from 'react';

//Imports do reactstrap
import {
  Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink, NavbarToggler
} from 'reactstrap';

//gerenciar somente os links para que a pagina nao recarregue cada vez que é clicado
import { Link } from 'react-router-dom';
//paramos aos 36:15

//Componentes iniciam com letra maiuscula
const Header = () => {
  //useState para verificar o estado do toggle true/false
  const [open,setOpen] = useState(false);
  //faz o togle true/false para abrir e fechar o menu sanduiche
  const toggle = () => {
    setOpen(!open);
  }
  return (
  <Navbar color='light' light expand='md'>
    <NavbarBrand>Minhas Séries</NavbarBrand>
    <NavbarToggler onClick={toggle}/>
    <Collapse isOpen={open} navbar>
      <Nav className='ml-auto' navbar>
        <NavItem>
          <NavLink href='/'>Gêneros</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
  );
};

export default Header;