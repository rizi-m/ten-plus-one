import React from 'react';
import ProgramGrid from './ProgrammeGrid';

export default {
  title: 'Composite/ProgramGrid',
  component: ProgramGrid,
};

export const Primary = () => {
  const programmes = [
    {
      heading: 'Movies',
      description: 'Vote n stuff',
      backgroundImage: 'http://www.cinemacity.co.uk/Cinema%20City.jpeg',
    },
    { heading: 'Games', description: 'Recommend n stuff' },
    { heading: 'Skincare', description: 'Help n stuff' },
    { heading: 'Fashion', description: 'Style n stuff' },
    { heading: 'News', description: 'Tell n stuff' },
  ];

  return (
    <div
      style={{
        padding: '3rem 0',
        backgroundColor: 'silver',
      }}
    >
      <ProgramGrid programmes={programmes} />
    </div>
  );
};
