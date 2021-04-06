/* eslint-disable react/prop-types */
import React from 'react';
import { BackgroundImg } from '../../assets/img';

interface LandingBackgroundProps {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}

const LandingBackground: React.FC<LandingBackgroundProps> = (props) => {
  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImg})`,
        height: '100%',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {props.children}
    </div>
  );
};

export default LandingBackground;
