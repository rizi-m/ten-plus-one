import React from 'react';
import PropTypes from 'prop-types';
import './ProgrammeButton.css';

const ProgrammeButton = ({ programme }) => {
  const { heading, description, backgroundImage } = programme;
  const buttonStyle = backgroundImage && {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <button className='programme-button btn btn-light' style={buttonStyle}>
      <div className='programme-button_overlay'></div>
      <div className='programme-button_content'>
        <span className='h3'>{heading}</span>
        <span>{description}</span>
      </div>
    </button>
  );
};

ProgrammeButton.propTypes = {
  programme: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    description: PropTypes.node,
    backgroundImage: PropTypes.string,
  }),
};

export default ProgrammeButton;
