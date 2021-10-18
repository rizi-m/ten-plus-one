import React from 'react';

import ProgrammeButton from './ProgrammeButton';

export default {
  title: 'Base/ProgrammeButton',
  component: ProgrammeButton,
};

export const Primary = () => (
  <ProgrammeButton
    heading='Movies'
    description='Vote for movies and more!'
    backgroundImage='http://www.cinemacity.co.uk/Cinema%20City.jpeg'
  />
);
