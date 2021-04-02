import React from 'react';
import PropTypes from 'prop-types';

const Center = ({ children, ...props }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

Center.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Center;
