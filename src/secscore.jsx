// Assuming this is part of your component where you want to store the scores

import React, { useEffect } from 'react';
import './logic';
import Homepage from './homepage';
import { useState } from 'react';

export default function Secscore({ xscore, cpuscore, oscore }) {
  // Store scores in session storage whenever they change
  useEffect(() => {
    sessionStorage.setItem('xscore', xscore);
    sessionStorage.setItem('cpuscore', cpuscore);
    sessionStorage.setItem('oscore', oscore);
  }, [xscore, cpuscore, oscore]);

  return (
    <div>
      <button id='cpu1'>
        <span id='otext'> ( YOU)</span>&nbsp;{xscore}
      </button>
      <button id='o1'>
        <span id='drawtext'>TIES</span>&nbsp;{cpuscore}
      </button>
      <button id='x1'>
        <span id='xtext'> (CPU)</span> &nbsp;{oscore}
      </button>
    </div>
  );
}
