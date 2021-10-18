import React from 'react';
import NavUI from './NavUI';

export default {
  title: 'Composite/Navigator',
  component: NavUI,
};

export const Primary = () => (
  <NavUI onLogOut={() => console.log('Logging out')} />
);
