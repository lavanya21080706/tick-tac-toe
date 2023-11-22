// Assuming this is part of your component where you want to store the scores

import React from 'react';
import './logic';
import Homepage from './homepage';
import { useState, useEffect } from 'react';

export default function Score({ xscore, cpuscore, oscore }) {
  // Store scores in session storage whenever they change
  useEffect(() => {
    sessionStorage.setItem('xscore', xscore);
    sessionStorage.setItem('cpuscore', cpuscore);
    sessionStorage.setItem('oscore', oscore);
  }, [xscore, cpuscore, oscore]);

  return (
    <div>
      <button id='x'>
        <span id='xtext'> (YOU)</span> &nbsp;{xscore}
      </button>
      <button id='o'>
        <span id='drawtext'>TIES</span>&nbsp;{cpuscore}
      </button>
      <button id='cpu'>
        <span id='otext'> (CPU)</span>&nbsp;{oscore}
      </button>
    </div>
  );
}
