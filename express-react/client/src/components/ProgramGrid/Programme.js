import React from 'react';
import ProgrammeGrid from './ProgrammeGrid';

export default {
  title: 'Composite/ProgrammeGrid',
  component: ProgrammeGrid,
};

export const Primary = () => {
  const programs = [
    {
      heading: 'Movies',
      description: 'Vote n stuff',
      backgroundImage: 'http://www.cinemacity.co.uk/Cinema%20City.jpeg',
    },
    { heading: 'Games', description: 'Recommend n stuff' },
    { heading: 'Skincare', description: 'Teach n stuff' },
    { heading: 'Fashion', description: 'Style n stuff' },
  ];

  return <ProgrammeGrid programs={programs} />;
};
