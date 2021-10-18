import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import './NavUI.css';

const NavUI = ({ onLogOut }) => {
  const history = useHistory();

  const onNavLinkClick = (event) => {
    event.preventDefault();
    history.push(event.target.pathname);
  };

  const NavLink = ({ children, ...props }) => {
    return <h2>NAV LINK</h2>;
  };

  return <h1>NAVBAR</h1>;
};

NavUI.propTypes = {
  onLogOut: PropTypes.func,
};

export default NavUI;
